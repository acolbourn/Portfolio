import * as THREE from 'three';
import React, { Suspense, useRef, useMemo } from 'react';
import { useFrame } from 'react-three-fiber';
import { useSpring, animated } from 'react-spring/three';
import { Icosahedron, MeshDistortMaterial } from 'drei';

export default function WobbleSphere({ position, mouse }) {
  console.log('WobbleSphere rendered');
  const main = useRef();
  const matRef = useRef();

  // Only load cube map once and memoize for graphics updates
  const envMap = useMemo(() => {
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    return cubeTextureLoader.load([
      '3dResources/cubeMap/px.png',
      '3dResources/cubeMap/nx.png',
      '3dResources/cubeMap/py.png',
      '3dResources/cubeMap/ny.png',
      '3dResources/cubeMap/pz.png',
      '3dResources/cubeMap/nz.png',
    ]);  
  }, [])
  

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
          <Icosahedron
            args={[1, 4]}                      
            scale={[8, 8, 8]}
          >
            <MeshDistortMaterial
          ref={matRef}
          envMap={envMap}                           
          color={'white'}          
          roughness={0}
          metalness={0.999}
          bumpScale={0.005}
          clearcoat={1}
          clearcoatRoughness={0}
          radius={1}
          distort={0.4}     
          reflectivity={20}         
        />
            </Icosahedron>        
      </animated.mesh>
    </Suspense>
  );
}
