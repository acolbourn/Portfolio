import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';

export default function Light({ maxIntensity, mouse, intensityRef }) {
  const light = useRef();

  useFrame(() => {
    const { mouseYScaled, disableMouse } = mouse.current;

    if (disableMouse) {
      // light intensity is 0 during intro animations
      light.current.intensity = 0;
    } else {
      // Scale red light intensity from 0 to max as mouse moves center to top/bottom. Multiply by main light intensity ref which fades to 0 in blackhole, 1 outside to avoid reflections
      light.current.intensity =
        maxIntensity * Math.abs(mouseYScaled) * intensityRef.current;
    }
  });

  return (
    <pointLight
      ref={light}
      position={[-100, -100, -100]}
      intensity={0}
      color='red'
    />
  );
}
