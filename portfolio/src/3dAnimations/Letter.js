import React, { useRef, useEffect, useState, Suspense } from 'react';
import * as THREE from 'three';
import { extend, useFrame } from 'react-three-fiber';
import { Text } from 'drei';
import { useSpring, animated } from 'react-spring/three';
import { scaleLinear, scalePow } from 'd3-scale';

// Register Text as a react-three-fiber element
extend({ Text });

export default function Letter({ text, position, fontSize, fadeDelay, mouse }) {
  const textRef = useRef();
  const [x, y, z] = position;
  const [isLoading, setIsLoading] = useState(true);
  const opacity = useRef(0); // useRef instead of useState to keep animation loop from triggering re-render
  const opacityFadeSpeed = 0.01; // Opacity Fade in speed
  // Init react-spring variables, used for smooth movement
  const [letterSpring, set] = useSpring(() => ({
    position: [x, y, z],
    quaternion: [0, 0, 0, 1],
    scale: [1, 1, 1],
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
  let scaleScale = scalePow() // Scale function of letter scale
    .exponent(0.1)
    .domain([0, 1])
    .range([0, 1])
    .clamp(true);
  let rotSpeedLeftScale = scaleLinear() // Scale function for rotation speed when mouse on left of screen
    .domain([0, 1])
    .range([1, 0.2])
    .clamp(true);
  let rotationSpeed; // rotation speed scaled (inverse of mouse x)

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
  // const randomFactor = 1;
  // const randomFactor = getRndInteger(80, 100) / 100;
  const xSpeedMax = getRndInteger(-100, 100) / 100; // Max X rotation speed
  const ySpeedMax = getRndInteger(80, 100) / 100; // Max Y rotation speed
  const zSpeedMax = getRndInteger(80, 100) / 100; // Max Z rotation speed
  let xSpeed; // Current X rotation speed
  let ySpeed; // Current Y rotation speed
  let zSpeed; // Current Z rotation speed
  // const xSpeedMax = 0.5 * randomFactor;
  // const ySpeedMax = 0.3 * randomFactor;
  // const zSpeedMax = 0.3;

  // let rotateX = 0;
  useFrame(() => {
    const {
      // mouseX,
      // mouseY,
      // mouseXScaled,
      // mouseYScaled,
      mouseXLeftLin,
      mouseXRightLin,
      // mouseXLeftLog,
      mouseXRightLog,
      inDeadZone,
      isLeftOrRight,
    } = mouse.current;
    // Fade in Text
    if (!isLoading && opacity.current < 1) {
      opacity.current = opacity.current + opacityFadeSpeed;
    }
    textRef.current.material.opacity = opacity.current;

    // If mouse on left/right of screen animate the letter being sucked into or out of blackhole depending on mouse position, else if mouse is in the center deadzone, reset text to center
    if (!inDeadZone) {
      // Scale rotation speeds, faster close to hole, slower further
      if (isLeftOrRight) {
        rotationSpeed = 0.1;
      } else {
        rotationSpeed = rotSpeedLeftScale(mouseXLeftLin);
      }

      // Calculate 3d rotation speeds
      xSpeed = xSpeedMax * rotationSpeed;
      ySpeed = ySpeedMax * rotationSpeed;
      zSpeed = zSpeedMax * rotationSpeed;
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

      // Calculate current distance to blackhole center
      const currentDistToHole = Math.hypot(
        tempObject.position.x,
        tempObject.position.y,
        tempObject.position.z
      );

      let orbit; // Orbit to maintain
      // if on left of screen, shrink orbit to hole, on right expand
      if (isLeftOrRight) {
        const maxOrbit = 6000; // Max distance of travel towards stars
        orbit = initDistToHole + maxOrbit * mouseXRightLog;
        // console.log(mouseXRightLog);
      } else {
        orbit = initDistToHole * mouseXLeftLin;
      }

      const gravity = 10; // Speed to move towards/away from blackhole
      const eventHorizon = 10; // Distance at which letters vanish
      if (currentDistToHole <= eventHorizon) {
        tempObject.position.set([0, 0, 0]);
      } else {
        // Maintain orbit set by mouse position
        if (currentDistToHole < orbit) {
          tempObject.translateOnAxis(vectorToHole, gravity); // move towards hole
        } else if (currentDistToHole > orbit) {
          tempObject.translateOnAxis(vectorToHole, -1 * gravity); // move away from hole
        }
      }

      // Scale letter if on left of screen to shrink as it gets closer to blackhole, scale to 1 if on right
      let letterScale = 1; // Scale of each letter
      if (isLeftOrRight) {
        letterScale = 1;
      } else {
        letterScale = scaleScale(mouseXLeftLin);
      }

      // Send calculations to react-spring to apply update
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
        scale: [letterScale, letterScale, letterScale],
      });
    } else if (inDeadZone) {
      // Reset calculations so animations start from initial positions instead of jumping to previous calculated positions

      // rotateX += 0.1;
      set({ position: [x, y, z], quaternion: [0, 0, 0, 1], scale: [1, 1, 1] });
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
