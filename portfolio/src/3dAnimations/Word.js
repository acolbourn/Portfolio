import React, { Suspense } from 'react';
import Letter from './Letter';

export default function Word({
  fontSize,
  fadeDelay,
  text,
  letterSpacing,
  position,
  rotation,
  color,
  mouse,
  common,
  blackholeCenter,
  maxSpeeds,
}) {
  const letters = [...text];
  const [x, y, z] = position;
  // Calculate letter positions and center
  // const center = (letters.length * letterSpacing) / 2;
  // const offset = x - center;
  let positionsX = [];
  let positionCurrent = 0;
  letters.forEach(() => {
    positionsX.push(positionCurrent);
    positionCurrent += letterSpacing;
  });
  const center = positionsX[positionsX.length - 1] / 2;
  const offset = x - center;
  let positions = positionsX.map((posX) => [posX + offset, y + 5, z]);

  const letterComponents = letters.map((letter, idx) => (
    <Suspense key={idx} fallback={null}>
      <Letter
        text={letter}
        position={positions[idx]}
        rotation={rotation}
        fontSize={fontSize}
        fadeDelay={fadeDelay}
        color={color}
        mouse={mouse}
        common={common}
        maxSpeeds={maxSpeeds}
      />
    </Suspense>
  ));

  return (
    <mesh position={[blackholeCenter[0], blackholeCenter[1], 0]}>
      {letterComponents}
    </mesh>
  );
}
