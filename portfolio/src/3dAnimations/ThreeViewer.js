import React, {
  Suspense,
  useRef,
  useCallback,
  useState,
  useEffect,
} from 'react';

import { Canvas } from 'react-three-fiber';
import LogoBoxes from './LogoBoxes.js';
import TextGeometry from './TextGeometry';
import useWidth from '../hooks/useWidth';
import Light from './Light';

export default function ThreeViewer() {
  const [scale, setScale] = useState(0.9);
  const [positions, setPositions] = useState({
    logo: [0, -4, 0],
    name: [0, 23.5, 0],
    jobTitles: [0, 18, 0],
  });
  const [fontSizes, setFontSizes] = useState({ name: 4.8, titles: 1.7 });
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
  const onMouseMove = useCallback(({ clientX: x, clientY: y }) => {
    mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2];
  }, []);
  const onTouchMove = useCallback((event) => {
    let touch = event.touches[0];
    let x = touch.clientX;
    let y = touch.clientY;
    mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2];
  }, []);

  return (
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
      <Light maxIntensity={2.5} />
      <group scale={[scale, scale, scale]}>
        <Suspense fallback={null}>
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
    </Canvas>
  );
}
