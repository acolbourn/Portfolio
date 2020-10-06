import React, { useRef } from 'react';
import { Stars, Plane } from 'drei';
import { useFrame } from 'react-three-fiber';
import { useSpring, animated } from 'react-spring/three';
import { scalePow } from 'd3-scale';

export default function StarsAnimated({ mouse, position }) {
  const starRef = useRef();
  const planeRef = useRef();
  let scale = 1; // 1 = normal stars, 0 = blackhole
  let opacity = 1; // Plane opacity 1 = background blocked, 0 = visible
  let fadeIn = false; // true = fade in stars, false = inactive
  let mouseVelX = 1; // Delayed mouse X position for smoother animation

  // Scaling function
  let starScaleLog = scalePow()
    .exponent(0.2)
    .domain([0, 0.3])
    .range([0, 1])
    .clamp(true);

  // Init react-spring variables, used for smooth movement
  const [spring, set] = useSpring(() => ({
    scale: [scale, scale, scale],
    config: {
      mass: 20,
      tension: 150,
      friction: 50,
      clamp: true,
    },
  }));

  useFrame(() => {
    const { mouseXLeftLin, inBlackHoleZone } = mouse.current;

    // Intro Animation State Machine
    if (mouse.current.introState !== 'Done') {
      if (mouse.current.introState === 'Name Loaded') {
        // trigger stars to fade in once name is loaded
        fadeIn = true;
      }
    } else {
      // Scale to 0 in blackhole, mouse x otherwise
      if (inBlackHoleZone) {
        scale = 0;
      } else {
        mouseVelX += (mouseXLeftLin - mouseVelX) * 0.03;
        scale = starScaleLog(mouseVelX);
      }
    }

    // Once name is loaded, fade in stars and boxes by reducing the opacity of the background plane hiding them
    if (fadeIn) {
      if (opacity > 0) {
        opacity -= 0.003;
      } else {
        opacity = 0;
        fadeIn = false;
        planeRef.current.visible = false;
      }
      planeRef.current.material.opacity = opacity;
    }

    // Update React-Spring
    // Only send update if not at setpoint to save cpu
    if (starRef.current.scale.x !== scale) {
      set({
        scale: [scale, scale, scale],
      });
    }

    // Check scale and update blackhole animation state machine so blackhole will emerge once stars are fully sucked into hole
    if (starRef.current.scale.x === 0) {
      mouse.current.blackHoleState = 'Stars In';
    } else {
      mouse.current.blackHoleState = 'Stars Out';
    }
  });
  return (
    <>
      <animated.mesh
        ref={starRef}
        {...spring}
        position={[position[0], position[1], -0.02]}
      >
        <Stars depth={150} />
      </animated.mesh>
      {/* Plane z position must be slightly behind text and slightly in front of stars for opacity fade animation to work */}
      <Plane ref={planeRef} args={[2000, 2000]} position={[0, 0, -0.01]}>
        <meshBasicMaterial
          opacity={1}
          transparent={true}
          attach='material'
          color='#1D1D1D'
        />
      </Plane>
    </>
  );
}
