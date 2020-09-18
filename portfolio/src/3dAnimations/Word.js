import React, { Suspense } from 'react';
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
  blackholeCenter,
  maxSpeeds,
  graphics,
  icon,
}) {
  const letters = [...text];
  const [x, y, z] = position;
  let currentSpacing; // spacing of current letter
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

  console.log(spacingArray);
  // Calculate letter positions and center
  // const center = (letters.length * letterSpacing) / 2;
  // const offset = x - center;
  let positionsX = [];
  let positionCurrent = 0;
  letters.forEach((val, idx) => {
    positionsX.push(positionCurrent);
    positionCurrent += spacingArray[idx];
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
        fadeGroup={fadeGroup}
        color={color}
        mouse={mouse}
        common={common}
        maxSpeeds={maxSpeeds}
        graphics={graphics}
        icon={icon}
      />
    </Suspense>
  ));

  return (
    <mesh position={[blackholeCenter[0], blackholeCenter[1], 0]}>
      {letterComponents}
    </mesh>
  );
}
