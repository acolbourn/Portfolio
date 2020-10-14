import React, { useRef, useEffect } from 'react';
import { extend, useThree, useFrame } from 'react-three-fiber';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { scalePow } from 'd3-scale';

extend({ EffectComposer, ShaderPass, RenderPass, UnrealBloomPass, FilmPass });

export default function SunBloom({ mouse }) {
  const composer = useRef();
  const bloomRef = useRef();
  const { scene, gl, size, camera } = useThree();
  const minStrength = 0; // min bloom strength
  const maxStrength = 1.5; // max bloom strength
  let strengthVel = minStrength; // Delayed bloom for smooth animations
  const animationSpeed = 0.005; // Animation fade speed

  // Bloom strength scaling function
  let strengthScaleLog = scalePow()
    .exponent(0.7)
    .domain([0, 1])
    .range([maxStrength, minStrength])
    .clamp(true);

  useEffect(() => void composer.current.setSize(size.width, size.height), [
    size,
  ]);

  useFrame(() => {
    const {      
      mouseXLeftLin, disableMouse } = mouse.current;

    // Disable mouse on load and use intro animation values
    if (!disableMouse) {
      // Set target bloom strength based on mouse position
      const targetStrength = strengthScaleLog(mouseXLeftLin);

      // Delay bloom fade out but keep fade in instant
      if (bloomRef.current.strength > targetStrength) {
        strengthVel += (targetStrength - strengthVel) * animationSpeed;
      } else {
        strengthVel = targetStrength;
      }
    }

    // Apply updates
    bloomRef.current.strength = strengthVel;
    bloomRef.current.needsUpdate = true;
    composer.current.needsUpdate = true;
    composer.current.render();
  }, 2);
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray='passes' scene={scene} camera={camera} />
      <unrealBloomPass
        ref={bloomRef}
        attachArray='passes'
        args={[undefined, 0, 1, 0.9]}
      />
    </effectComposer>
  );
}
