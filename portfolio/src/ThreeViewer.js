import React, { Suspense, useRef, useCallback } from 'react';
import { Canvas } from 'react-three-fiber';
// import Logo3d from './Logo3d.js';
import LogoBoxes from './LogoBoxes.js';
// import LogoEffects from './LogoEffects.js';
// import BoxTest from './BoxTest.js';
// import { OrbitControls } from 'drei';

export default function ThreeViewer() {
  const mouse = useRef([0, 0]);
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]),
    []
  );
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
    </Canvas>
  );
}
