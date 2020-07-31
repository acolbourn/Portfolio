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
import useWindowSize from './hooks/useWindowSize';

export default function ThreeViewer() {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [width, height] = useWindowSize();
  console.log(width, height);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    // Calculate scale based on window width using y=mx + b
    const scaleMax = 1;
    const scaleMin = 0.65;
    const winMax = 1900;
    const winMin = 300;
    const m = (scaleMax - scaleMin) / (winMax - winMin);
    const b = scaleMax - m * winMax;
    setScale(m * window.innerWidth + b);
    if (scale > scaleMax) {
      setScale(scaleMax);
    } else if (scale < scaleMin) {
      setScale(scaleMin);
    }
    console.log('scale: ', scale);
  }, [width, scale]);

  // let scale = 1;
  // if (isMobile) {
  //   scale = 0.65;
  // }
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
      <ambientLight />
      <pointLight position={[150, 150, 150]} intensity={0.55} />
      <group scale={[scale, scale, scale]}>
        <Suspense fallback={null}>
          {/* <Logo3d /> */}
          <LogoBoxes
            meshPosition={[0, -2, 0]}
            meshScale={[1, 1, 1]}
            mouse={mouse}
          />
        </Suspense>

        <Suspense fallback={null}>
          <TextGeometry
            text={'Alex Colbourn'}
            position={[0, 25, 0]}
            fontSize={4.8}
          />
        </Suspense>
        <Suspense fallback={null}>
          <TextGeometry
            text={'Web Developer / Robotics Engineer'}
            position={[0, 19.5, 0]}
            fontSize={1.7}
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
