import React, { Suspense } from 'react';
import { positions } from './constants';
import Letter from './Letter';

export default function Word({
  fontSize,
  fadeGroup,
  text,
  letterSpacing,
  position,
  rotation,
  color,
  mouse,
  common,
  maxSpeeds,
  graphics,
  icon,
  alignText,
  scale,
  isLine,
}) {
  const letters = [...text];
  const [x, y, z] = position;
  let spacingArray = []; // Spacing array of each individual letter
  const spacingPropLength = letterSpacing.length;

  // Create letter spacing array, use last value of user array for all letter spacing if array less than # of letters or 1 value
  letters.forEach((letter, idx) => {
    if (idx < spacingPropLength - 1) {
      spacingArray.push(letterSpacing[idx]);
    } else {
      spacingArray.push(letterSpacing[spacingPropLength - 1]);
    }
  });

  // Calculate letter positions and center
  let positionsX = [];
  let positionCurrent = 0;
  letters.forEach((val, idx) => {
    positionsX.push(positionCurrent);
    positionCurrent += spacingArray[idx];
  });
  const center = positionsX[positionsX.length - 1] / 2;
  let offset = x; // text x position offset
  if (alignText === 'center') {
    offset = x - center;
  }
  let letterPositions = positionsX.map((posX) => [posX + offset, y + 5, z]);

  const letterComponents = letters.map((letter, idx) => (
    <Suspense key={idx} fallback={null}>
      <Letter
        text={letter}
        position={letterPositions[idx]}
        rotation={rotation}
        fontSize={fontSize}
        fadeGroup={fadeGroup}
        color={color}
        mouse={mouse}
        common={common}
        maxSpeeds={maxSpeeds}
        graphics={graphics}
        icon={icon}
        isLine={isLine}
        letterSpacing={letterSpacing}
      />
    </Suspense>
  ));

  return (
    <mesh position={[positions.logo[0], positions.logo[1], 0]} scale={scale}>
      {letterComponents}
    </mesh>
  );
}
