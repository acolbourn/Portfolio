import React, { useRef, useEffect, useState, Suspense } from 'react';
import * as THREE from 'three';
import { extend, useFrame } from 'react-three-fiber';
import { Text } from 'drei';
import { useSpring, animated } from 'react-spring/three';

// Register Text as a react-three-fiber element
extend({ Text });

export default function Letter({ text, position, fontSize, fadeDelay, mouse }) {
  const textRef = useRef();
  const [x, y, z] = position;
  const [isLoading, setIsLoading] = useState(true);
  const opacity = useRef(0); // useRef instead of useState to keep animation loop from stalling
  const opacityFadeSpeed = 0.01; // Opacity Fade in speed
  const [letterSpring, set, stop] = useSpring(() => ({
    position: [x, y, z],
    quaternion: [0, 0, 0, 1],
    config: { mass: 20, tension: 150, friction: 50 },
  }));

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
  let tempObject = new THREE.Object3D(); // Not displayed, object for rotation calculations that are then applied to each letter.
  tempObject.position.set(x, y, z);
  // console.log(tempObject.quaternion);

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

  let rotateX = 0;
  useFrame(() => {
    // Fade in Text
    if (!isLoading && opacity.current < 1) {
      opacity.current = opacity.current + opacityFadeSpeed;
    }
    textRef.current.material.opacity = opacity.current;

    // // Calculate rotation quaternion's
    // if (enableX) {
    //   xQuat.setFromAxisAngle(xAxis, THREE.Math.degToRad(xSpeed));
    //   textRef.current.quaternion.multiplyQuaternions(
    //     xQuat,
    //     textRef.current.quaternion
    //   );
    // }
    // if (enableY) {
    //   yQuat.setFromAxisAngle(yAxis, THREE.Math.degToRad(ySpeed));
    //   textRef.current.quaternion.multiplyQuaternions(
    //     yQuat,
    //     textRef.current.quaternion
    //   );
    // }
    // if (enableZ) {
    //   zQuat.setFromAxisAngle(zAxis, THREE.Math.degToRad(zSpeed));
    //   textRef.current.quaternion.multiplyQuaternions(
    //     zQuat,
    //     textRef.current.quaternion
    //   );
    // }

    // // Apply rotation
    // textRef.current.position.sub(blackHolePos);
    // enableX && textRef.current.position.applyQuaternion(xQuat);
    // enableY && textRef.current.position.applyQuaternion(yQuat);
    // enableZ && textRef.current.position.applyQuaternion(zQuat);
    // textRef.current.position.add(blackHolePos);

    // // Calculate distance to blackhole center
    // const currentDistToHole = Math.hypot(
    //   textRef.current.position.x,
    //   textRef.current.position.y,
    //   textRef.current.position.z
    // );
    // // If position isn't at blackhole center or further than initial position, translate towards blackhole.  Ensure center/init positions aren't exceeded
    // const transDist = mouse.current[2]; // amount to move towards/away from hole

    // if (
    //   currentDistToHole + transDist >= 0 &&
    //   currentDistToHole <= initDistToHole - transDist
    // ) {
    //   textRef.current.translateOnAxis(vectorToHole, mouse.current[2]);
    // }

    // React-Spring
    if (mouse.current[2] < 0) {
      // Calculate rotation quaternion's
      if (enableX) {
        xQuat.setFromAxisAngle(xAxis, THREE.Math.degToRad(xSpeed));
        tempObject.quaternion.multiplyQuaternions(xQuat, tempObject.quaternion);
      }
      if (enableY) {
        yQuat.setFromAxisAngle(yAxis, THREE.Math.degToRad(ySpeed));
        tempObject.quaternion.multiplyQuaternions(yQuat, tempObject.quaternion);
      }
      if (enableZ) {
        zQuat.setFromAxisAngle(zAxis, THREE.Math.degToRad(zSpeed));
        tempObject.quaternion.multiplyQuaternions(zQuat, tempObject.quaternion);
      }

      // Apply rotation
      tempObject.position.sub(blackHolePos);
      enableX && tempObject.position.applyQuaternion(xQuat);
      enableY && tempObject.position.applyQuaternion(yQuat);
      enableZ && tempObject.position.applyQuaternion(zQuat);
      tempObject.position.add(blackHolePos);

      // If position isn't at blackhole center or further than initial position, translate towards blackhole.  Ensure center/init positions aren't exceeded
      const gravity = 0.05;
      if (mouse.current[2] >= -0.5) {
        tempObject.translateOnAxis(vectorToHole, gravity); // move towards hole
      } else if (mouse.current[2] < -0.5) {
        tempObject.translateOnAxis(vectorToHole, -1 * gravity); // move away from hole
      }

      set({
        position: [
          tempObject.position.x,
          tempObject.position.y,
          tempObject.position.z,
        ],
        quaternion: [
          tempObject.quaternion.x,
          tempObject.quaternion.y,
          tempObject.quaternion.z,
          tempObject.quaternion.w,
        ],
      });
    } else if (mouse.current[2] > 0) {
      rotateX += 0.1;
      set({ position: [x, y, z], quaternion: [0, 0, 0, 1] });
      // Reset calculations so animations start from initial positions instead of jumping to previous calculated positions
      tempObject.position.set(x, y, z);
      tempObject.quaternion.set(0, 0, 0, 1);
      xQuat.set(0, 0, 0, 1);
      yQuat.set(0, 0, 0, 1);
      zQuat.set(0, 0, 0, 1);
    }
  });

  return (
    <Suspense fallback={null}>
      <animated.mesh {...letterSpring}>
        <Text
          ref={textRef}
          glyphGeometryDetail={32}
          // position={position}
          // rotation={[0, 0, 0]}
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
      </animated.mesh>
    </Suspense>
  );
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
