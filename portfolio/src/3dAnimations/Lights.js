import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import RedLight from './RedLight';

export default function Lights({ mouse, graphics }) {
  const centerLight = useRef();
  const intensityRef = useRef(1);
  const centerIntensityMax = 1.2;
  let intensity = 1; // 1 = full intensity, 0 = none;
  const intensityFadeSpeed = 0.02; // Fade to 0 in blackhole

  useFrame(() => {
    const { inBlackHoleZone, disableMouse } = mouse.current;

    // Disable mouse for intro animations
    if (!disableMouse) {
      // Fade out spotlights in blackhole zone to avoid reflection
      if (inBlackHoleZone) {
        if (intensity > 0) {
          intensity -= intensityFadeSpeed;
        } else {
          intensity = 0;
        }
      } else {
        intensity = 1;
      }
    }

    // Update center light
    centerLight.current.intensity = intensity * centerIntensityMax;
    // Update ref for red light to use
    intensityRef.current = intensity;
  });
  return (
    <>
      <ambientLight intensity={1} />
      <pointLight
        ref={centerLight}
        position={[0, 0, 200]}
        intensity={centerIntensityMax}
      />

      {graphics !== 'low' ? (
        <RedLight
          maxIntensity={2.5}
          mouse={mouse}
          intensityRef={intensityRef}
        />
      ) : null}
    </>
  );
}
