import * as THREE from 'three';
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from 'react-three-fiber';
import logoPoints from './logoPoints.js';

const depth = 5;
const numOfInstances = logoPoints.length * depth;
const boxSize = 1;
const groupPosZ = (depth * boxSize) / 2 - boxSize / 2;
const groupPosXY = 0;
const tempObject = new THREE.Object3D();
const tempColor = new THREE.Color();
// const colorPalette = ['#99b898', '#fecea8', '#ff847c', '#e84a5f', '#2a363b'];
// const colors = new Array(numOfInstances)
//   .fill()
//   .map(() => colorPalette[Math.floor(Math.random() * 5)]);
const colors = new Array(numOfInstances).fill().map(() => '#444444');
const spherePoints = getRandomSpherePoints(numOfInstances);

export default function LogoBoxes({ mouse }) {
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

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // ref.current.rotation.x = Math.sin(time / 4);
    // ref.current.rotation.y = Math.sin(time / 2);
    ref.current.rotation.y += 0.01;

    let i = 0;
    // for (let x = 0; x < 10; x++)
    //   for (let y = 0; y < 10; y++)
    //     for (let z = 0; z < 10; z++)
    logoPoints.forEach((position, idx) => {
      const sphereX = spherePoints[idx].x * mouse.current[0];
      const sphereY = spherePoints[idx].y * mouse.current[0];
      const sphereZ = spherePoints[idx].z * mouse.current[0];
      const x = position[0];
      const y = position[1];
      for (let z = 0; z < depth; z++) {
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
        if (hovered !== previous.current) {
          tempColor
            .set(id === hovered ? 'white' : colors[id])
            .toArray(colorArray, id * 3);
          ref.current.geometry.attributes.color.needsUpdate = true;
        }
        const scale = id === hovered ? 2 : 1;
        tempObject.scale.set(scale, scale, scale);

        tempObject.updateMatrix();
        ref.current.setMatrixAt(id, tempObject.matrix);
      }
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={ref}
      args={[null, null, numOfInstances]}
      onPointerMove={(e) => set(e.instanceId)}
      onPointerOut={(e) => set(undefined)}
      position={[0, 0, 0]}
      rotation={[0, 0, Math.PI]}
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

function getRandomSpherePoints(count) {
  let points = [];
  for (let i = 0; i < count; i++) {
    let u = Math.random();
    let v = Math.random();
    let theta = u * 2.0 * Math.PI;
    let phi = Math.acos(2.0 * v - 1.0);
    let r = Math.cbrt(Math.random());
    let sinTheta = Math.sin(theta);
    let cosTheta = Math.cos(theta);
    let sinPhi = Math.sin(phi);
    let cosPhi = Math.cos(phi);
    let x = r * sinPhi * cosTheta;
    let y = r * sinPhi * sinTheta;
    let z = r * cosPhi;
    points.push({ x: x, y: y, z: z });
  }
  return points;
}
