import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { scalePow } from 'd3-scale';
import { useSpring, animated } from 'react-spring/three';
import { Sphere } from 'drei';

export default function Sun({ mouse, position }) {
  const sun = useRef();  

  // Sun scaling function
  let sunScaleLog = scalePow()
    .exponent(0.2)
    .domain([0, 0.3])
    .range([5, 1])
    .clamp(true);

  // Init react-spring variables, used for smooth movement
  const massImplode = 20; // mass when imploding
  const massExplode = 2; // mass when exploding
  let massCurrent = massImplode; // current mass
  const frictionImplode = 50; // friction when imploding
  const frictionExplode = 50; // friction when imploding
  let frictionCurrent = frictionImplode; // current friction
  let clamp = false; // when true, stops spring overshoot
  let scale; // Sun scale
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
      mouseXLeftLin,      
      inBlackHoleZone,      
      disableMouse,
    } = mouse.current;

    // Disable mouse on load and use intro animation values
    if (!disableMouse) {
      // Sun is visible from left edge to center left
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
      // Only send update if not at setpoint to save cpu
      if (sun.current.scale.x !== scale) {
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
    }
  });

  return (
    <animated.mesh ref={sun} {...sunSpring} position={position}>      
      <Sphere args={[4.2, 32, 32]}>       
        <meshBasicMaterial attach='material' color='#FFFF99' />
      </Sphere>      
    </animated.mesh>
  );
}
