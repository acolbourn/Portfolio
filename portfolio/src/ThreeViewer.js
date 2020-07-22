import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import Logo3d from './Logo3d.js';
// import BoxTest from './BoxTest.js';

export default function ThreeViewer() {
  return (
    <Canvas>
      <ambientLight intensity={1.1} />
      <pointLight position={[100, 100, 100]} intensity={2.2} />
      <pointLight position={[-100, -100, -100]} intensity={5} color='red' />
      <Suspense fallback={null}>
        <Logo3d />
      </Suspense>
      {/* <BoxTest position={[-1.2, 0, 0]} />
      <BoxTest position={[1.2, 0, 0]} /> */}
    </Canvas>
  );
}
