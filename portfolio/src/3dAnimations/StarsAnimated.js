import React, { useState, useRef } from 'react';
import { Stars } from 'drei';
import { useFrame } from 'react-three-fiber';
import { useSpring, animated, config } from 'react-spring/three';
import { scalePow } from 'd3-scale';

export default function StarsAnimated({ mouse, position }) {
  const groupRef = useRef();
  let scale = 1; // 1 = normal stars, 0 = blackhole

  // Scaling function
  let starScaleLog = scalePow()
    .exponent(0.2)
    .domain([0, 0.3])
    .range([0, 1])
    .clamp(true);

  // Init react-spring variables, used for smooth movement
  const [spring, set] = useSpring(() => ({
    scale: [1, 1, 1],
    config: {
      mass: 20,
      tension: 150,
      friction: 50,
      clamp: true,
    },
    // config: config.slow,
  }));

  useFrame(() => {
    const {
      // mouseX,
      // mouseY,
      // mouseXScaled,
      // mouseYScaled,
      mouseXLeftLin,
      mouseXRightLin,
      // mouseXLeftLog,
      mouseXRightLog,
      inDeadZone,
      inBlackHoleZone,
      isLeftOrRight,
      disableMouse,
    } = mouse.current;
    // groupRef.current.scale.set(mouseXLeftLin, mouseXLeftLin, mouseXLeftLin);
    if (inBlackHoleZone) {
      scale = 0;
    } else {
      scale = starScaleLog(mouseXLeftLin);
    }

    // Update React-Spring
    set({
      scale: [scale, scale, scale],
    });

    // Check scale and update blackhole animation state machine so blackhole will emerge once stars are fully sucked into hole
    if (groupRef.current.scale.x === 0) {
      mouse.current.blackHoleState = 'Stars In';
    } else {
      mouse.current.blackHoleState = 'Stars Out';
    }
    // console.log(groupRef.current.scale.x);
  });
  return (
    <animated.mesh ref={groupRef} {...spring} position={position}>
      <Stars depth={150} />
    </animated.mesh>
  );
}
