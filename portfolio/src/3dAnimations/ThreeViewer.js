import React, {
  Suspense,
  useRef,
  useCallback,
  useState,
  useEffect,
} from 'react';
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
} from 'react-postprocessing';

import { Canvas } from 'react-three-fiber';
import { Stars, StandardEffects } from 'drei';
import LogoBoxes from './LogoBoxes.js';
import Letter from './Letter';
import useWidth from '../hooks/useWidth';
import Light from './Light';
import { scaleMouse } from './LogoBoxesHelpers';
import Effects from './Effects';
import FadingBloom from './FadingBloom';
// import WobbleSphere from './WobbleSphere';
import Word from './Word';
import TextGeometry from './TextGeometry';

export default function ThreeViewer() {
  const [scale, setScale] = useState(0.9);
  const [positions, setPositions] = useState({
    logo: [0, -6, 0],
    name: [0, 21, 0],
    jobTitles: [0, 17, 0],
  });
  const [fontSizes, setFontSizes] = useState({ name: 4.8, titles: 1.7 });
  const [disableMouse, setDisableMouse] = useState(true);
  const screenWidth = useWidth();

  useEffect(() => {
    const aspect = window.innerWidth / window.innerHeight;
    switch (screenWidth) {
      case 'xs':
        setPositions({
          logo: [0, -6, 0],
          name: [0, 21, 0],
          jobTitles: [0, 16, 0],
        });
        setFontSizes({ name: 4.8, titles: 1.7 });
        aspect < 0.52 ? setScale(0.55) : setScale(0.65);
        break;
      case 'sm':
        setPositions({
          logo: [0, -6, 0],
          name: [0, 21, 0],
          jobTitles: [0, 17, 0],
        });
        // setFontSizes({ name: 4.8, titles: 1.7 });
        setFontSizes({ name: 3.8, titles: 1.45 });
        setScale(0.75);
        break;
      case 'md':
      case 'lg':
      case 'xl':
        // setPositions({
        //   logo: [0, 0, 0],
        //   name: [0, 24.5, 0],
        //   jobTitles: [0, 20.2, 0],
        // });
        // setFontSizes({ name: 3.8, titles: 1.2 });
        // setScale(0.9);
        setPositions({
          logo: [0, -6, 0],
          name: [0, 21, 0],
          jobTitles: [0, 17, 0],
        });
        // setFontSizes({ name: 4.8, titles: 1.7 });
        setFontSizes({ name: 4, titles: 1.5 });
        setScale(0.83);
        break;
      default:
        setScale(0.7);
    }
  }, [screenWidth]);

  // Disable mouse in components initially for intro animation
  const mouseDisableTime = 11000;
  useEffect(() => {
    let timer1 = setTimeout(() => {
      setDisableMouse(false);
    }, mouseDisableTime);
    // Clear timeout on unmount
    return () => {
      clearTimeout(timer1);
    };
  });

  // Process mouse/touchscreen movements.  Note - useRef is essential as useState would trigger rerenders causing glitches in animation updates
  const mouse = useRef([0, 0, 0]);
  // Process mouse movements
  const onMouseMove = useCallback(({ clientX: x, clientY: y }) => {
    const mouseX = x - window.innerWidth / 2;
    const mouseY = y - window.innerHeight / 2;
    // Scale Y here since multiple components share Y but not X scaling
    const mouseYScaled = scaleMouse(
      mouseY,
      window.innerHeight,
      'linear',
      75,
      1
    );
    mouse.current = [mouseX, mouseY, mouseYScaled];
  }, []);
  // Process mobile/touchscreen movements
  const onTouchMove = useCallback((event) => {
    event.preventDefault();
    const touch = event.touches[0];
    const mouseX = touch.clientX - window.innerWidth / 2;
    const mouseY = touch.clientY - window.innerHeight / 2;
    // Scale Y here since multiple components share Y but not X scaling
    const mouseYScaled = scaleMouse(
      mouseY,
      window.innerHeight,
      'linear',
      75,
      1
    );
    mouse.current = [mouseX, mouseY, mouseYScaled];
  }, []);

  return (
    <Canvas
      gl={{ antialias: false, alpha: false }}
      camera={{ position: [0, 0, 40] }}
      // camera={{ position: [0, 0, 40], near: 5, far: 200 }}
      onCreated={({ gl }) => gl.setClearColor('#1D1D1D')}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      onTouchStart={(e) => e.preventDefault()}
      onTouchEnd={(e) => e.preventDefault()}
      onTouchCancel={(e) => e.preventDefault()}
      pixelRatio={window.devicePixelRatio * 1.5}
    >
      {/* <ambientLight />
      <pointLight position={[150, 150, 150]} intensity={0.55} /> */}
      <ambientLight intensity={1.1} />
      <pointLight position={[100, 100, 100]} intensity={2.2} />
      <Light maxIntensity={2.5} mouse={mouse} disableMouse={disableMouse} />
      <group scale={[scale, scale, scale]}>
        <Suspense fallback={null}>
          <LogoBoxes
            meshPosition={positions.logo}
            meshScale={[1, 1, 1]}
            mouse={mouse}
            fadeDelay={3000}
            disableMouse={disableMouse}
          />
        </Suspense>
        {/* <Letter
          text={'Alex Colbourn'}
          position={positions.name}
          fontSize={fontSizes.name}
          fadeDelay={1000}
        />
        <Letter
          text={'Web Developer / Robotics Engineer'}
          position={positions.jobTitles}
          fontSize={fontSizes.titles}
          fadeDelay={2500}
        /> */}
        <Suspense fallback={null}>
          <TextGeometry
            text={'Alex Colbourn'}
            position={positions.name}
            fontSize={fontSizes.name}
            fadeDelay={1000}
          />
        </Suspense>
        <Word
          text={'Alex Colbourn'}
          position={positions.name}
          fontSize={fontSizes.name}
          letterSpacing={3.17}
          fadeDelay={1000}
          mouse={mouse}
          blackholeCenter={positions.logo}
        />
      </group>
      <Stars />
      {/* <Effects
        mouse={mouse}
        bloomStrength={0.8}
        bloomRadius={1}
        bloomThreshold={0}
      /> */}
      {/* <FadingBloom /> */}
      {/* <WobbleSphere />
      <EffectComposer>
        <DepthOfField
          focusDistance={0}
          focalLength={0.02}
          bokehScale={2}
          height={480}
        />         
        <Bloom
          luminanceThreshold={0}
          luminanceSmoothing={0.9}
          height={1}
          opacity={3}
        />
        <Noise opacity={0.025} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} /> 
     </Canvas>/ </EffectComposer> */}
    </Canvas>
  );
}
