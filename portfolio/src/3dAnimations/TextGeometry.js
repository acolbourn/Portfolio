import React, { useRef, useEffect, useState } from 'react';
import { extend, useFrame } from 'react-three-fiber';
import { Text } from 'troika-three-text';

// Register Text as a react-three-fiber element
extend({ Text });

export default function TextGeometry({ text, position, fontSize, fadeDelay }) {
  const [isLoading, setIsLoading] = useState(true);
  const opacity = useRef(0); // useRef instead of useState to keep animation loop from stalling
  const opacityFadeSpeed = 0.01; // Opacity Fade in speed

  // Fade in text
  useEffect(() => {
    let timer1 = setTimeout(() => setIsLoading(false), fadeDelay);
    // Clear timeout on unmount
    return () => {
      clearTimeout(timer1);
    };
  });

  const opts = {
    fontSize: fontSize,
    color: '#0047AB',
    maxWidth: 300,
    lineHeight: 1,
    letterSpacing: 0,
    textAlign: 'justify',
  };

  const textRef = useRef();
  useFrame((state) => {
    // Fade in Text
    if (!isLoading && opacity.current < 1) {
      opacity.current = opacity.current + opacityFadeSpeed;
    }
    textRef.current.material.opacity = opacity.current;
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
      // anchorX='center'
      anchorX='left'
      anchorY='middle'
    >
      <meshPhongMaterial attach='material' />
    </text>
  );
}
