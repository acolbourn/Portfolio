import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';

export default function Light({ maxIntensity, mouse }) {
  const light = useRef();

  // Scale red light intensity from 0 to max as mouse moves center to top
  useFrame(() => {
    const { mouseYScaled, disableMouse, inBlackHoleZone } = mouse.current;
    light.current.intensity =
      disableMouse || inBlackHoleZone
        ? 0
        : maxIntensity * Math.abs(mouseYScaled);
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
