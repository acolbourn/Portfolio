import React, { useRef, useEffect, useState } from 'react';
import { extend, useFrame } from 'react-three-fiber';
import { Text } from 'troika-three-text';
import { MeshWobbleMaterial } from 'drei';

// Register Text as a react-three-fiber element
extend({ Text });

export default function TextGeometry({ text, position, fontSize, fadeDelay }) {
  const [isLoading, setIsLoading] = useState(true);

  // Fade in text
  useEffect(() => {
    let timer1 = setTimeout(() => setIsLoading(false), fadeDelay);
    // Clear timeout on unmount
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  const opts = {
    fontSize: fontSize,
    color: '#0047AB',
    maxWidth: 300,
    lineHeight: 1,
    letterSpacing: 0,
    textAlign: 'justify',
  };

  const materialRef = useRef();
  // A second ref must be used to access opacity bc troika makes a copy of the material to save processing power so only initial values are updated unless a reference to the copy is made
  const textRef = useRef();

  const maxWobble = 0.7; // Maximum wobble effect of text
  const animateSpeed = 0.5; // Factor to slow down/smooth out mouse by
  let mouseY = 0; // Raw mouse movement
  let mouseVelY = 0; // Smoothed mouse movement
  let opacity = 0; // Text opacity for fade in
  const opacityFadeSpeed = 6; // Opacity Fade in speed

  useFrame((state) => {
    // Scale wobble intensity from 0 to max as mouse moves center to bottom
    mouseY = state.mouse.y < 0 ? state.mouse.y : 0;
    mouseVelY += (mouseY - mouseVelY) * animateSpeed;
    materialRef.current.factor = mouseVelY * maxWobble;

    // Fade in Text
    if (!isLoading && opacity < 1000) {
      opacity = opacity + opacityFadeSpeed;
      textRef.current.material.opacity = opacity / 1000;
    }
  });

  return (
    <text
      ref={textRef}
      position={position}
      rotation={[0, 0, 0]}
      {...opts}
      font={
        'https://fonts.gstatic.com/s/syncopate/v9/pe0sMIuPIYBCpEV5eFdCBfe5.woff'
      }
      text={text}
      anchorX='center'
      anchorY='middle'
    >
      <MeshWobbleMaterial
        ref={materialRef}
        attach='material'
        factor={0}
        speed={0.3}
        opacity={0}
      />
    </text>
  );
}
