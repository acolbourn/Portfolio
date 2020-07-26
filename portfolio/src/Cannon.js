/** POC for three-fiber and cannon (a 3d physics lib)
 *
 *  useCannon is a custom hook that lets you link a physics body to a threejs
 *  mesh with zero effort. It will automatically update the mesh with the
 *  correct positioning.
 *
 *  When components with useCannon mount they are known to cannons world, when
 *  they unmount, they'll remove themselves from physics processing.
 *
 *  Check out three-fiber here: https://github.com/drcmda/react-three-fiber
 */

import * as THREE from 'three';
import * as CANNON from 'cannon';
import React, { useEffect, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import { useCannon, Provider } from './hooks/useCannon';
import { OrbitControls } from 'drei';

function Plane({ position }) {
  // Register plane as a physics body with zero mass
  const ref = useCannon({ mass: 0 }, (body) => {
    body.addShape(new CANNON.Plane());
    body.position.set(...position);
  });
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach='geometry' args={[1000, 1000]} />
      <meshStandardMaterial attach='material' color='#171717' />
    </mesh>
  );
}

function Box({ position }) {
  const [sleep, setSleep] = useState(true);
  const boxSize = 2;
  const half = boxSize / 2;

  function handleSleepClick() {
    setSleep(!sleep);
  }

  // Register box as a physics body with mass
  const ref = useCannon({ mass: 100000, static: true, sleep }, (body) => {
    body.addShape(new CANNON.Box(new CANNON.Vec3(half, half, half)));
    body.position.set(...position);
    body.sleep();
    console.log(body.shapes[0].boundingSphereRadius);
  });
  return (
    <mesh ref={ref} castShadow receiveShadow onClick={handleSleepClick}>
      <boxGeometry attach='geometry' args={[boxSize, boxSize, boxSize]} />
      <meshStandardMaterial attach='material' roughness={0.5} color='blue' />
    </mesh>
  );
}

export default function Cannon() {
  //   const [showPlane, set] = useState(true);

  // When React removes (unmounts) the upper plane after 5 sec, objects should drop ...
  // This may seem like magic, but as the plane unmounts it removes itself from cannon and that's that
  //   useEffect(() => void setTimeout(() => set(false), 5000), []);
  return (
    <Canvas
      shadowMap
      camera={{ position: [0, -20, 0] }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.outputEncoding = THREE.sRGBEncoding;
      }}
    >
      <pointLight position={[-10, -10, 30]} intensity={0.25} />
      <spotLight
        intensity={0.3}
        position={[30, 30, 50]}
        angle={0.2}
        penumbra={1}
        castShadow
      />
      <Provider>
        <Plane position={[0, 0, 1]} />
        {/* {showPlane && <Plane position={[0, 0, 1]} />} */}
        <Box position={[0, 0, 2]} />
        <Box position={[0, 0, 4]} />
        <Box position={[0, 0, 6]} />
        <Box position={[2, 0, 6]} />
        <Box position={[4, 0, 6]} />
        {/* <Box position={[0, 0, 3]} />
        <Box position={[0, 0, 4]} />
        <Box position={[1, 0, 4]} />
        <Box position={[2, 0, 4]} />
        <Box position={[2, 0, 3]} />
        <Box position={[2, 0, 2]} />
        <Box position={[2, 0, 1]} /> */}

        {/* <Box position={[0, 0, 2]} />
        <Box position={[0, 0, 3]} /> */}
        {/* <Box position={[1, 0, 1]} />
        <Box position={[2, 0, 1]} />
        <Box position={[3, 0, 1]} />
        <Box position={[4, 0, 2]} /> */}

        {/* {!showPlane && <Box position={[0.5, 1.0, 20]} />} */}
      </Provider>
      <OrbitControls />
    </Canvas>
  );
}
