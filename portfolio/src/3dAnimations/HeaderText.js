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
  const instructionTextColor = '#EFEFEF';
  // const instructionLineColor = '#DD0849';
  const instructionLineColor = '#EFEFEF';
  const constRotation = 0; // fixed slow rotation when mouse on right of screen
  let rotationSpeed = constRotation; // rotation speed scaled
  let letterScale = 1; // Scale of each letter
  let travelDist = 1; // Distance towards/away from blackhole per frame
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
  const opacityFadeSpeed = 0.01; // Opacity fade in speed on load
  const opacityFadeBlackholeSpeed = 0.05; // Opacity fade to 0 in blackhole speed
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

  // Update intro animation state machine when text is loaded
  useEffect(() => {
    if (mouse.current.introState === 'Loading') {
      mouse.current.introState = 'Text Loaded';
    } else if (mouse.current.introState === 'Boxes Loaded') {
      mouse.current.introState = 'Text and Boxes Loaded';
    }
    console.log('headerText mounted');
  }, [mouse]);

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
      disableMouse,
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
        // Disable mouse on load and use intro animation values
        if (!disableMouse) {
          if (inBlackHoleZone) {
            // Fade opacity to 0 if in blackhole zone
            if (opacity[key] > 0) {
              opacity[key] = opacity[key] - opacityFadeBlackholeSpeed;
            } else {
              opacity[key] = 0;
            }
          } else {
            if (graphics === 'high') {
              opacity[key] = 1;
            } else {
              // Fade opacity to 1 in active zone
              if (opacity[key] < 1) {
                opacity[key] = opacity[key] + 0.01;
              } else {
                opacity[key] = 1;
              }
            }
          }
        }
      }
    }

    // Intro Animation State Machine
    if (mouse.current.introState !== 'Done') {
      // Once text and boxes are loaded, fade in name/title
      if (mouse.current.introState === 'Text and Boxes Loaded') {
        isLoadingRef.current.group1 = false;
      }
      // Once name is faded in, update state so boxes will assemble
      if (
        opacityLoaded.group1 === true &&
        mouse.current.introState === 'Text and Boxes Loaded'
      ) {
        mouse.current.introState = 'Name Loaded';
      }
      // Once boxes assembled, fade in instructions
      if (mouse.current.introState === 'Boxes Assembled') {
        isLoadingRef.current.group2 = false;
      }
      // Once instructions faded in, mark as done
      if (
        opacityLoaded.group2 === true &&
        mouse.current.introState === 'Boxes Assembled'
      ) {
        mouse.current.introState = 'Done';
      }
    }

    // Only animate on high graphics, else render static text
    if (graphics === 'high') {
      // Disable mouse on load and use intro animation values
      if (!disableMouse) {
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
          // if in blackhole zone, speed up all parameters so letters vanish
          if (inBlackHoleZone) {
            travelDist = 10;
            massCurrent = 1;
            frictionCurrent = 10;
          } else {
            travelDist = 1;
            massCurrent = mouseXLeftLin < 0.01 ? 1 : massImplode;
            frictionCurrent = frictionImplode;
          }
        }
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
        text={'\uF8CC'}
        position={positions.mouseIcon}
        fontSize={2.4}
        letterSpacing={[1.2]}
        color={instructionTextColor}
        fadeGroup={'group2'}
        mouse={mouse}
        common={common}
        blackholeCenter={positions.logo}
        maxSpeeds={maxSpeeds}
        graphics={graphics}
        icon={true}
        alignText={'left'}
        isLine={false}
      />
      <Word
        text={'Controls'}
        position={positions.instructionsTitle}
        fontSize={fontSizes.instructionsTitle}
        letterSpacing={[1.65, 1.7, 1.5, 1.2, 1.4, 1.55, 1.35]}
        color={mainTextColor}
        fadeGroup={'group2'}
        mouse={mouse}
        common={common}
        blackholeCenter={positions.logo}
        maxSpeeds={maxSpeeds}
        graphics={graphics}
        icon={false}
        alignText={'left'}
        isLine={false}
      />
      <Word
        text={'_______'}
        position={positions.instructionsUnderline}
        fontSize={5}
        letterSpacing={[2.35]}
        color={instructionLineColor}
        fadeGroup={'group2'}
        mouse={mouse}
        common={common}
        blackholeCenter={positions.logo}
        maxSpeeds={maxSpeeds}
        graphics={graphics}
        icon={true}
        alignText={'center'}
        isLine={true}
      />
      <Word
        text={'\uF337'}
        position={positions.arrowsX}
        fontSize={fontSizes.arrows}
        letterSpacing={[1.2]}
        color={instructionTextColor}
        fadeGroup={'group2'}
        mouse={mouse}
        common={common}
        blackholeCenter={positions.logo}
        maxSpeeds={maxSpeeds}
        graphics={graphics}
        icon={true}
        alignText={'left'}
        isLine={false}
      />
      <Word
        text={'Colors'}
        position={positions.instructionsY}
        fontSize={fontSizes.titles}
        letterSpacing={[1.35, 1.225, 1.225, 1.1525, 1.025]}
        color={instructionTextColor}
        fadeGroup={'group2'}
        mouse={mouse}
        common={common}
        blackholeCenter={positions.logo}
        maxSpeeds={maxSpeeds}
        graphics={graphics}
        icon={false}
        alignText={'left'}
        isLine={false}
      />
      <Word
        text={'\uF338'}
        position={positions.arrowsY}
        fontSize={fontSizes.arrows}
        letterSpacing={[1.2]}
        color={instructionTextColor}
        fadeGroup={'group2'}
        mouse={mouse}
        common={common}
        blackholeCenter={positions.logo}
        maxSpeeds={maxSpeeds}
        graphics={graphics}
        icon={true}
        alignText={'left'}
        isLine={false}
      />
      <Word
        text={'Big Bang'}
        position={positions.instructionsX}
        fontSize={fontSizes.titles}
        letterSpacing={[0.825, 0.875, 0, 1.8, 1.25, 1.325, 1.325]}
        color={instructionTextColor}
        fadeGroup={'group2'}
        mouse={mouse}
        common={common}
        blackholeCenter={positions.logo}
        maxSpeeds={maxSpeeds}
        graphics={graphics}
        icon={false}
        alignText={'left'}
        isLine={false}
      />
      <Word
        text={'Alex Colbourn'}
        position={positions.name}
        fontSize={fontSizes.name}
        letterSpacing={[
          2.9,
          3.05,
          3.2,
          1.2,
          3.5,
          3.5,
          3.2,
          3,
          3.5,
          3.5,
          3.1,
          2.9,
        ]}
        color={mainTextColor}
        fadeGroup={'group1'}
        mouse={mouse}
        common={common}
        blackholeCenter={positions.logo}
        maxSpeeds={maxSpeeds}
        graphics={graphics}
        icon={false}
        alignText={'center'}
        isLine={false}
      />
      <Word
        text={'Web Developer / Robotics Engineer'}
        position={positions.jobTitles}
        fontSize={fontSizes.titles}
        letterSpacing={[
          1.6,
          1.25,
          0,
          1.85,
          1.3,
          1.25,
          1.25,
          1.2,
          1.2,
          1.3,
          1.25,
          1.1,
          0,
          1.4,
          0,
          1.5,
          1.3,
          1.3,
          1.35,
          1.2,
          0.75,
          0.85,
          1.2,
          0,
          1.65,
          1.2,
          1.35,
          0.85,
          0.9,
          1.35,
          1.3,
          1.1,
        ]}
        color={mainTextColor}
        fadeGroup={'group1'}
        mouse={mouse}
        common={common}
        blackholeCenter={positions.logo}
        maxSpeeds={maxSpeeds}
        graphics={graphics}
        icon={false}
        alignText={'center'}
        isLine={false}
      />
    </>
  );
}
