import React, { Suspense, useRef, useCallback } from 'react';
import { Canvas } from 'react-three-fiber';
import { Text } from 'troika-three-text';
// import Logo3d from './Logo3d.js';
import LogoBoxes from './LogoBoxes.js';
// import LogoEffects from './LogoEffects.js';
// import BoxTest from './BoxTest.js';
// import { OrbitControls } from 'drei';
import Text3d from './Text3d';

const opts = {
  font: 'Philosopher',
  fontSize: 10,
  color: '#99ccff',
  maxWidth: 300,
  lineHeight: 1,
  letterSpacing: 0,
  textAlign: 'justify',
  materialType: 'MeshPhongMaterial',
};

export default function ThreeViewer() {
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
      <Suspense fallback={null}>
        {/* <Logo3d /> */}
        <LogoBoxes mouse={mouse} />
      </Suspense>
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

      <text
        position={[0, 20, 0]}
        rotation={[0, 0, 0, 0]}
        {...opts}
        text={'Alex Colbourn'}
        font={
          'https://fonts.gstatic.com/s/philosopher/v9/vEFV2_5QCwIS4_Dhez5jcWBuT0s.woff'
        }
        anchorX='center'
        anchorY='middle'
      >
        {opts.materialType === 'MeshPhongMaterial' ? (
          <meshPhongMaterial attach='material' color={opts.color} />
        ) : null}
      </text>
    </Canvas>
  );
}
