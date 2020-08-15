import * as THREE from 'three';
import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useResource } from 'react-three-fiber';
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
} from 'react-postprocessing';
import {
  Html,
  Icosahedron,
  useTextureLoader,
  useCubeTextureLoader,
  MeshDistortMaterial,
} from 'drei';

function MainSphere() {
  const main = useRef();
  const [matRef, material] = useResource();

  // main sphere rotates following the mouse position
  useFrame(({ clock, mouse }) => {
    main.current.rotation.z = clock.getElapsedTime();
    main.current.rotation.y = THREE.MathUtils.lerp(
      main.current.rotation.y,
      mouse.x * Math.PI,
      0.1
    );
    main.current.rotation.x = THREE.MathUtils.lerp(
      main.current.rotation.x,
      mouse.y * Math.PI,
      0.1
    );
  });
  return (
    <>
      <MeshDistortMaterial
        ref={matRef}
        color={'#010101'}
        roughness={0.1}
        metalness={1}
        bumpScale={0.005}
        clearcoat={1}
        clearcoatRoughness={1}
        radius={1}
        distort={0.4}
      />
      {material && (
        <Icosahedron
          args={[1, 4]}
          ref={main}
          material={material}
          position={[0, 0, 0]}
          scale={[8, 8, 8]}
        />
      )}
    </>
  );
}

export default function WobbleSphere() {
  return (
    <Suspense fallback={<Html center>Loading.</Html>}>
      <MainSphere />
    </Suspense>
  );
}

// <Canvas
//   colorManagement
//   camera={{ position: [0, 0, 3] }}
//   gl={{ powerPreference: "high-performance", alpha: false, antialias: false, stencil: false, depth: false }}>
//   <color attach="background" args={["#050505"]} />
//   <fog color="#161616" attach="fog" near={8} far={30} />
//   <Suspense fallback={<Html center>Loading.</Html>}>
//     <Scene />
//   </Suspense>
//   <EffectComposer>
//     <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
//     <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} opacity={3} />
//     <Noise opacity={0.025} />
//     <Vignette eskil={false} offset={0.1} darkness={1.1} />
//   </EffectComposer>
// </Canvas>
