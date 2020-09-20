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
import { Stars, Stats } from 'drei';
import FPSStats from './FPSStats';
import LogoBoxes from './LogoBoxes.js';
// import Letter from './Letter';
import useWidth from '../hooks/useWidth';
import Light from './Light';
// import Effects from './Effects';
// import FadingBloom from './FadingBloom';
// import WobbleSphere from './WobbleSphere';
import HeaderText from './HeaderText.js';
// import TextGeometry from './TextGeometry';
import Sun from './Sun';
import SunBloom from './SunBloom';

export default function ThreeViewer({ graphics }) {
  console.log('ThreeViewer rendered');
  const [scale, setScale] = useState(0.9);
  const xIconOffset = -5.1;
  const yIconOffset = 0.15;
  const xInstTextOffset = -1.9;
  const xGroupOff = 1;
  const yGroupOff = 1;
  const [positions, setPositions] = useState({
    mouseIcon: [xIconOffset, 35 + yIconOffset, 0],
    instructionsTitle: [-1.9, 28.1, 0],
    instructionsUnderline: [0, 32.9, 0],
    instructionsY: [xInstTextOffset + yGroupOff, 30.5, 0],
    arrowsY: [xIconOffset + yGroupOff, 30.5 + yIconOffset, 0],
    instructionsX: [xInstTextOffset - 0.075 + xGroupOff, 27.5, 0],
    arrowsX: [xIconOffset + xGroupOff, 27.5 + yIconOffset, 0],
    name: [0, 21, 0],
    jobTitles: [0, 17, 0],
    logo: [0, -6, 0],
  });
  const [fontSizes, setFontSizes] = useState({
    name: 3.8,
    titles: 1.45,
    arrows: 2.8,
    instructionsTitle: 3,
  });
  // const [disableMouse, setDisableMouse] = useState(true);
  const screenWidth = useWidth();

  useEffect(() => {
    const aspect = window.innerWidth / window.innerHeight;
    switch (screenWidth) {
      case 'xs':
        // setPositions({
        //   logo: [0, -6, 0],
        //   name: [0, 21, 0],
        //   jobTitles: [0, 16, 0],
        //   instructionsX: [0, 30, 0],
        //   instructionsY: [0, 35, 0],
        //   instructionsTitle: [0, 38, 0],
        //   arrowsX: [arrowOffset, 30, 0],
        //   arrowsY: [arrowOffset, 35, 0],
        // });
        // setFontSizes({
        //   name: 4.8,
        //   titles: 1.7,
        //   arrows: 3,
        //   instructionsTitle: 3,
        // });
        aspect < 0.52 ? setScale(0.55) : setScale(0.65);
        break;
      case 'sm':
        // setPositions({
        //   logo: [0, -6, 0],
        //   name: [0, 21, 0],
        //   jobTitles: [0, 17, 0],
        //   instructionsX: [0, 30, 0],
        //   instructionsY: [0, 35, 0],
        //   instructionsTitle: [0, 38, 0],
        //   arrowsX: [arrowOffset, 30, 0],
        //   arrowsY: [arrowOffset, 35, 0],
        // });
        // setFontSizes({ name: 4.8, titles: 1.7 });
        // setFontSizes({
        //   name: 3.8,
        //   titles: 1.45,
        //   arrows: 3,
        //   instructionsTitle: 3,
        // });
        setScale(0.75);
        break;
      case 'md':
      case 'lg':
      case 'xl':
        // setFontSizes({ name: 3.8, titles: 1.2 });
        // setScale(0.9);
        // setPositions({
        //   logo: [0, -6, 0],
        //   name: [0, 21, 0],
        //   jobTitles: [0, 17, 0],
        //   instructionsX: [0, 30, 0],
        //   instructionsY: [0, 35, 0],
        //   instructionsTitle: [0, 38, 0],
        //   arrowsX: [arrowOffset, 38, 0],
        //   arrowsY: [arrowOffset, 33, 0],
        // });
        // setFontSizes({ name: 4.8, titles: 1.7 });
        // setFontSizes({ name: 4, titles: 1.5, arrows: 3, instructionsTitle: 3 });
        setScale(0.83);
        break;
      default:
        setScale(0.7);
    }
  }, [screenWidth]);

  // Process mouse/touchscreen movements.  Note - useRef is essential as useState would trigger rerenders causing glitches in animation updates
  // const mouse = useRef([0, 0, 0, 0, 1, 1, true, true]); // [raw X, raw Y, scaled X, scaled Y]
  const mouse = useRef({
    mouseX: 0, // Raw X
    mouseY: 0, // Raw Y
    mouseXScaled: 0, // X scaled linearly from -1 to 1
    mouseYScaled: 0, // Y scaled linearly from -1 to 1
    mouseXLeftLin: 1, // X scaled linearly from 0 to 1 on left
    mouseXRightLin: 0, // X scaled linearly from 0 to 1 on right
    mouseXLeftLog: 0, // X scaled logarithmically from on left
    mouseXRightLog: 0, // X scaled logarithmically from on right
    inDeadZone: true, // true = mouse in center, else false
    inBlackHoleZone: false, // true = mouse on left edge, else false
    isLeftOrRight: true, // false = mouse on left, true = right
    disableMouse: true, // disable mouse initially for fade in
  });
  const deadZone = 75; // Space at center of screen where mouse movements don't effect animations
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;
  const blackHoleZone = (windowHalfX - deadZone) * 0.1; // 10% mouse zone on left side of screen where scaling is 0 so everything is sucked into blackhole
  const blackHoleZoneShited = -windowHalfX + blackHoleZone;

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

  // Disable mouse in components initially for intro animation
  const mouseDisableTime = 0;
  // const mouseDisableTime = 11000;
  useEffect(() => {
    let timer1 = setTimeout(() => {
      mouse.current.disableMouse = false;
    }, mouseDisableTime);
    // Clear timeout on unmount
    return () => {
      clearTimeout(timer1);
    };
  });

  // Process mouse and touchscreen movements
  const handleMouseAndTouch = useCallback(
    (event) => {
      let mouseX, mouseY;

      // Detect if mouse event or touchscreen event
      const eventType = event.nativeEvent.type;
      if (eventType === 'mousemove') {
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
      } else if (eventType === 'touchmove') {
        event.preventDefault();
        const touch = event.touches[0];
        mouseX = touch.clientX - windowHalfX;
        mouseY = touch.clientY - windowHalfY;
      }

      // Determine if mouse x position is in deadzone
      let inDeadZone = true; // true if mouse x in center of screen
      if (mouseX <= deadZone && mouseX >= -1 * deadZone) {
        inDeadZone = true;
      } else {
        inDeadZone = false;
      }

      // Determine if mouse x position is in blackhole zone
      let inBlackHoleZone; // true if mouse x on left edge of screen
      if (mouseX <= blackHoleZoneShited) {
        inBlackHoleZone = true;
      } else {
        inBlackHoleZone = false;
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
        inBlackHoleZone: inBlackHoleZone,
        isLeftOrRight: isLeftOrRight,
        disableMouse: mouse.current.disableMouse,
      };
    },
    [
      mouseXScale,
      mouseYScale,
      mouseXLeftLinScale,
      mouseXRightLinScale,
      mouseXRightLogScale,
      windowHalfX,
      windowHalfY,
      blackHoleZoneShited,
    ]
  );

  return (
    <>
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
        <Light maxIntensity={2.5} mouse={mouse} />
        <spotLight position={[0, 0, 0]} intensity={10} />

        <group scale={[scale, scale, scale]}>
          <Suspense fallback={null}>
            <LogoBoxes
              meshPosition={positions.logo}
              meshScale={[1, 1, 1]}
              deadZone={deadZone}
              mouse={mouse}
              fadeDelay={3000}
              graphics={graphics}
            />
          </Suspense>
          <HeaderText
            positions={positions}
            fontSizes={fontSizes}
            mouse={mouse}
            graphics={graphics}
          />
          {/* <group scale={[5, 5, 5]} position={[30, -170, 0]}>
            

            <TextGeometry
              text={'Alex Colbourn'}
              position={[-13, 20, 0]}
              fontSize={fontSizes.name}
            />
            <TextGeometry
              text={'Web Developer / Robotics Engineer'}
              position={[-13, 16, 0]}
              fontSize={fontSizes.titles}
            />
            <TextGeometry
              text={'Big Bang'}
              position={[-13, 29, 0]}
              fontSize={fontSizes.titles}
            />
            <TextGeometry
              text={'Colors'}
              position={[-13, 34, 0]}
              fontSize={fontSizes.titles}
            />
            <TextGeometry
              text={'Controls'}
              position={[-13, 37, 0]}
              fontSize={fontSizes.titles}
            />
          </group> */}
          <Sun position={positions.logo} mouse={mouse} />
          <SunBloom mouse={mouse} />
        </group>
        <Stars />
        <Stats />
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
      <FPSStats style={{ visibility: 'hidden' }} left={'100px'} />
    </>
  );
}
