import { scaleLinear, scalePow } from 'd3-scale';
import React from 'react';
import { useThree } from 'react-three-fiber';
import { positions } from './constants.js';
import HeaderText from './HeaderText.js';
import LogoBoxes from './LogoBoxes.js';
import StarsAnimated from './StarsAnimated';
import Sun from './Sun';
import SunBloom from './SunBloom';
import WobbleSphere from './WobbleSphere';

export default function ThreeScale({
  scaleRef,
  deadZone,
  mouse,
  graphics,
  isLoading,
}) {
  // Re-render on window resize events and recalculate scales
  const { width, height } = useThree().size;
  const windowHalfX = width / 2;
  const windowHalfY = height / 2;
  const blackHoleZone = (windowHalfX - deadZone) * 0.2; // 20% mouse zone on left side of screen where scaling is 0 so everything is sucked into blackhole
  const blackHoleZoneShifted = -windowHalfX + blackHoleZone;

  // Scale group based on screen size
  let scale = 0.75;
  if (width <= 600) {
    const aspect = width / height;
    scale = aspect < 0.52 ? 0.55 : 0.65;
  }

  // Scaling functions
  let mouseXScale = scaleLinear()
    .domain([-windowHalfX, windowHalfX])
    .range([-1, 1])
    .clamp(true);
  let mouseYScale = scaleLinear()
    .domain([-windowHalfY, windowHalfY])
    .range([-1, 1])
    .clamp(true);
  let mouseXLeftLinScale = scaleLinear()
    .domain([-windowHalfX + blackHoleZone, -deadZone])
    .range([0, 1])
    .clamp(true);
  let mouseXRightLinScale = scaleLinear()
    .domain([deadZone, windowHalfX])
    .range([0, 1])
    .clamp(true);
  let mouseXRightLogScale = scalePow()
    .exponent(10)
    .domain([deadZone, windowHalfX])
    .range([0, 1])
    .clamp(true);

  scaleRef.current = {
    windowHalfX: windowHalfX, // Screen width / 2
    windowHalfY: windowHalfY, // Screen height / 2
    blackHoleZoneShifted: blackHoleZoneShifted, // Blackhole Zone
    mouseXScale: mouseXScale,
    mouseYScale: mouseYScale,
    mouseXLeftLinScale: mouseXLeftLinScale,
    mouseXRightLinScale: mouseXRightLinScale,
    mouseXRightLogScale: mouseXRightLogScale,
  };

  return (
    <group scale={[scale, scale, scale]}>
      {/* key prop triggers unmount/mount to change box count */}
      <LogoBoxes
        key={graphics}
        meshPosition={positions.logo}
        meshScale={[1, 1, 1]}
        deadZone={deadZone}
        mouse={mouse}
        graphics={graphics}
      />
      <HeaderText mouse={mouse} graphics={graphics} isLoading={isLoading} />
      {graphics !== 'low' ? (
        <Sun position={positions.logo} mouse={mouse} />
      ) : null}
      {graphics !== 'low' ? <SunBloom mouse={mouse} /> : null}
      <WobbleSphere position={positions.logo} mouse={mouse} />
      <StarsAnimated
        mouse={mouse}
        position={positions.logo}
        graphics={graphics}
      />
    </group>
  );
}
