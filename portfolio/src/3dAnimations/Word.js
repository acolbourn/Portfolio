import React, { Suspense } from 'react';
import Letter from './Letter';

export default function Word({ fontSize, fadeDelay, text }) {
  return [...text].map((letter) => (
    <Suspense fallback={null}>
      <Letter
        text={letter}
        position={[0, 0, 0]}
        fontSize={fontSize}
        fadeDelay={fadeDelay}
      />
    </Suspense>
  ));
}
