import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import RedLight from './RedLight';

export default function Lights({ mouse, graphics }) {
  const centerLight = useRef();
  const centerIntensity = 1.2;
  // Disable spotlight in blackhole zone to avoid reflection
  useFrame(() => {
    const { inBlackHoleZone } = mouse.current;
    centerLight.current.intensity = inBlackHoleZone ? 0 : centerIntensity;
  });
  return (
    <>
      <ambientLight intensity={1} />
      <pointLight
        ref={centerLight}
        position={[0, 0, 200]}
        intensity={centerIntensity}
      />

      {graphics !== 'low' ? (
        <RedLight maxIntensity={2.5} mouse={mouse} />
      ) : null}
    </>
  );
}
