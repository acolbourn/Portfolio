import React, { useRef, useEffect, useState, Suspense } from 'react';
import * as THREE from 'three';
import { extend, useFrame } from 'react-three-fiber';
import { Text } from 'drei';

// Register Text as a react-three-fiber element
extend({ Text });

export default function Letter({ text, position, fontSize, fadeDelay, mouse }) {
  const textRef = useRef();
  const [x, y, z] = position;
  const [isLoading, setIsLoading] = useState(true);
  const opacity = useRef(0); // useRef instead of useState to keep animation loop from stalling
  const opacityFadeSpeed = 0.01; // Opacity Fade in speed

  // Create rotation variables
  const holeX = 0;
  const holeY = 0;
  const holeZ = 0;
  let xQuat = new THREE.Quaternion();
  let yQuat = new THREE.Quaternion();
  let zQuat = new THREE.Quaternion();
  let blackHolePos = new THREE.Vector3(holeX, holeY, holeZ);
  let xAxis = new THREE.Vector3(1, 0, 0);
  let yAxis = new THREE.Vector3(0, 1, 0);
  let zAxis = new THREE.Vector3(0, 0, 1);
  // Create unit vector pointing from current position to blackhole
  const xDir = x - holeX;
  const yDir = y - holeY;
  const zDir = z - holeZ;
  let vectorToHole = new THREE.Vector3(xDir, yDir, zDir).normalize();
  const initDistToHole = Math.hypot(xDir, yDir, zDir); // Initial distance to blackhole center

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

  const enableX = true;
  const enableY = true;
  const enableZ = true;
  const rotateSpeed = 0.005;
  // const randomFactor = 1;
  const randomFactor = getRndInteger(80, 100) / 100;
  const xSpeed = 0.5 * randomFactor;
  const ySpeed = 0.3 * randomFactor;
  const zSpeed = 0.3;

  useFrame(() => {
    // Fade in Text
    if (!isLoading && opacity.current < 1) {
      opacity.current = opacity.current + opacityFadeSpeed;
    }
    textRef.current.material.opacity = opacity.current;

    // Calculate rotation quaternion's
    if (enableX) {
      xQuat.setFromAxisAngle(xAxis, THREE.Math.degToRad(xSpeed));
      textRef.current.quaternion.multiplyQuaternions(
        xQuat,
        textRef.current.quaternion
      );
    }
    if (enableY) {
      yQuat.setFromAxisAngle(yAxis, THREE.Math.degToRad(ySpeed));
      textRef.current.quaternion.multiplyQuaternions(
        yQuat,
        textRef.current.quaternion
      );
    }
    if (enableZ) {
      zQuat.setFromAxisAngle(zAxis, THREE.Math.degToRad(zSpeed));
      textRef.current.quaternion.multiplyQuaternions(
        zQuat,
        textRef.current.quaternion
      );
    }

    // Apply rotation
    textRef.current.position.sub(blackHolePos);
    enableX && textRef.current.position.applyQuaternion(xQuat);
    enableY && textRef.current.position.applyQuaternion(yQuat);
    enableZ && textRef.current.position.applyQuaternion(zQuat);
    textRef.current.position.add(blackHolePos);

    // Calculate distance to blackhole center
    const currentDistToHole = Math.hypot(
      textRef.current.position.x,
      textRef.current.position.y,
      textRef.current.position.z
    );
    // If position isn't at blackhole center or further than initial position, translate towards blackhole.  Ensure center/init positions aren't exceeded
    const transDist = mouse.current[2]; // amount to move towards/away from hole

    if (
      currentDistToHole + transDist >= 0 &&
      currentDistToHole <= initDistToHole - transDist
    ) {
      textRef.current.translateOnAxis(vectorToHole, mouse.current[2]);
    }
  });

  return (
    <Suspense fallback={null}>
      <Text
        ref={textRef}
        glyphGeometryDetail={32}
        position={position}
        rotation={[0, 0, 0]}
        {...opts}
        font={
          'https://fonts.gstatic.com/s/syncopate/v9/pe0sMIuPIYBCpEV5eFdCBfe5.woff'
        }
        anchorX='center'
        anchorY='middle'
      >
        {text}
        {/* <MeshWobbleMaterial
          attach='material'
          color='blue'
          factor={2}
          speed={100}
        /> */}
      </Text>
    </Suspense>
  );
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
