import * as THREE from 'three';
import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import Color from 'color';
import { scaleLinear, scaleLog, scalePow } from 'd3-scale';
import logoPoints from './logoPoints.js';
import {
  getRandomSpherePoints,
  getHypotenuses,
  scaleMouse,
} from './LogoBoxesHelpers';

// const colorPalette = ['#1b262c', '#0f4c75', '#00b7c2']; // Colors when mouse at bottom of screen
const colorPalette = ['#222831', '#393e46', '#0092ca']; // Colors when mouse at bottom of screen
const uniformColorOptions = ['black', 'blue', '#0047AB', '#002456'];
const uniformColor = uniformColorOptions[2]; // Color when mouse at top of screen
let defaultBoxColor = Color('#2a363b'); // Color at screen center
const depth = 5; // Layers of boxes in Z direction
const numOfInstances = logoPoints.length * depth; // Total # of boxes
const boxSize = 1; // Physical box dimensions
// const maxBoxDistance = 300 // Max distance boxes spread from each other
const maxBoxDistance = 6000; // Max distance boxes spread from each other
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
const animateSpeedY = 0.02; // Delay time for user mouse position to smooth out animation effect in Y direction
const explodeSpeed = 0.02; // Delay time for user mouse position to smooth out explosion animation effect
const implodeSpeed = 0.2; // Delay time for user mouse position to smooth out implosion animation effect
let animateVel = explodeSpeed; // Delayed animation speed changes for smoother animation
const deadZone = 75; // Space at center of screen where mouse movements don't effect animations
let colorIndex = 0; // Current color index to select varying color when mouse at bottom of screen
let offset; // Starting index of next color used in render loop
// Create array with xy points copied to each depth in z direction
const logoPoints3d = [];
logoPoints.forEach((point) => {
  for (let z = 0; z < depth; z++) {
    logoPoints3d.push([point[0], point[1], z]);
  }
});
// Calculate each points' distance to group origin;
const pointsHypotenuses = getHypotenuses(groupPosXY, groupPosZ, logoPoints3d);

export default function LogoBoxes({
  mouse,
  meshPosition,
  meshScale,
  fadeDelay,
  disableMouse,
}) {
  const ref = useRef(); // Mesh ref
  const [isLoading, setIsLoading] = useState(true);
  const [initBoxPosition, setInitBoxPosition] = useState(3000);

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

  // Start boxes spread out and assemble after delay
  useEffect(() => {
    let timer1 = setTimeout(() => {
      setInitBoxPosition(0);
      setIsLoading(false);
    }, fadeDelay);
    // Clear timeout on unmount
    return () => {
      clearTimeout(timer1);
    };
  });

  useFrame((state) => {
    let i = 0;
    const time = state.clock.getElapsedTime();
    const windowHalf = window.innerWidth / 2; // Half window width for scaling

    // Rotate logo group
    ref.current.rotation.y += 0.01;

    // Scale mouse positions and velocities for animations
    if (disableMouse) {
      // Disable mouse on load and use intro animation values
      mouseX = initBoxPosition;
      mouseY = 0;
    } else {
      // if on right side of screen, scale logorathmically for explosion, else on left side scale linearly for implosion
      if (mouse.current[0] >= 0) {
        let explodeScale = scalePow()
          .exponent(10)
          .domain([deadZone, windowHalf])
          .range([0, maxBoxDistance])
          .clamp(true);
        mouseX = explodeScale(mouse.current[0]);
        // mouseX = scaleMouse(
        //   mouse.current[0],
        //   window.innerWidth,
        //   'log',
        //   deadZone,
        //   maxBoxDistance
        // );
      } else {
        let implodeScale = scaleLinear()
          .domain([-deadZone, -windowHalf])
          .range([0, -1])
          .clamp(true);
        mouseX = implodeScale(mouse.current[0]);

        // mouseX = scaleMouse(
        //   mouse.current[0],
        //   window.innerWidth,
        //   'linear',
        //   deadZone,
        //   1
        // );
      }
      mouseY = mouse.current[2];
    }

    // Create smooth scale between implosion/explosion animation speeds
    // Scale from 3/4 of window to left window edge, right quarter remains constant at explode speed
    let animateScale = scalePow()
      .exponent(0.1)
      .domain([windowHalf / 2, -windowHalf])
      .range([explodeSpeed, implodeSpeed])
      .clamp(true);
    let scaledAnimationSpeed = animateScale(mouse.current[0]);

    // "Velocity" in this case just means a slower/smoother animation.
    animateVel += (scaledAnimationSpeed - animateVel) * 0.02;
    // console.log('mouse: ', mouse.current[0], '    speed: ', animateVel);
    mouseVelX += (mouseX - mouseVelX) * animateVel;
    mouseVelY += (mouseY - mouseVelY) * animateSpeedY;

    // Shrink scale on implosion
    // const windowOffset = 20; // Offset so it implodes slighlty before edge
    //    let shrinkScale = scalePow()
    //   .exponent(3)
    //   .domain([-deadZone, -windowHalf + windowOffset])
    //   .range([1, 0])
    //   .clamp(true);

    // // Shrink entire mesh for implosion animation
    // const shrinkFactor = shrinkScale(mouse.current[0]);
    // ref.current.scale.set(shrinkFactor, shrinkFactor, shrinkFactor);

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

      // Box position within logo group
      const x = position[0];
      const y = position[1];
      const z = position[2];

      // if mouse is center to right -> explode effect, left to center -> black hole effect

      // // Calculate point on sphere based on user mouse movement
      // const sphereX = spherePoints[idx].x * mouseVelX;
      // const sphereY = spherePoints[idx].y * mouseVelX;
      // const sphereZ = spherePoints[idx].z * mouseVelX;
      // Set position by combining position of entire logo group, each boxes individual position within group, and variable sphere position.
      // tempObject.position.set(
      //   groupPosXY - x - sphereX,
      //   groupPosXY - y - sphereY,
      //   groupPosZ - z - sphereZ
      // );

      // Explosion Animation
      // Calculate point on sphere based on user mouse movement
      // Set mouse to 0 on left side of screen to bypass explosion effect
      const sphereDist = mouseVelX >= 0 ? mouseVelX : 0;
      // Generate explode functions
      const explodeX = spherePoints[idx].x * sphereDist;
      const explodeY = spherePoints[idx].y * sphereDist;
      const explodeZ = spherePoints[idx].z * sphereDist;

      // Implosion Animation

      // // Set mouse to 0 on right side of screen to bypass implosion effect
      // const mouseFilterd = mouseVelX <= 0 ? mouseVelX : 0;
      // // Use y = mx + b to shift effect range from center of screen/right side to left side/center
      // const mouseShiftedX = -mouseFilterd - 1;
      // Shift scale so left edge of screen is 0, middle is -1
      let shiftScale = scaleLinear().domain([-1, 0]).range([0, -1]).clamp(true);
      const mouseShiftedX = shiftScale(mouseVelX);
      const wobbleFactor = 0;
      // From left edge to mid left, collapse sphere to origin
      let sphereScale = scalePow()
        .exponent(0.3)
        .domain([0, -0.5])
        .range([1, 5])
        .clamp(true);
      const sphereRadius = sphereScale(mouseShiftedX);
      // if (idx === 0) {
      //   console.log(sphereRadius);
      // }
      // From center to mid left, transition for logo to sphere
      let logo2SphereScale = scaleLinear()
        .domain([-0.5, -1])
        .range([0, -1])
        .clamp(true);
      const logo2Sphere = logo2SphereScale(mouseShiftedX);
      // Generate implode functions
      const implodeX =
        (-x - groupPosXY) * logo2Sphere -
        spherePoints[idx].x * sphereRadius * (1 + logo2Sphere);
      const implodeY =
        (-y - groupPosXY) * logo2Sphere -
        spherePoints[idx].y * sphereRadius * (1 + logo2Sphere);
      const implodeZ =
        (-z - groupPosZ) * logo2Sphere -
        spherePoints[idx].z * sphereRadius * (1 + logo2Sphere);

      // // Collapse to sphere
      // const wobbleFactor = 0;
      // const explodeFactor = 5;
      // tempObject.position.set(
      //   groupPosXY + (x - groupPosXY) * mouseLinearX,
      //   groupPosXY + (y - groupPosXY) * mouseLinearX,
      //   groupPosZ + (z - groupPosZ) * mouseLinearX
      // );

      // let rightWeight = mouse.current[0] <= 0 ? 0 : mouseVelX;

      // Collapse to sphere right to center

      tempObject.position.set(
        groupPosXY - implodeX - explodeX,
        groupPosXY - implodeY - explodeY,
        groupPosZ - implodeZ - explodeZ
      );

      // // Collapse to sphere right to center
      // const wobbleFactor = 0;
      // const explodeFactor = 5;
      // tempObject.position.set(
      //   groupPosXY -
      //     (x - groupPosXY) * mouseLinearX -
      //     spherePoints[idx].x * explodeFactor * (1 - mouseLinearX),
      //   groupPosXY -
      //     (y - groupPosXY) * mouseLinearX -
      //     spherePoints[idx].y * explodeFactor * (1 - mouseLinearX),
      //   groupPosZ -
      //     (z - groupPosZ) * mouseLinearX -
      //     spherePoints[idx].z * explodeFactor * (1 - mouseLinearX)
      // );

      // // Weird Combo Bend and explode effect
      // const wobbleFactor = (Math.sin(time) / 2) * mouseLinearX;
      // const explodeFactor = 5;
      // tempObject.position.set(
      //   groupPosXY -
      //     (x - groupPosXY) * mouseLinearX -
      //     pointsHypotenuses[idx] * wobbleFactor -
      //     spherePoints[idx].x *
      //       wobbleFactor *
      //       explodeFactor *
      //       (1 - mouseLinearX),
      //   groupPosXY -
      //     (y - groupPosXY) * mouseLinearX -
      //     pointsHypotenuses[idx] * wobbleFactor -
      //     spherePoints[idx].y *
      //       wobbleFactor *
      //       explodeFactor *
      //       (1 - mouseLinearX),
      //   groupPosZ -
      //     (z - groupPosZ) * mouseLinearX -
      //     pointsHypotenuses[idx] * wobbleFactor -
      //     spherePoints[idx].z *
      //       wobbleFactor *
      //       explodeFactor *
      //       (1 - mouseLinearX)
      // );

      // // Moving Bend effect
      // const wobbleFactor = Math.sin(time) / 2;
      // tempObject.position.set(
      //   groupPosXY -
      //     (x - groupPosXY) * mouseLinearX -
      //     pointsHypotenuses[idx] * wobbleFactor,
      //   groupPosXY -
      //     (y - groupPosXY) * mouseLinearX -
      //     pointsHypotenuses[idx] * wobbleFactor,
      //   groupPosZ -
      //     (z - groupPosZ) * mouseLinearX -
      //     pointsHypotenuses[idx] * wobbleFactor
      // );

      // // Shrink to 0 in formation
      // tempObject.position.set(
      //   groupPosXY - (x - groupPosXY) * mouseLinearX,
      //   groupPosXY - (y - groupPosXY) * mouseLinearX,
      //   groupPosZ - (z - groupPosZ) * mouseLinearX
      // );

      // Weird Bendy effect
      // tempObject.position.set(
      //   groupPosXY - x - pointsHypotenuses[idx] * mouseLinearX,
      //   groupPosXY - y - pointsHypotenuses[idx] * mouseLinearX,
      //   groupPosZ - z - pointsHypotenuses[idx] * mouseLinearX
      // );

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
