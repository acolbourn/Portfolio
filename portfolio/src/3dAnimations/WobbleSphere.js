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

export default function WobbleSphere({ position, mouse }) {
  const main = useRef();
  // const bumpMap = useTextureLoader('3dResources/bump.jpg');
  // var myImage = new Image(100, 200);
  // myImage.src = '3dResources/bump.jpg';
  // document.body.appendChild(myImage);
  // const envMap = useCubeTextureLoader(
  //   ['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'],
  //   { path: './3dResources/cube/' }
  // );

  const bumpTextureLoader = new THREE.TextureLoader();
  const bumpMap = bumpTextureLoader.load('3dResources/bump.jpg');

  const cubeTextureLoader = new THREE.CubeTextureLoader();
  // const envMap = cubeTextureLoader.load([
  //   '3dResources/cube/px.png',
  //   '3dResources/cube/nx.png',
  //   '3dResources/cube/py.png',
  //   '3dResources/cube/ny.png',
  //   '3dResources/cube/pz.png',
  //   '3dResources/cube/nz.png',
  // ]);
  const envMap = cubeTextureLoader.load([
    '3dResources/spaceMap/right.png',
    '3dResources/spaceMap/left.png',
    '3dResources/spaceMap/top.png',
    '3dResources/spaceMap/bot.png',
    '3dResources/spaceMap/front.png',
    '3dResources/spaceMap/back.png',
  ]);

  // We use `useResource` to be able to delay rendering the spheres until the material is ready
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

    main.current.visible = false;
  });
  return (
    <Suspense fallback={null}>
      <MeshDistortMaterial
        ref={matRef}
        envMap={envMap}
        bumpMap={bumpMap}
        color={'#010101'}
        // color={'black'}
        roughness={0.1}
        metalness={0}
        bumpScale={0.005}
        clearcoat={1}
        clearcoatRoughness={1}
        radius={1}
        distort={0.4}
        reflectivity={1}
      />
      {/* <MeshDistortMaterial
        ref={matRef}
        color={'black'}
        // color={'#010101'}
        roughness={0.1}
        metalness={1}
        bumpScale={0.005}
        clearcoat={1}
        clearcoatRoughness={1}
        radius={1}
        distort={0.4}
      /> */}
      {/* <MeshDistortMaterial
        ref={matRef}
        attach='material'
        distort={0.4} // Strength, 0 to 1
        color='black'
        emissive='black'
        reflectivity={1}
        roughness={0.1}
        metalness={1}
        bumpScale={0.005}
        clearcoat={1}
        clearcoatRoughness={1}
      /> */}
      {material && (
        <Icosahedron
          args={[1, 4]}
          ref={main}
          material={material}
          position={position}
          scale={[8, 8, 8]}
        />
      )}
    </Suspense>
  );
}

// export default function WobbleSphere() {
//   return (

//       <MainSphere />

//   );
// }

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
