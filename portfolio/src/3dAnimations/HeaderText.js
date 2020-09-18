import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber';
import { scalePow } from 'd3-scale';
import { getRndInteger } from './LogoBoxesHelpers';
import Word from './Word';

export default function HeaderText({ positions, fontSizes, mouse, graphics }) {
  console.log('HeaderText rendered');
  // Process common letter attributes in this component and pass in values with a ref to save as much processing power as possible
  const common = useRef({
    letterScale: 1,
    rotationSpeed: 0.1,
    travelDist: 1,
    explodeOrbit: 1,
    massCurrent: 20,
    frictionCurrent: 50,
    opacity: { group1: 0, group2: 0, group3: 0 },
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
  let opacity = { group1: 0, group2: 0, group3: 0 }; // Opacities of each word for fade effects
  let opacityLoaded = { group1: false, group2: false, group3: false }; // true when initial fade in complete
  const opacityFadeDelays = { group1: 0, group2: 0, group3: 0 }; // ms opacity fade delay for each word group
  // const opacityFadeDelays = { group1: 1000, group2: 2500, group3: 4000 }; // ms opacity fade delay for each word group
  const opacityFadeSpeed = 0.01; // Opacity fade in speed on load
  const opacityFadeBlackholeSpeed = 0.06; // Opacity fade to 0 in blackhole speed
  const isLoadingRef = useRef({ group1: true, group2: true, group3: true }); // loading ref for each groups' opacity fade

  // Scaling Functions
  const scaleScale = scalePow() // Scale function of letter scale
    .exponent(0.1)
    .domain([0, 1])
    .range([0, 1])
    .clamp(true);
  const rotSpeedLeftScale = scalePow() // Scale function for rotation speed when mouse on left of screen
    .exponent(0.05)
    .domain([0, 1])
    .range([THREE.Math.degToRad(40), THREE.Math.degToRad(0.1)])
    .clamp(true);

  // Generate random speed percentages so each letter travels in a different orbit.  Precompute large array that each letter can pull from at random each time mouse is in deadzone so orbits constantly change.
  let maxSpeeds = [];
  const speedFactor = 30;
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

  // Fade in text opacities after delay for each word group
  useEffect(() => {
    let timer1 = setTimeout(() => {
      isLoadingRef.current.group1 = false;
    }, opacityFadeDelays.group1);
    let timer2 = setTimeout(() => {
      isLoadingRef.current.group2 = false;
    }, opacityFadeDelays.group2);
    let timer3 = setTimeout(() => {
      isLoadingRef.current.group3 = false;
    }, opacityFadeDelays.group3);
    // Clear timeouts on unmount
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [opacityFadeDelays]);

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
      inBlackHoleZone,
      isLeftOrRight,
    } = mouse.current;

    // Fade in Text, multiple groups so words have different fade times
    for (const [key] of Object.entries(opacity)) {
      if (!isLoadingRef.current[key] && opacity[key] < 1) {
        opacity[key] = opacity[key] + opacityFadeSpeed;
      } else if (!isLoadingRef.current[key] && opacity[key] >= 1) {
        opacityLoaded[key] = true;
      }
      // After fade in, set opacity to 0 in blackhole and 1 elsewhere
      if (opacityLoaded[key] === true) {
        if (inBlackHoleZone) {
          // Fade opacity to 0 if in blackhole zone
          if (opacity[key] > 0) {
            opacity[key] = opacity[key] - opacityFadeBlackholeSpeed;
          } else {
            opacity[key] = 0;
          }
        } else {
          opacity[key] = 1;
        }
      }
    }

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
      // if in blackhole zone, speed up all parameters so letters vanish fast
      if (inBlackHoleZone) {
        // rotationSpeed = 0;
        travelDist = 10;
        massCurrent = 1;
        frictionCurrent = 10;
      } else {
        travelDist = 1;
        massCurrent = mouseXLeftLin < 0.01 ? 1 : massImplode;
        frictionCurrent = frictionImplode;
      }
    }

    // update common ref with values
    common.current = {
      letterScale,
      rotationSpeed,
      travelDist,
      explodeOrbit,
      massCurrent,
      frictionCurrent,
      opacity,
    };
  });

  return (
    <>
      <Word
        text={'\uF8CC Controls'}
        position={positions.instructionsTitle}
        fontSize={fontSizes.instructionsTitle}
        letterSpacing={[1.2]}
        color={instructionTextColor}
        fadeGroup={'group3'}
        mouse={mouse}
        common={common}
        blackholeCenter={positions.logo}
        maxSpeeds={maxSpeeds}
        graphics={graphics}
        icon={true}
      />
      <Word
        text={'\uF337'}
        position={positions.arrowsX}
        fontSize={fontSizes.arrows}
        letterSpacing={[1.2]}
        color={instructionTextColor}
        fadeGroup={'group3'}
        mouse={mouse}
        common={common}
        blackholeCenter={positions.logo}
        maxSpeeds={maxSpeeds}
        graphics={graphics}
        icon={true}
      />
      <Word
        text={'Colors'}
        position={positions.instructionsY}
        fontSize={fontSizes.titles}
        letterSpacing={[1.2]}
        color={instructionTextColor}
        fadeGroup={'group3'}
        mouse={mouse}
        common={common}
        blackholeCenter={positions.logo}
        maxSpeeds={maxSpeeds}
        graphics={graphics}
        icon={false}
      />
      <Word
        text={'\uF338'}
        position={positions.arrowsY}
        fontSize={fontSizes.arrows}
        letterSpacing={[1.2]}
        color={instructionTextColor}
        fadeGroup={'group3'}
        mouse={mouse}
        common={common}
        blackholeCenter={positions.logo}
        maxSpeeds={maxSpeeds}
        graphics={graphics}
        icon={true}
      />
      <Word
        text={'Big Bang'}
        position={positions.instructionsX}
        fontSize={fontSizes.titles}
        letterSpacing={[1.2]}
        color={instructionTextColor}
        fadeGroup={'group3'}
        mouse={mouse}
        common={common}
        blackholeCenter={positions.logo}
        maxSpeeds={maxSpeeds}
        graphics={graphics}
        icon={false}
      />
      <Word
        text={'Ale'}
        position={positions.name}
        fontSize={fontSizes.name}
        letterSpacing={[2.9, 3.05]}
        color={mainTextColor}
        fadeGroup={'group1'}
        mouse={mouse}
        common={common}
        blackholeCenter={positions.logo}
        maxSpeeds={maxSpeeds}
        graphics={graphics}
        icon={false}
      />
      <Word
        text={'Web Developer / Robotics Engineer'}
        position={positions.jobTitles}
        fontSize={fontSizes.titles}
        letterSpacing={[1.2]}
        color={mainTextColor}
        fadeGroup={'group2'}
        mouse={mouse}
        common={common}
        blackholeCenter={positions.logo}
        maxSpeeds={maxSpeeds}
        graphics={graphics}
        icon={false}
      />
    </>
  );
}
