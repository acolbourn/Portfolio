import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { scalePow } from 'd3-scale';
import { useSpring, animated } from 'react-spring/three';
import { Plane, Sphere, MeshDistortMaterial } from 'drei';

export default function Sun({ maxIntensity, mouse, position }) {
  const sun = useRef();
  const massImplode = 20; // react-spring mass when imploding
  // const massImplode = 1; // react-spring mass when imploding
  const massExplode = 2; // react-spring mass when exploding
  let massCurrent = massImplode; // current react-spring mass
  const frictionImplode = 50; // react-spring friction when imploding
  // const frictionImplode = 40; // react-spring friction when imploding
  const frictionExplode = 50; // react-spring friction when imploding
  let frictionCurrent = frictionImplode; // current react-spring friction
  let clamp = false; // when true, stops spring overshoot

  // Sun scaling function
  let sunScaleLog = scalePow()
    .exponent(0.2)
    .domain([0, 0.3])
    .range([5, 1])
    .clamp(true);

  // Init react-spring variables, used for smooth movement
  const [sunSpring, set] = useSpring(() => ({
    scale: [0, 0, 0],
    config: {
      mass: massCurrent,
      tension: 150,
      friction: frictionCurrent,
      clamp: clamp,
    },
  }));

  useFrame(() => {
    const {
      // mouseX,
      // mouseXScaled,
      // mouseYScaled,
      mouseXLeftLin,
      // mouseXRightLin,
      // mouseXLeftLog,
      // mouseXRightLog,
      // inDeadZone,
      inBlackHoleZone,
      // isLeftOrRight,
      disableMouse,
    } = mouse.current;

    let scale;

    // Disable mouse on load and use intro animation values
    if (!disableMouse) {
      // Visible from left edge to center left
      if (mouseXLeftLin <= 0.5) {
        sun.current.visible = true;
        clamp = false;
        scale = sunScaleLog(mouseXLeftLin);
        if (inBlackHoleZone) {
          scale = 0;
          clamp = true;
          massCurrent = massImplode;
          frictionCurrent = frictionImplode;
        } else {
          massCurrent = massExplode;
          frictionCurrent = frictionExplode;
        }
      } else {
        // scale quickly to 0 to hide
        sun.current.visible = false;
        scale = 0;
        massCurrent = 1;
        frictionCurrent = 0.01;
        clamp = true;
      }

      // Update React-Spring
      set({
        scale: [scale, scale, scale],
        config: {
          mass: massCurrent,
          tension: 150,
          friction: frictionCurrent,
          clamp: clamp,
        },
      });
    }
  });

  return (
    <animated.mesh ref={sun} {...sunSpring} position={position}>
      {/* <sphereBufferGeometry attach='geometry' args={[4.2, 32, 32]} />
      <meshBasicMaterial attach='material' color='#FFFF99' /> */}
      <Sphere args={[4.2, 32, 32]}>
        {/* <MeshDistortMaterial
          attach='material'
          distort={0.1} // Strength, 0 disables the effect (default=1)
          speed={1} // Speed (default=1)
          color='#FFFF99'
        /> */}
        <meshBasicMaterial attach='material' color='#FFFF99' /> */}
      </Sphere>
      {/* <Sphere args={[4.1, 32, 32]}>
        <MeshDistortMaterial
          attach='material'
          distort={0.3} // Strength, 0 disables the effect (default=1)
          speed={5} // Speed (default=1)
          color='black'
        />
      </Sphere> */}
    </animated.mesh>
  );
}
