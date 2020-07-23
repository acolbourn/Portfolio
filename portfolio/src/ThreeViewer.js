import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
// import Logo3d from './Logo3d.js';
import LogoBoxes from './LogoBoxes.js';
import LogoEffects from './LogoEffects.js';
// import BoxTest from './BoxTest.js';

export default function ThreeViewer() {
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

    <Canvas
      gl={{ antialias: false, alpha: false }}
      camera={{ position: [0, 0, 60], near: 5, far: 200 }}
      onCreated={({ gl }) => gl.setClearColor('grey')}
    >
      <ambientLight />
      <pointLight position={[150, 150, 150]} intensity={0.55} />
      <Suspense fallback={null}>
        <LogoBoxes />
      </Suspense>

      <LogoEffects />
    </Canvas>
  );
}
