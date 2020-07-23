import * as THREE from 'three';
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from 'react-three-fiber';
import niceColors from 'nice-color-palettes';
import logoPoints from './logoPoints.js';

const tempObject = new THREE.Object3D();
const tempColor = new THREE.Color();
const colors = new Array(1000)
  .fill()
  .map(() => niceColors[17][Math.floor(Math.random() * 5)]);

// const logoPoints = [
//   [4385, 4140],
//   [4187, 4114],
//   [3992, 4069],
//   [3803, 4005],
//   [3620, 3923],
//   [3447, 3823],
//   [3285, 3706],
//   [3135, 3574],
//   [2999, 3427],
//   [2878, 3268],
//   [2773, 3098],
//   [2738, 2921],
// ];

const scaleDivider = 150;
const logoPointsScaled = logoPoints.map((x) => [
  x[0] / scaleDivider,
  x[1] / scaleDivider,
]);
console.log(logoPointsScaled);

const positions = [
  [0, 0],
  [0, 1],
  [0, 2],
];
const depth = 2;
const numOfInstances = logoPointsScaled.length * depth;
const boxSize = 1;

export default function LogoBoxes() {
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
    logoPointsScaled.forEach((position) => {
      const x = position[0];
      const y = position[1];
      for (let z = 0; z < depth; z++) {
        const id = i++;
        tempObject.position.set(5 - x, 5 - y, 5 - z);
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