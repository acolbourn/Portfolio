import * as THREE from 'three';
import React, { Suspense, useRef } from 'react';
import { useFrame, useResource } from 'react-three-fiber';
import { useSpring, animated } from 'react-spring/three';
import { Icosahedron, MeshDistortMaterial } from 'drei';

export default function WobbleSphere({ position, mouse }) {
  const main = useRef();

  const bumpTextureLoader = new THREE.TextureLoader();
  const bumpMap = bumpTextureLoader.load('3dResources/bumpMapOptimized.jpg');
  // const bumpMap = bumpTextureLoader.load('3dResources/bump.jpg');

  const cubeTextureLoader = new THREE.CubeTextureLoader();
  const envMap = cubeTextureLoader.load([
    '3dResources/cubeMap2/128Optimized/px.png',
    '3dResources/cubeMap2/128Optimized/nx.png',
    '3dResources/cubeMap2/128Optimized/py.png',
    '3dResources/cubeMap2/128Optimized/ny.png',
    '3dResources/cubeMap2/128Optimized/pz.png',
    '3dResources/cubeMap2/128Optimized/nz.png',
  ]);
  // const envMap = cubeTextureLoader.load([
  //   '3dResources/cube/px.png',
  //   '3dResources/cube/nx.png',
  //   '3dResources/cube/py.png',
  //   '3dResources/cube/ny.png',
  //   '3dResources/cube/pz.png',
  //   '3dResources/cube/nz.png',
  // ]);
  // const envMap = cubeTextureLoader.load([
  //   '3dResources/spaceMapOptimized2/right.jpg',
  //   '3dResources/spaceMapOptimized2/left.jpg',
  //   '3dResources/spaceMapOptimized2/top.jpg',
  //   '3dResources/spaceMapOptimized2/bot.jpg',
  //   '3dResources/spaceMapOptimized2/front.jpg',
  //   '3dResources/spaceMapOptimized2/back.jpg',
  // ]);
  // const envMap = cubeTextureLoader.load([
  //   '3dResources/spaceMap/right.png',
  //   '3dResources/spaceMap/left.png',
  //   '3dResources/spaceMap/top.png',
  //   '3dResources/spaceMap/bot.png',
  //   '3dResources/spaceMap/front.png',
  //   '3dResources/spaceMap/back.png',
  // ]);

  // useResource to delay rendering until the material is ready
  const [matRef, material] = useResource();

  // Init react-spring variables, used for smooth movement
  const massImplode = 1; // mass when imploding
  const massExplode = 4; // mass when exploding
  let massCurrent = massImplode; // current mass
  const frictionImplode = 1; // friction when imploding
  const frictionExplode = 12; // friction when exploding
  let frictionCurrent = frictionImplode; // current friction
  let clamp = false; // when true, stops spring overshoot
  const minScale = 0.2; // Smallest blackhole gets
  const maxScale = 1 // Largest blackhole gets
  let scale = minScale; // 1 in blackhole, minScale outside
  const [spring, set] = useSpring(() => ({
    scale: [scale, scale, scale],
    config: {
      mass: massCurrent,
      tension: 180,
      friction: frictionCurrent,
      clamp: clamp,
    },
  }));

  // main sphere rotates following the mouse position
  useFrame(({ clock }) => {
    const { inBlackHoleZone, blackHoleState, disableMouse } = mouse.current;

    // Disable mouse on load and use intro animation values
    if (!disableMouse) {
      // Show blackhole when mouse in blackhole zone, else hide
      if (inBlackHoleZone) {
        // Wait for stars to update state machine that they have fully sucked into blackhole before triggering blackhole
        if (blackHoleState === 'Stars In') {
          // Set react-spring variables
          main.current.visible = true;
          scale = maxScale;
          massCurrent = massExplode;
          frictionCurrent = frictionExplode;
          clamp = false;
        }

        // Set blob movement variables
        const time = clock.getElapsedTime();
        const rand = Math.sin(time);
        main.current.rotation.z = time;
        main.current.rotation.y = THREE.MathUtils.lerp(
          main.current.rotation.y,
          rand * Math.PI,
          0.1
        );
        main.current.rotation.x = THREE.MathUtils.lerp(
          main.current.rotation.x,
          rand * Math.PI,
          0.1
        );        
      } else {
        // Set react-spring variables
        main.current.visible = false;
        scale = minScale;
        massCurrent = massImplode;
        frictionCurrent = frictionImplode;
        clamp = true;
      }
    } else {
      // hide during intro animation
      main.current.visible = false;
      scale = minScale;   
      matRef.current.envMap.flipY = true; // flip envMap vertically
    }

    // If scale at setpoint, bypass to save cpu
    if (main.current.scale.x !== minScale || scale !== minScale) {
      // Update React-Spring
      set({
        scale: [scale, scale, scale],
        config: {
          mass: massCurrent,
          tension: 180,
          friction: frictionCurrent,
          clamp: clamp,
        },
      });
    }
  });
  return (
    <Suspense fallback={null}>
      <animated.mesh ref={main} {...spring} position={position}>
        <MeshDistortMaterial
          ref={matRef}
          envMap={envMap}
          bumpMap={bumpMap}                   
          color={'white'}
          // color={'#c4c4c4'}
          // color={'#a1a1a1'}
          // color={'#808080'}
          // color={'#303030'} 
          // color={'#1f1f1f'} 
          // color={'#141414'} 
          // color={'#0d0d0d'} 
          // color={'#0a0a0a'} 
          // color={'#010101'}   
          roughness={0}
          metalness={0.999}
          bumpScale={0.005}
          clearcoat={1}
          clearcoatRoughness={0}
          radius={1}
          distort={0.4}
          // speed={10}
          reflectivity={20}          
        />
        {material && (
          <Icosahedron
            args={[1, 4]}
            // ref={main}
            material={material}
            // position={position}
            scale={[8, 8, 8]}
          />
        )}
      </animated.mesh>
    </Suspense>
  );
}
