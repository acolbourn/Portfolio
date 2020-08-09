import * as THREE from 'three';
import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import Color from 'color';
import logoPoints from './logoPoints.js';
import { getRandomSpherePoints, scaleMouse } from './LogoBoxesHelpers';

// const colorPalette = ['#1b262c', '#0f4c75', '#00b7c2']; // Colors when mouse at bottom of screen
const colorPalette = ['#222831', '#393e46', '#0092ca']; // Colors when mouse at bottom of screen

const uniformColorOptions = ['black', 'blue', '#0047AB', '#002456'];
const uniformColor = uniformColorOptions[2]; // Color when mouse at top of screen
let defaultBoxColor = Color('#2a363b'); // Color at screen center
const depth = 5; // Layers of boxes in Z direction
const numOfInstances = logoPoints.length * depth; // Total # of boxes
const boxSize = 1; // Physical box dimensions
const groupPosZ = (depth * boxSize) / 2 - boxSize / 2; // Z center of logo
const groupPosXY = 0; // X and Y center of logo
const tempObject = new THREE.Object3D(); // Init box object
const tempColor = new THREE.Color(); // Init color object
let boxColors = []; // Array of box colors
let boxColorsHex = []; // Array of box colors in hex
let uniformBoxColorHex; // Uniform box color in hex
let defaultBoxColorHex = defaultBoxColor.hex(); // Default box color in hex
// Generate initial color arrays. Use id's to reduce number of computations run each loop.  Only a set number of colors is calculated each time instead of each individual box, and then boxes pull from one of those precalculated limited colors based on their id.
colorPalette.forEach((color) => boxColors.push(Color(color)));
boxColors.forEach((color) => boxColorsHex.push(color.hex()));
const colors = new Array(numOfInstances).fill().map(() => defaultBoxColorHex);
const numOfColors = colorPalette.length;
// Assign each box into color id group
const colorIds = new Array(numOfInstances)
  .fill()
  .map(() => Math.floor(Math.random() * numOfColors));
// Create random points on a sphere to assign each box to for exploding effect
const spherePoints = getRandomSpherePoints(numOfInstances);
let mouseX = 0; // Mouse X Position
let mouseY = 0; // Mouse Y Position
let mouseVelX = 0; // Delayed mouse X position for smoother animation
let mouseVelY = 0; // Delayed mouse Y position for smoother animation
const animateSpeed = 0.02; // Delay time for user mouse position to smooth out animation effect
let colorIndex = 0; // Current color index to select varying color when mouse at bottom of screen
let offset; // Starting index of next color used in render loop
// Create array with xy points copied to each depth in z direction
const logoPoints3d = [];
logoPoints.forEach((point) => {
  for (let z = 0; z < depth; z++) {
    logoPoints3d.push([point[0], point[1], z]);
  }
});

export default function LogoBoxes({
  mouse,
  meshPosition,
  meshScale,
  fadeDelay,
}) {
  const ref = useRef(); // Mesh ref
  const [isLoading, setIsLoading] = useState(true);

  // Initialize empty color array
  const colorArray = useMemo(
    () =>
      Float32Array.from(
        new Array(numOfInstances)
          .fill()
          .flatMap((_, i) => tempColor.set(colors[i]).toArray())
      ),
    []
  );

  // Memoize blended colors to save processing each loop
  const blendedColorArray = useMemo(() => {
    let tempColors = [];
    const resolution = 0.01;
    // Create array of each color mixed together in steps of resolution
    for (let r = 0; r < numOfColors; r++) {
      for (let mix = 0; mix <= 1; mix += resolution) {
        const tempColor = boxColors[r].mix(
          boxColors[r + 1 >= numOfColors ? 0 : r + 1],
          mix.toFixed(2)
        );
        tempColors.push(tempColor);
      }
    }
    offset = tempColors.length / numOfColors; // Starting index of next color used in render loop
    return tempColors;
  }, []);

  // Load with boxes spaced out and animate in after 3s
  // useEffect(() => {
  //   mouse.current[0] = 400;
  //   console.log('here');
  //   setTimeout(() => (mouse.current[0] = 0), 2000);
  // }, []);

  // Start boxes spread out and assemble after delay
  useEffect(() => {
    mouse.current[0] = 1000;
    let timer1 = setTimeout(() => {
      mouse.current[0] = 0;
      setIsLoading(false);
    }, fadeDelay);
    // Clear timeout on unmount
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  useFrame((state) => {
    let i = 0;
    const time = state.clock.getElapsedTime();
    // Rotate logo group
    ref.current.rotation.y += 0.01;

    // Scale mouse positions and create velocities for animations
    mouseX = scaleMouse(mouse.current[0], window.innerWidth, 'log', 75, 300);
    mouseY = scaleMouse(mouse.current[1], window.innerHeight, 'linear', 75, 1);
    mouseVelX += (mouseX - mouseVelX) * animateSpeed;
    mouseVelY += (mouseY - mouseVelY) * animateSpeed;

    // Calculate box colors based on mouse position
    if (mouseVelY < 0) {
      // if mouse above center, mix center default color with uniform color
      uniformBoxColorHex = defaultBoxColor
        .mix(Color(uniformColor), Math.abs(mouseVelY))
        .hex();
      boxColorsHex = boxColorsHex.map(() => uniformBoxColorHex);
    } else {
      // else mouse is below center so mix multi-color array with default
      // Reset color looping index each time it reaches end of array
      colorIndex >= blendedColorArray.length - 1
        ? (colorIndex = 0)
        : (colorIndex += 1);
      // Mix each variable color with default color based on mouse position.  Since multiple colors are in precomputed color array, offset applies different colors to each box group.  Remove offset to make all boxes cycle through the same colors simultaneously.
      for (let r = 0; r < numOfColors; r++) {
        boxColorsHex[r] = defaultBoxColor
          .mix(
            blendedColorArray[
              (colorIndex + r * offset) % blendedColorArray.length
            ],
            Math.abs(mouseVelY)
          )
          .hex();
      }
    }

    // Update box positions and rotations.
    logoPoints3d.forEach((position, idx) => {
      const id = i++; // Box id
      // Calculate point on sphere based on user mouse movement
      const sphereX = spherePoints[idx].x * mouseVelX;
      const sphereY = spherePoints[idx].y * mouseVelX;
      const sphereZ = spherePoints[idx].z * mouseVelX;
      // Box position within logo group
      const x = position[0];
      const y = position[1];
      const z = position[2];
      // Set position by combining position of entire logo group, each boxes individual position within group, and variable sphere position.
      tempObject.position.set(
        groupPosXY - x - sphereX,
        groupPosXY - y - sphereY,
        groupPosZ - z - sphereZ
      );
      // Rotate individual boxes using current time.  This gives a wave like effect bc time will be slightly different as each box is set in the loop.
      tempObject.rotation.y =
        Math.sin(x / 4 + time) +
        Math.sin(y / 4 + time) +
        Math.sin(z / 4 + time);
      tempObject.rotation.z = tempObject.rotation.y * 2;
      // Apply new values to matrix
      tempColor.set(boxColorsHex[colorIds[idx]]).toArray(colorArray, id * 3);
      tempObject.updateMatrix();
      ref.current.setMatrixAt(id, tempObject.matrix);
    });
    ref.current.geometry.attributes.color.needsUpdate = true;
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={ref}
      args={[null, null, numOfInstances]}
      position={meshPosition}
      rotation={[0, 0, Math.PI]}
      scale={meshScale}
      visible={!isLoading}
    >
      <boxBufferGeometry attach='geometry' args={[boxSize, boxSize, boxSize]}>
        <instancedBufferAttribute
          attachObject={['attributes', 'color']}
          args={[colorArray, 3]}
        />
      </boxBufferGeometry>
      <meshPhongMaterial attach='material' vertexColors={THREE.VertexColors} />
    </instancedMesh>
  );
}
