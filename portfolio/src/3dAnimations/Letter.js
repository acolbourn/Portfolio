import React, { useRef, Suspense } from 'react';
import * as THREE from 'three';
import { extend, useFrame } from 'react-three-fiber';
import { Text, Line } from 'drei';
import { useSpring, animated } from 'react-spring/three';

// Register Text as a react-three-fiber element
extend({ Text });

export default function Letter({
  text,
  position,
  rotation,
  fontSize,
  color,
  mouse,
  common,
  maxSpeeds,
  graphics,
  fadeGroup,
  icon,
  isLine,
  letterSpacing,
}) {
  // Note: useRefs instead of useState are essential to keep animation loop fast and avoid triggering re-renders which cause small glitches
  const meshRef = useRef();
  const springRef = useRef();
  const [x, y, z] = position;

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
  let orbit; // Orbit distance to maintain around blackhole center
  const holeOffset = 0.01; // Offset so letters never reach singularity
  let distFiltered = 1; // Filtered distance so letters don't enter blackhole

  // Font options
  const opts = {
    fontSize: fontSize,
    color: color,
    maxWidth: 300,
    lineHeight: 1,
    letterSpacing: 0,
    textAlign: 'justify',
  };
  const mat = new THREE.MeshPhongMaterial();  // Three material

  // Get new random orbit speeds from precomputed array
  let maxSpeed = maxSpeeds[Math.floor(Math.random() * (maxSpeeds.length - 1))];
  let xSpeed; // Current X rotation speed
  let ySpeed; // Current Y rotation speed
  let zSpeed; // Current Z rotation speed

  function resetLetter() {
    // Reset calculations so animations start from initial positions instead of jumping to previous calculated positions
    // Only run if letters out of position to save cpu
    if (
      springRef.current.position.x !== x ||
      springRef.current.position.y !== y ||
      springRef.current.position.z !== z
    ) {
      set({
        position: [x, y, z],
        quaternion: [0, 0, 0, 1],
        scale: [1, 1, 1],
      });
      tempObject.position.set(x, y, z);
      tempObject.quaternion.set(0, 0, 0, 1);
      xQuat.set(0, 0, 0, 1);
      yQuat.set(0, 0, 0, 1);
      zQuat.set(0, 0, 0, 1);      
    }
  }

  useFrame(() => { 
    // import mouse data   
    const {      
      mouseXLeftLin,      
      inDeadZone,      
      isLeftOrRight,
      disableMouse,
      blackHoleState,
    } = mouse.current;

    // import common calculations
    const {
      letterScale,
      rotationSpeed,
      travelDist,
      explodeOrbit,
      massCurrent,
      frictionCurrent,
      opacity,
    } = common.current;

    // Set opacity. If icon, limit opacity to reduce excessive bloom
    if (icon && opacity[fadeGroup] >= 0.85) {
      meshRef.current.material.opacity = 0.85;
    } else {
      meshRef.current.material.opacity = opacity[fadeGroup];
    }

    // Only animate if high graphics selected
    if (graphics === 'high') {
      // mouse disabled during intro animations
      if (!disableMouse) {
        // If mouse on left/right of screen, animate letter being sucked into or out of blackhole. Else if mouse in center deadzone, reset text
        if (!inDeadZone) {
          // Bypass if in blackhole to save cpu
          if (blackHoleState !== 'Stars In') {
            // Only calculate rotations on left of screen for implosion effect
            if (!isLeftOrRight) {
              // Calculate 3d rotation speeds
              xSpeed = maxSpeed.x * rotationSpeed;
              ySpeed = maxSpeed.y * rotationSpeed;
              zSpeed = maxSpeed.z * rotationSpeed;

              // Calculate and multiply rotation quaternion's
              xQuat.setFromAxisAngle(xAxis, xSpeed);
              yQuat.setFromAxisAngle(yAxis, ySpeed);
              zQuat.setFromAxisAngle(zAxis, zSpeed);
              tempObject.quaternion.multiplyQuaternions(
                xQuat,
                tempObject.quaternion
              );
              tempObject.quaternion.multiplyQuaternions(
                yQuat,
                tempObject.quaternion
              );
              tempObject.quaternion.multiplyQuaternions(
                zQuat,
                tempObject.quaternion
              );

              // Apply rotation
              tempObject.position.sub(blackHolePos);
              tempObject.position.applyQuaternion(xQuat);
              tempObject.position.applyQuaternion(yQuat);
              tempObject.position.applyQuaternion(zQuat);
              tempObject.position.add(blackHolePos);
            }

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
          }
        } else if (inDeadZone || disableMouse) {
          // Reset letters in deadzone and during intro animation
          resetLetter();
        }
      }
    } else {
      // else if graphics aren't high reset letters and turn off animations
      resetLetter();
    }
  });

  return (
    <Suspense fallback={null}>
      <animated.mesh ref={springRef} {...letterSpring}>
        {isLine ? (
          <Line
            ref={meshRef}
            points={[0, 0, 0, letterSpacing[0], 0, 0]}
            lineWidth={1}
            color={color}
            position={[0, 0, 0]}
            transparent={true}
          />
        ) : (
          <Text
            ref={meshRef}
            {...opts}
            font={
              icon
                ? '/fonts/Font Awesome 5 Free-Solid-900.otf'
                : '/fonts/syncopate-v11-latin-regular.woff'
            }
            anchorX='center'
            anchorY='middle'
            rotation={rotation}
            material={mat}
          >
            {text}
          </Text>
        )}
      </animated.mesh>
    </Suspense>
  );
}
