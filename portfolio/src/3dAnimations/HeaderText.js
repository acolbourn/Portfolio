import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber';
import { scalePow } from 'd3-scale';
import { getRndInteger } from './LogoBoxesHelpers';
import Word from './Word';

export default function HeaderText({ positions, fontSizes, mouse }) {
  // Process common letter attributes in this component and pass in values with a ref to save as much processing power as possible
  const common = useRef({
    letterScale: 1,
    rotationSpeed: 0.1,
    travelDist: 1,
    explodeOrbit: 1,
    massCurrent: 20,
    frictionCurrent: 50,
  });

  // Variables
  const mainTextColor = '#0047AB';
  const instructionTextColor = 'white';
  const constRotation = 0; // fixed slow rotation when mouse on right of screen
  let rotationSpeed; // rotation speed scaled
  let letterScale = 1; // Scale of each letter
  let travelDist = 1; // Distance to move towards/away from blackhole each frame
  const maxOrbit = 6000; // Max distance of travel towards stars
  let explodeOrbit = 1; // Common explode orbit
  const massImplode = 20; // react-spring mass when imploding
  const massExplode = 1; // react-spring mass when exploding
  let massCurrent = massImplode; // current react-spring mass
  const frictionImplode = 50; // react-spring friction when imploding
  const frictionExplode = 40; // react-spring friction when imploding
  let frictionCurrent = frictionImplode; // current react-spring friction

  // Scaling Functions
  const scaleScale = scalePow() // Scale function of letter scale
    .exponent(0.1)
    .domain([0, 1])
    .range([0, 1])
    .clamp(true);
  const rotSpeedLeftScale = scalePow() // Scale function for rotation speed when mouse on left of screen
    .exponent(0.1)
    .domain([0, 1])
    .range([THREE.Math.degToRad(30), THREE.Math.degToRad(0.1)])
    .clamp(true);

  // Generate random speed percentages so each letter travels in a different orbit.  Precompute large array that each letter can pull from at random each time mouse is in deadzone so orbits constantly change.
  let maxSpeeds = [];
  const speedFactor = 10;
  const minSpeed = speedFactor / 100;
  for (let i = 0; i < 200; i++) {
    // Random max rotation speeds
    let xSpeedMax = getRndInteger(-speedFactor, 100) / 100;
    const ySpeedMax = getRndInteger(speedFactor, 100) / 100;
    const zSpeedMax = getRndInteger(speedFactor, 100) / 100;
    // Clamp x speed since it can be positive or negative
    if (xSpeedMax < minSpeed && xSpeedMax > -minSpeed) {
      xSpeedMax = minSpeed;
    }
    maxSpeeds.push({ x: xSpeedMax, y: ySpeedMax, z: zSpeedMax });
  }

  useFrame(() => {
    const {
      // mouseX,
      // mouseY,
      // mouseXScaled,
      // mouseYScaled,
      mouseXLeftLin,
      mouseXRightLin,
      // mouseXLeftLog,
      mouseXRightLog,
      // inDeadZone,
      isLeftOrRight,
    } = mouse.current;

    // Scale letter if on left of screen to shrink as it gets closer to blackhole, scale to 1 if in deadzone or on right
    // Scale rotation speeds, faster close to hole, slower further
    // Set travel distance towards/away from blackhole
    // Reduce friction closer to right edge to speed up explosion
    // reduce mass when near blackhole to avoid springing out of hole
    if (isLeftOrRight) {
      rotationSpeed = constRotation;
      letterScale = 1;
      travelDist = 1 + 10 * mouseXRightLog + 2 * mouseXRightLin;
      explodeOrbit = maxOrbit * mouseXRightLog;
      massCurrent = massExplode;
      frictionCurrent = frictionImplode - frictionExplode * mouseXRightLog;
    } else {
      rotationSpeed = rotSpeedLeftScale(mouseXLeftLin);
      letterScale = scaleScale(mouseXLeftLin);
      travelDist = 1;
      massCurrent = mouseXLeftLin < 0.01 ? 1 : massImplode;
      frictionCurrent = frictionImplode;
    }

    // update common ref with values
    common.current = {
      letterScale,
      rotationSpeed,
      travelDist,
      explodeOrbit,
      massCurrent,
      frictionCurrent,
    };
  });

  return (
    <>
      <Word
        text={'<'}
        position={positions.instructionsUp}
        rotation={[0, 0, -Math.PI / 2]}
        fontSize={fontSizes.titles}
        letterSpacing={1.2}
        color={instructionTextColor}
        fadeDelay={3000}
        mouse={mouse}
        common={common}
        blackholeCenter={positions.logo}
        maxSpeeds={maxSpeeds}
      />
      <Word
        text={'Colors'}
        position={positions.instructionsY}
        fontSize={fontSizes.titles}
        letterSpacing={1.2}
        color={instructionTextColor}
        fadeDelay={3000}
        mouse={mouse}
        common={common}
        blackholeCenter={positions.logo}
        maxSpeeds={maxSpeeds}
      />
      <Word
        text={'<'}
        position={positions.instructionsDown}
        rotation={[0, 0, Math.PI / 2]}
        fontSize={fontSizes.titles}
        letterSpacing={1.2}
        color={instructionTextColor}
        fadeDelay={3000}
        mouse={mouse}
        common={common}
        blackholeCenter={positions.logo}
        maxSpeeds={maxSpeeds}
      />
      <Word
        text={'< Big Bang >'}
        position={positions.instructionsX}
        fontSize={fontSizes.titles}
        letterSpacing={1.2}
        color={instructionTextColor}
        fadeDelay={3000}
        mouse={mouse}
        common={common}
        blackholeCenter={positions.logo}
        maxSpeeds={maxSpeeds}
      />
      <Word
        text={'Alex Colbourn'}
        position={positions.name}
        fontSize={fontSizes.name}
        letterSpacing={3.17}
        color={mainTextColor}
        fadeDelay={1000}
        mouse={mouse}
        common={common}
        blackholeCenter={positions.logo}
        maxSpeeds={maxSpeeds}
      />
      <Word
        text={'Web Developer / Robotics Engineer'}
        position={positions.jobTitles}
        fontSize={fontSizes.titles}
        letterSpacing={1.2}
        color={mainTextColor}
        fadeDelay={2500}
        mouse={mouse}
        common={common}
        blackholeCenter={positions.logo}
        maxSpeeds={maxSpeeds}
      />
    </>
  );
}
