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
import { scaleMouse } from './LogoBoxesHelpers';
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
  const test = useRef({ test: 'hi' });
  const deadZone = 75; // Space at center of screen where mouse movements don't effect animations
  const windowHalf = window.innerWidth / 2;
  // Scaling functions
  let mouseXScale = scaleLinear()
    .domain([-windowHalf, windowHalf])
    .range([-1, 1])
    .clamp(true);
  let mouseXLeftLinScale = scaleLinear()
    .domain([-windowHalf, -deadZone])
    .range([0, 1])
    .clamp(true);
  let mouseXRightLinScale = scaleLinear()
    .domain([deadZone, windowHalf])
    .range([0, 1])
    .clamp(true);
  let mouseXRightLogScale = scalePow()
    .exponent(10)
    .domain([deadZone, windowHalf])
    .range([0, 1])
    .clamp(true);
  // // Mouse X scaling
  // let mouseXScaled = scaleLinear()
  //   .domain([-windowHalf, -deadZone])
  //   .range([0, 1])
  //   .clamp(true);

  // Process mouse movements
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) => {
      const mouseX = x - windowHalf;
      const mouseY = y - window.innerHeight / 2;
      let inDeadZone = true; // true if mouse x in center of screen
      let isLeftOrRight = false; // false if mouse x on left side of screen, true if on right
      // Determine if mouse x position is in deadzone
      if (mouseX <= deadZone && mouseX >= -1 * deadZone) {
        inDeadZone = true;
      } else {
        inDeadZone = false;
      }
      // Determine which side of screen mouse is on
      isLeftOrRight = mouseX < 0 ? false : true;
      // Scale X and Y
      const mouseYScaled = scaleMouse(
        mouseY,
        window.innerHeight,
        'linear',
        deadZone,
        1
      );
      // mouse.current = [
      //   mouseX,
      //   mouseY,
      //   mouseXScaled(mouseX),
      //   mouseYScaled,
      //   mouseXScaledLeft(mouseX),
      //   mouseXScaledRight(mouseX),
      //   inDeadZone,
      //   isLeftOrRight,
      // ];
      mouse.current = {
        mouseX: mouseX,
        mouseY: mouseY,
        mouseXScaled: mouseXScale(mouseX),
        mouseYScaled: mouseYScaled,
        mouseXLeftLin: mouseXLeftLinScale(mouseX),
        mouseXRightLin: mouseXRightLinScale(mouseX),
        mouseXLeftLog: 0,
        mouseXRightLog: mouseXRightLogScale(mouseX),
        inDeadZone: inDeadZone,
        isLeftOrRight: isLeftOrRight,
      };
    },
    [mouseXScale, mouseXLeftLinScale, mouseXRightLinScale, windowHalf]
  );
  // // Process mobile/touchscreen movements
  // const onTouchMove = useCallback(
  //   (event) => {
  //     event.preventDefault();
  //     const touch = event.touches[0];
  //     const mouseX = touch.clientX - windowHalf;
  //     const mouseY = touch.clientY - window.innerHeight / 2;
  //     // Determine if touch x position is in deadzone
  //     if (mouse.current[0] <= deadZone && mouse.current[0] >= -1 * deadZone) {
  //       inDeadZone = true;
  //     } else {
  //       inDeadZone = false;
  //     }
  //     // Determine which side of screen mouse is on
  //     isLeftOrRight = mouseX < 0 ? false : true;
  //     // Scale X and Y
  //     const mouseYScaled = scaleMouse(
  //       mouseY,
  //       window.innerHeight,
  //       'linear',
  //       deadZone,
  //       1
  //     );
  //     mouse.current = [
  //       mouseX,
  //       mouseY,
  //       mouseXScaled(mouseX),
  //       mouseYScaled,
  //       mouseXScaledLeft(mouseX),
  //       mouseXScaledRight(mouseX),
  //       inDeadZone,
  //       isLeftOrRight,
  //     ];
  //   },
  //   [mouseXScaled]
  // );

  return (
    <Canvas
      gl={{ antialias: false, alpha: false }}
      camera={{ position: [0, 0, 40] }}
      // camera={{ position: [0, 0, 40], near: 5, far: 200 }}
      onCreated={({ gl }) => gl.setClearColor('#1D1D1D')}
      onMouseMove={onMouseMove}
      // onTouchMove={onTouchMove}
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
        {/* <Suspense fallback={null}>
          <LogoBoxes
            meshPosition={positions.logo}
            meshScale={[1, 1, 1]}
            deadZone={deadZone}
            mouse={mouse}
            fadeDelay={3000}
            disableMouse={disableMouse}
          />
        </Suspense> */}
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
          text={'Alex Colbourn'}
          position={positions.name}
          fontSize={fontSizes.name}
          letterSpacing={3.17}
          fadeDelay={1000}
          mouse={mouse}
          blackholeCenter={positions.logo}
          test={test}
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
