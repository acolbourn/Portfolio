import React, { useRef, useEffect, useState, Suspense } from 'react';
import * as THREE from 'three';
import { extend, useFrame } from 'react-three-fiber';
import { Text } from 'drei';
import { useSpring, animated } from 'react-spring/three';
import { scalePow } from 'd3-scale';

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
}) {
  const textRef = useRef();
  const [x, y, z] = position;
  const [isLoading, setIsLoading] = useState(true);
  const opacity = useRef(0); // useRef instead of useState to keep animation loop from triggering re-render
  const opacityFadeSpeed = 0.01; // Opacity Fade in speed
  const massImplode = 20; // react-spring mass when imploding
  const massExplode = 1; // react-spring mass when exploding
  let massCurrent = massImplode; // current react-spring mass
  const frictionImplode = 50; // react-spring friction when imploding
  const frictionExplode = 40; // react-spring friction when imploding
  let frictionCurrent = frictionImplode; // current react-spring friction
  // Init react-spring variables, used for smooth movement
  const [letterSpring, set] = useSpring(() => ({
    position: [x, y, z],
    quaternion: [0, 0, 0, 1],
    scale: [1, 1, 1],
    opacity: 1,
    config: { mass: massCurrent, tension: 150, friction: frictionCurrent },
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
  let scaleScale = scalePow() // Scale function of letter scale
    .exponent(0.1)
    .domain([0, 1])
    .range([0, 1])
    .clamp(true);
  let rotSpeedLeftScale = scalePow() // Scale function for rotation speed when mouse on left of screen
    .exponent(0.1)
    .domain([0, 1])
    .range([THREE.Math.degToRad(30), THREE.Math.degToRad(0.1)])
    .clamp(true);

  const constRotation = 0; // fixed slow rotation on right
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
    color: color,
    maxWidth: 300,
    lineHeight: 1,
    letterSpacing: 0,
    textAlign: 'justify',
  };

  const enableX = true;
  const enableY = true;
  const enableZ = true;

  // Generate random speed percentages so each letter travels in a different orbit
  const speedFactor = 10;
  let xSpeedMax = getRndInteger(-speedFactor, 100) / 100; // Max X rotation speed
  let ySpeedMax = getRndInteger(speedFactor, 100) / 100; // Max Y rotation speed
  let zSpeedMax = getRndInteger(speedFactor, 100) / 100; // Max Z rotation speed
  let xSpeed; // Current X rotation speed
  let ySpeed; // Current Y rotation speed
  let zSpeed; // Current Z rotation speed

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

    // If mouse on left/right of screen, animate letter being sucked into or out of blackhole. Else if mouse in center deadzone, reset text
    if (!inDeadZone) {
      // Scale rotation speeds, faster close to hole, slower further
      if (isLeftOrRight) {
        rotationSpeed = constRotation;
        // rotationSpeed = 0.1;
      } else {
        rotationSpeed = rotSpeedLeftScale(mouseXLeftLin);
      }

      // Calculate 3d rotation speeds
      // xSpeed = rotationSpeed;
      xSpeed = xSpeedMax * rotationSpeed;
      ySpeed = ySpeedMax * rotationSpeed;
      zSpeed = zSpeedMax * rotationSpeed;
      // Calculate rotation quaternion's
      if (enableX) {
        xQuat.setFromAxisAngle(xAxis, xSpeed);
        tempObject.quaternion.multiplyQuaternions(xQuat, tempObject.quaternion);
      }
      if (enableY) {
        yQuat.setFromAxisAngle(yAxis, ySpeed);
        tempObject.quaternion.multiplyQuaternions(yQuat, tempObject.quaternion);
      }
      if (enableZ) {
        zQuat.setFromAxisAngle(zAxis, zSpeed);
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

      // Set orbit distance based on mouse
      let orbit; // Orbit to maintain
      // if on left of screen, shrink orbit to hole, on right expand
      if (isLeftOrRight) {
        const maxOrbit = 6000; // Max distance of travel towards stars
        orbit = initDistToHole + maxOrbit * mouseXRightLog;
        // console.log(mouseXRightLog);
      } else {
        orbit = initDistToHole * mouseXLeftLin;
      }

      // Set travel distance towards/away from blackhole
      const holeOffset = 0.01; // Offset so letters never reach singularity
      // let transDistance = 10 * mouseXLeftLin; // Speed to move towards/away from blackhole
      let transDistance = 1; // Distance to move towards/away from blackhole
      if (isLeftOrRight) {
        transDistance = 1 + 10 * mouseXRightLog + 2 * mouseXRightLin;
      } else {
        transDistance = 1;
      }

      // Ensure travel doesn't move past blackhole center
      if (transDistance >= currentDistToHole - holeOffset) {
        // limit distance when mouse on far left of screen
        if (mouseXLeftLin < 0.1) {
          transDistance = currentDistToHole - holeOffset;
        }
      }

      // Maintain orbit set by mouse position
      if (currentDistToHole < orbit) {
        tempObject.translateOnAxis(vectorToHole, transDistance);
      } else if (currentDistToHole > orbit) {
        tempObject.translateOnAxis(vectorToHole, -1 * transDistance);
      }

      // Scale letter if on left of screen to shrink as it gets closer to blackhole, scale to 1 if in deadzone or on right
      let letterScale = 1; // Scale of each letter
      if (isLeftOrRight) {
        letterScale = 1;
      } else {
        letterScale = scaleScale(mouseXLeftLin);
      }

      // Set react-sping mass
      if (isLeftOrRight) {
        massCurrent = massExplode;
        // Reduce friction closer to right edge to speed up explosion
        frictionCurrent = frictionImplode - frictionExplode * mouseXRightLog;
        // frictionCurrent = frictionImplode ;
      } else {
        // reduce mass when near blackhole to avoid springing out of hole
        massCurrent = mouseXLeftLin < 0.01 ? 1 : massImplode;
        frictionCurrent = frictionImplode;
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
    }
    // Generate new random speeds so orbits change each time deadZone reached
    xSpeedMax = getRndInteger(-speedFactor, 100) / 100; // Max X rotation speed
    ySpeedMax = getRndInteger(speedFactor, 100) / 100; // Max Y rotation speed
    zSpeedMax = getRndInteger(speedFactor, 100) / 100; // Max Z rotation speed
  });

  return (
    <Suspense fallback={null}>
      <animated.mesh {...letterSpring} opacity={0}>
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

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
