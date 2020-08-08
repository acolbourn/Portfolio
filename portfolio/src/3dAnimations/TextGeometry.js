import React, { useRef } from 'react';
import { extend, useFrame } from 'react-three-fiber';
import { Text } from 'troika-three-text';
import { MeshWobbleMaterial } from 'drei';
// Original blue '#99ccff'
// Register Text as a react-three-fiber element
extend({ Text });

export default function TextGeometry({ text, position, fontSize }) {
  const opts = {
    fontSize: fontSize,
    color: '#0047AB',
    maxWidth: 300,
    lineHeight: 1,
    letterSpacing: 0,
    textAlign: 'justify',
  };

  const materialRef = useRef();

  // Scale wobble intensity from 0 to max as mouse moves center to bottom
  const maxWobble = 0.7;
  useFrame((state) => {
    materialRef.current.factor =
      state.mouse.y < 0 ? state.mouse.y * maxWobble : 0;
  });

  return (
    <text
      position={position}
      rotation={[0, 0, 0]}
      {...opts}
      text={text}
      font={
        'https://fonts.gstatic.com/s/syncopate/v9/pe0sMIuPIYBCpEV5eFdCBfe5.woff'
      }
      anchorX='center'
      anchorY='middle'
    >
      {/* <meshPhongMaterial attach='material' color={opts.color} /> */}
      <MeshWobbleMaterial
        ref={materialRef}
        attach='material'
        color='black'
        factor={0}
        speed={0.5}
      />
    </text>
  );
}

/* <Canvas
style={{
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
}}
pixelRatio={window.devicePixelRatio}
onMouseMove={onMouseMove}
>
<pointLight position={[-100, 0, -160]} />
<pointLight position={[0, 0, -170]} />
<pointLight position={[100, 0, -160]} />
</Canvas> */
