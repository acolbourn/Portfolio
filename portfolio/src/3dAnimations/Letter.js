import React, { useRef, useEffect, useState, Suspense } from 'react';
import * as THREE from 'three';
import { extend, useFrame } from 'react-three-fiber';
import { Text } from 'drei';
import { useSpring, animated } from 'react-spring/three';

// Register Text as a react-three-fiber element
extend({ Text });

export default function Letter({
  text,
  position,
  rotation,
  fontSize,
  color,
  fadeDelay,
  mouse,
  common,
  maxSpeeds,
}) {
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
  let orbit; // Orbit to maintain
  const holeOffset = 0.01; // Offset so letters never reach singularity
  let distFiltered = 1; // Filtered distance so letters don't enter blackhole

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
    color: color,
    maxWidth: 300,
    lineHeight: 1,
    letterSpacing: 0,
    textAlign: 'justify',
  };

  // Get new random orbit speeds from precomputed array
  let maxSpeed = maxSpeeds[Math.floor(Math.random() * (maxSpeeds.length - 1))];
  let xSpeed; // Current X rotation speed
  let ySpeed; // Current Y rotation speed
  let zSpeed; // Current Z rotation speed

  useFrame(() => {
    // import mouse data
    const {
      // mouseX,
      // mouseY,
      // mouseXScaled,
      // mouseYScaled,
      mouseXLeftLin,
      // mouseXRightLin,
      // mouseXLeftLog,
      // mouseXRightLog,
      inDeadZone,
      isLeftOrRight,
    } = mouse.current;

    // import common calculations
    const {
      letterScale,
      rotationSpeed,
      travelDist,
      explodeOrbit,
      massCurrent,
      frictionCurrent,
    } = common.current;

    // Fade in Text
    if (!isLoading && opacity.current < 1) {
      opacity.current = opacity.current + opacityFadeSpeed;
    }
    textRef.current.material.opacity = opacity.current;

    // If mouse on left/right of screen, animate letter being sucked into or out of blackhole. Else if mouse in center deadzone, reset text
    if (!inDeadZone) {
      // Calculate 3d rotation speeds
      xSpeed = maxSpeed.x * rotationSpeed;
      ySpeed = maxSpeed.y * rotationSpeed;
      zSpeed = maxSpeed.z * rotationSpeed;

      // Calculate and multiply rotation quaternion's
      xQuat.setFromAxisAngle(xAxis, xSpeed);
      yQuat.setFromAxisAngle(yAxis, ySpeed);
      zQuat.setFromAxisAngle(zAxis, zSpeed);
      tempObject.quaternion.multiplyQuaternions(xQuat, tempObject.quaternion);
      tempObject.quaternion.multiplyQuaternions(yQuat, tempObject.quaternion);
      tempObject.quaternion.multiplyQuaternions(zQuat, tempObject.quaternion);

      // Apply rotation
      tempObject.position.sub(blackHolePos);
      tempObject.position.applyQuaternion(xQuat);
      tempObject.position.applyQuaternion(yQuat);
      tempObject.position.applyQuaternion(zQuat);
      tempObject.position.add(blackHolePos);

      // Calculate current distance to blackhole center
      const currentDistToHole = Math.hypot(
        tempObject.position.x,
        tempObject.position.y,
        tempObject.position.z
      );

      // Set orbit distance based on mouse
      // if on left of screen, shrink orbit to hole, on right expand
      if (isLeftOrRight) {
        orbit = initDistToHole + explodeOrbit;
        // console.log(mouseXRightLog);
      } else {
        orbit = initDistToHole * mouseXLeftLin;
      }

      // Ensure travel doesn't move past blackhole center
      distFiltered = travelDist;
      if (travelDist >= currentDistToHole - holeOffset) {
        // limit distance when mouse on far left of screen
        if (mouseXLeftLin < 0.1) {
          distFiltered = currentDistToHole - holeOffset;
        }
      }

      // Maintain orbit set by mouse position
      if (currentDistToHole < orbit) {
        tempObject.translateOnAxis(vectorToHole, distFiltered);
      } else if (currentDistToHole > orbit) {
        tempObject.translateOnAxis(vectorToHole, -1 * distFiltered);
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
        config: {
          mass: massCurrent,
          tension: 150,
          friction: frictionCurrent,
        },
      });
    } else if (inDeadZone) {
      // Reset calculations so animations start from initial positions instead of jumping to previous calculated positions
      set({ position: [x, y, z], quaternion: [0, 0, 0, 1], scale: [1, 1, 1] });
      tempObject.position.set(x, y, z);
      tempObject.quaternion.set(0, 0, 0, 1);
      xQuat.set(0, 0, 0, 1);
      yQuat.set(0, 0, 0, 1);
      zQuat.set(0, 0, 0, 1);
      // Get new random orbit speeds from precomputed array
      maxSpeed = maxSpeeds[Math.floor(Math.random() * (maxSpeeds.length - 1))];
    }
  });

  return (
    <Suspense fallback={null}>
      <animated.mesh {...letterSpring} opacity={0}>
        <Text
          ref={textRef}
          {...opts}
          // font={
          //   'https://fonts.gstatic.com/s/syncopate/v9/pe0sMIuPIYBCpEV5eFdCBfe5.woff'
          // }
          font={'/fonts/syncopate-v11-latin-regular.woff'}
          anchorX='center'
          anchorY='middle'
          rotation={rotation}
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
