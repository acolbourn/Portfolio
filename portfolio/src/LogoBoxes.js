import * as THREE from 'three';
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from 'react-three-fiber';
import logoPoints from './logoPoints.js';
import { getRandomSpherePoints, scaleMouse } from './LogoBoxesHelpers';
import Color from 'color';

const depth = 5;
const numOfInstances = logoPoints.length * depth;
const boxSize = 1;
const groupPosZ = (depth * boxSize) / 2 - boxSize / 2;
const groupPosXY = 0;
const tempObject = new THREE.Object3D();
const tempColor = new THREE.Color();
const colorPalette = ['#99b898', '#fecea8', '#ff847c', '#e84a5f', '#2a363b'];
// const colors = new Array(numOfInstances)
//   .fill()
//   .map(() => colorPalette[Math.floor(Math.random() * 5)]);

let boxColors = [];
let boxColorsHex = [];
let uniformBoxColorHex;
// Generate initial color arrays. Use id's to reduce number of computations run each loop.  Only a set number of colors is calculated each time instead of each individual box, and then boxes pull from one of those precalculated limiited colors based on their id.
colorPalette.forEach((color) => boxColors.push(Color(color)));
boxColors.forEach((color) => boxColorsHex.push(color.hex()));
console.log(boxColorsHex);

// let defaultBoxColor = Color('#444444');  // icon grey
let defaultBoxColor = Color('#2a363b'); // grey from nicecolors
let defaultBoxColorHex = defaultBoxColor.hex();
const colors = new Array(numOfInstances).fill().map(() => defaultBoxColorHex);
const colorIds = new Array(numOfInstances)
  .fill()
  .map(() => Math.floor(Math.random() * colorPalette.length));

// const colors = new Array(numOfInstances).fill().map(() => '#444444');
const spherePoints = getRandomSpherePoints(numOfInstances);
let mouseX = 0;
let mouseY = 0;
let mouseVelX = 0;
let mouseVelY = 0;
const animateSpeed = 0.02;

// Create array with xy points copied to each depth in z direction
const logoPoints3d = [];
logoPoints.forEach((point) => {
  for (let z = 0; z < depth; z++) {
    logoPoints3d.push([point[0], point[1], z]);
  }
});

export default function LogoBoxes({ mouse, meshPosition, meshScale }) {
  const [hovered, set] = useState();
  const colorArray = useMemo(
    () =>
      Float32Array.from(
        new Array(numOfInstances)
          .fill()
          .flatMap((_, i) => tempColor.set(colors[i]).toArray())
      ),
    []
  );

  const ref = useRef();
  const previous = useRef();
  useEffect(() => void (previous.current = hovered), [hovered]);
  // Load with boxes spaced out and animate in after 3s
  // useEffect(() => {
  //   mouse.current[0] = 400;
  //   console.log('here');
  //   setTimeout(() => (mouse.current[0] = 0), 2000);
  // }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // ref.current.rotation.x = Math.sin(time / 4);
    // ref.current.rotation.y = Math.sin(time / 2);
    ref.current.rotation.y += 0.01;

    let i = 0;

    // Scale mouse positions and create velocities for animations
    mouseX = scaleMouse(mouse.current[0], window.innerWidth, 'log', 75, 300);
    mouseY = scaleMouse(mouse.current[1], window.innerHeight, 'linear', 0, 1);
    mouseVelX += (mouseX - mouseVelX) * animateSpeed;
    mouseVelY += (-mouseY - mouseVelY) * animateSpeed;

    // Calculate box colors based on mouse y position
    // defaultBoxColorHex = defaultBoxColor.lighten(Math.abs(mouseY / 100)).hex();
    if (mouseY < 0) {
      uniformBoxColorHex = defaultBoxColor
        .mix(Color('blue'), Math.abs(mouseY))
        .hex();
      boxColorsHex = boxColorsHex.map(() => uniformBoxColorHex);
    } else {
      boxColorsHex = boxColors.map((color) =>
        color.mix(Color(defaultBoxColorHex), 1 - Math.abs(mouseY)).hex()
      );
    }

    // Update each boxes position, rotation, etc...
    logoPoints3d.forEach((position, idx) => {
      const sphereX = spherePoints[idx].x * mouseVelX;
      const sphereY = spherePoints[idx].y * mouseVelX;
      const sphereZ = spherePoints[idx].z * mouseVelX;
      const x = position[0];
      const y = position[1];
      const z = position[2];

      const id = i++;

      tempObject.position.set(
        groupPosXY - x - sphereX,
        groupPosXY - y - sphereY,
        groupPosZ - z - sphereZ
      );
      tempObject.rotation.y =
        Math.sin(x / 4 + time) +
        Math.sin(y / 4 + time) +
        Math.sin(z / 4 + time);
      tempObject.rotation.z = tempObject.rotation.y * 2;
      // if (hovered !== previous.current) {
      //   tempColor
      //     .set(id === hovered ? 'white' : colors[id])
      //     .toArray(colorArray, id * 3);
      //   ref.current.geometry.attributes.color.needsUpdate = true;
      // }

      // tempColor
      //   .set(colorPalette[Math.floor((mouseY / 100) * 5)])
      //   .toArray(colorArray, id * 3);
      // ref.current.geometry.attributes.color.needsUpdate = true;

      tempColor.set(boxColorsHex[colorIds[idx]]).toArray(colorArray, id * 3);
      ref.current.geometry.attributes.color.needsUpdate = true;

      // const scale = id === hovered ? 1 : 1;
      tempObject.scale.set(1, 1, 1);

      tempObject.updateMatrix();
      ref.current.setMatrixAt(id, tempObject.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={ref}
      args={[null, null, numOfInstances]}
      onPointerMove={(e) => set(e.instanceId)}
      onPointerOut={(e) => set(undefined)}
      position={meshPosition}
      rotation={[0, 0, Math.PI]}
      scale={meshScale}
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
