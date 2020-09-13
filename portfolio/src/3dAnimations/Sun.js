import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { scalePow } from 'd3-scale';
import { useSpring, animated } from 'react-spring/three';

export default function Sun({ maxIntensity, mouse, position }) {
  const sun = useRef();
  const massImplode = 1; // react-spring mass when imploding
  const massExplode = 20; // react-spring mass when exploding
  let massCurrent = massImplode; // current react-spring mass
  const frictionImplode = 40; // react-spring friction when imploding
  const frictionExplode = 50; // react-spring friction when imploding
  let frictionCurrent = frictionImplode; // current react-spring friction

  // let sunScale = scaleLinear().domain([0, 0.5]).range([2, 1]).clamp(true);
  let sunScaleLog = scalePow()
    .exponent(0.15)
    .domain([0, 0.3])
    .range([6.5, 1])
    .clamp(true);

  // Init react-spring variables, used for smooth movement
  const [sunSpring, set] = useSpring(() => ({
    scale: [0, 0, 0],
    config: { mass: massCurrent, tension: 150, friction: frictionCurrent },
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
      // isLeftOrRight,
      // disableMouse,
    } = mouse.current;

    // Visible from left edge to center left
    if (mouseXLeftLin <= 0.5) {
      sun.current.visible = true;
      let scale = sunScaleLog(mouseXLeftLin);
      if (mouseXLeftLin <= 0) {
        scale = 0;
        massCurrent = massImplode;
        frictionCurrent = frictionImplode;
      } else {
        massCurrent = massExplode;
        frictionCurrent = frictionExplode;
      }
      set({
        scale: [scale, scale, scale],
        config: {
          mass: massCurrent,
          tension: 150,
          friction: frictionCurrent,
        },
      });
    } else {
      sun.current.visible = false;
    }
  });

  return (
    <animated.mesh ref={sun} {...sunSpring} position={position}>
      {/* <mesh ref={sun} position={position}> */}
      <sphereBufferGeometry attach='geometry' args={[4.2, 32, 32]} />
      <meshBasicMaterial attach='material' color='#FFFF99' fog={false} />
      {/* <pointLight distance={6100} intensity={50} color='white' /> */}
      {/* </mesh> */}
    </animated.mesh>
  );
}
