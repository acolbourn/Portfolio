import React from 'react';
// import Logo from './Logo';
import ThreeViewer from './ThreeViewer';
// import Cannon from './Cannon.js';
// import SwarmViewer from './SwarmViewer';

export default function Home() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ThreeViewer />
      {/* <SwarmViewer /> */}
    </div>
  );
}
