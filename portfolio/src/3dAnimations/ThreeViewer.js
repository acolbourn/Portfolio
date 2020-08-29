import React, {
  Suspense,
  useRef,
  useCallback,
  useState,
  useEffect,
} from 'react';
// import {
//   EffectComposer,
//   DepthOfField,
//   Bloom,
//   Noise,
//   Vignette,
// } from 'react-postprocessing';
import { scaleLinear, scalePow } from 'd3-scale';
import { Canvas } from 'react-three-fiber';
import { Stars } from 'drei';
import LogoBoxes from './LogoBoxes.js';
// import Letter from './Letter';
import useWidth from '../hooks/useWidth';
import Light from './Light';
// import Effects from './Effects';
// import FadingBloom from './FadingBloom';
// import WobbleSphere from './WobbleSphere';
import Word from './Word';
// import TextGeometry from './TextGeometry';

export default function ThreeViewer() {
  const [scale, setScale] = useState(0.9);
  const [positions, setPositions] = useState({
    logo: [0, -6, 0],
    name: [0, 21, 0],
    jobTitles: [0, 17, 0],
    instructionsX: [0, 30, 0],
    instructionsY: [0, 35, 0],
    instructionsUp: [0, 38, 0],
    instructionsDown: [0, 33, 0],
  });
  const [fontSizes, setFontSizes] = useState({ name: 4.8, titles: 1.7 });
  const [disableMouse, setDisableMouse] = useState(true);
  const screenWidth = useWidth();
  const mainTextColor = '#0047AB';
  const instructionTextColor = 'white';

  useEffect(() => {
    const aspect = window.innerWidth / window.innerHeight;
    switch (screenWidth) {
      case 'xs':
        setPositions({
          logo: [0, -6, 0],
          name: [0, 21, 0],
          jobTitles: [0, 16, 0],
          instructionsX: [0, 30, 0],
          instructionsY: [0, 35, 0],
          instructionsUp: [0, 38, 0],
          instructionsDown: [0, 33, 0],
        });
        setFontSizes({ name: 4.8, titles: 1.7 });
        aspect < 0.52 ? setScale(0.55) : setScale(0.65);
        break;
      case 'sm':
        setPositions({
          logo: [0, -6, 0],
          name: [0, 21, 0],
          jobTitles: [0, 17, 0],
          instructionsX: [0, 30, 0],
          instructionsY: [0, 35, 0],
          instructionsUp: [0, 38, 0],
          instructionsDown: [0, 33, 0],
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
          instructionsX: [0, 30, 0],
          instructionsY: [0, 35, 0],
          instructionsUp: [0, 38, 0],
          instructionsDown: [0, 33, 0],
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
  // const mouse = useRef([0, 0, 0, 0, 1, 1, true, true]); // [raw X, raw Y, scaled X, scaled Y]
  const mouse = useRef({
    mouseX: 0, // Raw X
    mouseY: 0, // Raw Y
    mouseXScaled: 0, // X scaled linearly from -1 to 1
    mouseYScaled: 0, // Y scaled linearly from -1 to 1
    mouseXLeftLin: 0, // X scaled linearly from 0 to 1 on left
    mouseXRightLin: 0, // X scaled linearly from 0 to 1 on right
    mouseXLeftLog: 0, // X scaled logarithmically from on left
    mouseXRightLog: 0, // X scaled logarithmically from on right
    inDeadZone: true, // true = mouse in center, else false
    isLeftOrRight: true, // false = mouse on left, true = right
  });
  const deadZone = 75; // Space at center of screen where mouse movements don't effect animations
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;
  const blackHoleZone = (windowHalfX - deadZone) * 0.1; // 10% mouse zone on left side of screen where scaling is 0 so everything is sucked into blackhole
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
  // // Mouse X scaling
  // let mouseXScaled = scaleLinear()
  //   .domain([-windowHalfX, -deadZone])
  //   .range([0, 1])
  //   .clamp(true);

  // Process mouse and touchscreen movements
  const handleMouseAndTouch = useCallback(
    (event) => {
      let mouseX, mouseY;

      // Detect if mouse event or touchscreen event
      const eventType = event.nativeEvent.type;
      if (eventType === 'mousemove') {
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - window.innerHeight / 2;
      } else if (eventType === 'touchmove') {
        event.preventDefault();
        const touch = event.touches[0];
        mouseX = touch.clientX - windowHalfX;
        mouseY = touch.clientY - window.innerHeight / 2;
      }

      // Determine if mouse x position is in deadzone
      let inDeadZone = true; // true if mouse x in center of screen
      if (mouseX <= deadZone && mouseX >= -1 * deadZone) {
        inDeadZone = true;
      } else {
        inDeadZone = false;
      }

      // Determine which side of screen mouse is on
      let isLeftOrRight = false; // false if mouse on left, true if on right
      isLeftOrRight = mouseX < 0 ? false : true;

      // Update mouse ref
      mouse.current = {
        mouseX: mouseX,
        mouseY: mouseY,
        mouseXScaled: mouseXScale(mouseX),
        mouseYScaled: mouseYScale(mouseY),
        mouseXLeftLin: mouseXLeftLinScale(mouseX),
        mouseXRightLin: mouseXRightLinScale(mouseX),
        mouseXLeftLog: 0,
        mouseXRightLog: mouseXRightLogScale(mouseX),
        inDeadZone: inDeadZone,
        isLeftOrRight: isLeftOrRight,
      };
    },
    [
      mouseXScale,
      mouseYScale,
      mouseXLeftLinScale,
      mouseXRightLinScale,
      mouseXRightLogScale,
      windowHalfX,
    ]
  );

  return (
    <Canvas
      gl={{ antialias: false, alpha: false }}
      camera={{ position: [0, 0, 40] }}
      // camera={{ position: [0, 0, 40], near: 5, far: 200 }}
      onCreated={({ gl }) => gl.setClearColor('#1D1D1D')}
      onMouseMove={handleMouseAndTouch}
      onTouchMove={handleMouseAndTouch}
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
            deadZone={deadZone}
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
        {/* <Suspense fallback={null}>
          <TextGeometry
            text={'Alex Colbourn'}
            position={positions.name}
            fontSize={fontSizes.name}
            fadeDelay={1000}
          />
        </Suspense> */}
        <Word
          text={'<'}
          position={positions.instructionsUp}
          rotation={[0, 0, -Math.PI / 2]}
          fontSize={fontSizes.titles}
          letterSpacing={1.2}
          color={instructionTextColor}
          fadeDelay={3000}
          mouse={mouse}
          blackholeCenter={positions.logo}
        />
        <Word
          text={'Colors'}
          position={positions.instructionsY}
          fontSize={fontSizes.titles}
          letterSpacing={1.2}
          color={instructionTextColor}
          fadeDelay={3000}
          mouse={mouse}
          blackholeCenter={positions.logo}
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
          blackholeCenter={positions.logo}
        />
        <Word
          text={'< Big Bang >'}
          position={positions.instructionsX}
          fontSize={fontSizes.titles}
          letterSpacing={1.2}
          color={instructionTextColor}
          fadeDelay={3000}
          mouse={mouse}
          blackholeCenter={positions.logo}
        />
        <Word
          text={'Alex Colbourn'}
          position={positions.name}
          fontSize={fontSizes.name}
          letterSpacing={3.17}
          color={mainTextColor}
          fadeDelay={1000}
          mouse={mouse}
          blackholeCenter={positions.logo}
        />
        <Word
          text={'Web Developer / Robotics Engineer'}
          position={positions.jobTitles}
          fontSize={fontSizes.titles}
          letterSpacing={1.2}
          color={mainTextColor}
          fadeDelay={2500}
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
