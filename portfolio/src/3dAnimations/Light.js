import React, { useRef } from 'react';

import { useFrame } from 'react-three-fiber';

export default function Light({ maxIntensity, mouse, disableMouse }) {
  const light = useRef();

  // Scale red light intensity from 0 to max as mouse moves center to top
  useFrame((state) => {
    light.current.intensity = disableMouse
      ? 0
      : maxIntensity * Math.abs(mouse.current[2]);
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
