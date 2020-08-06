import React, {
  Suspense,
  useRef,
  useCallback,
  useState,
  useEffect,
} from 'react';
// import { useTheme } from '@material-ui/core/styles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Canvas } from 'react-three-fiber';
// import Logo3d from './Logo3d.js';
import LogoBoxes from './LogoBoxes.js';
// import LogoEffects from './LogoEffects.js';
// import BoxTest from './BoxTest.js';
// import { OrbitControls } from 'drei';
// import Text3d from './Text3d';
import TextGeometry from './TextGeometry';
// import useWindowSize from './hooks/useWindowSize';
import useWidth from './hooks/useWidth';

export default function ThreeViewer() {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // const [width, height] = useWindowSize();

  const [scale, setScale] = useState(0.9);
  const [positions, setPositions] = useState({
    logo: [0, -4, 0],
    name: [0, 23.5, 0],
    jobTitles: [0, 18, 0],
  });
  const [fontSizes, setFontSizes] = useState({ name: 4.8, titles: 1.7 });
  const screenWidth = useWidth();
  // console.log(screenWidth);

  useEffect(() => {
    // console.log('useEffect: ', screenWidth);
    const aspect = window.innerWidth / window.innerHeight;
    // console.log(aspect);
    switch (screenWidth) {
      case 'xs':
        setPositions({
          logo: [0, -6, 0],
          name: [0, 21, 0],
          jobTitles: [0, 16, 0],
        });
        aspect < 0.52 ? setScale(0.55) : setScale(0.65);
        break;
      case 'sm':
        setPositions({
          logo: [0, -6, 0],
          name: [0, 21, 0],
          jobTitles: [0, 16, 0],
        });
        setScale(0.75);
        break;
      // case 'md':
      //   setScale(0.85);
      //   setPositions({
      //     logo: [0, 0, 0],
      //     name: [0, 27.5, 0],
      //     jobTitles: [0, 22, 0],
      //   });
      //   break;
      case 'md':
      case 'lg':
      case 'xl':
        setPositions({
          logo: [0, 0, 0],
          name: [0, 24.5, 0],
          jobTitles: [0, 20.2, 0],
        });
        setFontSizes({ name: 3.8, titles: 1.2 });
        setScale(0.9);
        break;
      default:
        setScale(0.7);
    }
  }, [screenWidth]);

  const mouse = useRef([0, 0]);
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]),
    []
  );
  const onTouchMove = useCallback((event) => {
    let touch = event.touches[0];
    let x = touch.clientX;
    let y = touch.clientY;
    mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2];
  }, []);
  return (
    // Logo3d basic
    // <Canvas>
    //   <ambientLight intensity={1.1} />
    //   <pointLight position={[100, 100, 100]} intensity={2.2} />
    //   <pointLight position={[-100, -100, -100]} intensity={5} color='red' />
    //   <Suspense fallback={null}>
    //     <Logo3d />
    //   </Suspense>
    //   {/* <BoxTest position={[-1.2, 0, 0]} />
    //   <BoxTest position={[1.2, 0, 0]} /> */}
    // </Canvas>

    // Spinning boxes
    <Canvas
      gl={{ antialias: false, alpha: false }}
      camera={{ position: [0, 0, 40], near: 5, far: 200 }}
      onCreated={({ gl }) => gl.setClearColor('#1D1D1D')}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
    >
      {/* <ambientLight />
      <pointLight position={[150, 150, 150]} intensity={0.55} /> */}
      <ambientLight intensity={1.1} />
      <pointLight position={[100, 100, 100]} intensity={2.2} />
      <pointLight position={[-100, -100, -100]} intensity={2.5} color='red' />
      <group scale={[scale, scale, scale]}>
        <Suspense fallback={null}>
          {/* <Logo3d /> */}
          <LogoBoxes
            meshPosition={positions.logo}
            meshScale={[1, 1, 1]}
            mouse={mouse}
          />
        </Suspense>

        <Suspense fallback={null}>
          <TextGeometry
            text={'Alex Colbourn'}
            position={positions.name}
            fontSize={fontSizes.name}
          />
        </Suspense>
        <Suspense fallback={null}>
          <TextGeometry
            text={'Web Developer / Robotics Engineer'}
            position={positions.jobTitles}
            fontSize={fontSizes.titles}
          />
        </Suspense>
      </group>
      {/* <LogoEffects /> */}
      {/* <axesHelper args={50} /> */}
      {/* <OrbitControls /> */}
      {/* <Suspense fallback={null}>
        <Text3d
          hAlign='center'
          position={[0, 20, 0]}
          children='Alex Colbourn'
        />
      </Suspense> */}
    </Canvas>
  );
}

// useEffect(() => {
//   // Calculate scale based on window width using y=mx + b
//   const scaleMax = 1;
//   const scaleMin = 0.65;
//   const winMax = 1900;
//   const winMin = 300;
//   const m = (scaleMax - scaleMin) / (winMax - winMin);
//   const b = scaleMax - m * winMax;
//   setScale(m * window.innerWidth + b);
//   if (scale > scaleMax) {
//     setScale(scaleMax);
//   } else if (scale < scaleMin) {
//     setScale(scaleMin);
//   }
//   console.log('scale: ', scale);
// }, [width, scale]);
