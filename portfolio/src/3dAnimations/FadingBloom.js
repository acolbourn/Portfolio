import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { EffectComposer, Bloom } from 'react-postprocessing';
import { KernelSize } from 'postprocessing';

export default function FadingBloom() {
  const ref = useRef();
  useFrame(
    (state) =>
      (ref.current.luminanceMaterial.threshold =
        0.01 + (1 + Math.sin(state.clock.getElapsedTime() * 2)) / 2),
    []
  );
  return (
    <EffectComposer>
      <Bloom ref={ref} KernelSize={KernelSize.VERY_LARGE} height={200} />
    </EffectComposer>
  );
}
