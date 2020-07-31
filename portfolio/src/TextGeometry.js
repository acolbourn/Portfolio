import React from 'react';
import { extend } from 'react-three-fiber';
import { Text } from 'troika-three-text';

const fonts = {
  Syncopate:
    'https://fonts.gstatic.com/s/syncopate/v9/pe0sMIuPIYBCpEV5eFdCBfe5.woff',
  Montserrat:
    '/fontsKeep/montserrat-v14-latin/montserrat-v14-latin-regular.woff',
};

// Register Text as a react-three-fiber element
extend({ Text });

export default function TextGeometry({ text, position, fontSize }) {
  const opts = {
    font: 'Syncopate',
    fontSize: fontSize,
    color: '#99ccff',
    maxWidth: 300,
    lineHeight: 1,
    letterSpacing: 0,
    textAlign: 'justify',
  };

  return (
    <text
      position={position}
      rotation={[0, 0, 0]}
      {...opts}
      text={text}
      font={fonts[opts.font]}
      anchorX='center'
      anchorY='middle'
    >
      <meshPhongMaterial attach='material' color={opts.color} />
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
