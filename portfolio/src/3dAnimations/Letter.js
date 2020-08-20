import React, { useRef, useEffect, useState, Suspense, useMemo } from 'react';
import * as THREE from 'three';
import { extend, useFrame } from 'react-three-fiber';
import { MeshWobbleMaterial, Text } from 'drei';
import { getRandomSpherePoints } from './LogoBoxesHelpers';
import ThreeViewer from './ThreeViewer';
// import { Text } from 'troika-three-text';

// Register Text as a react-three-fiber element
extend({ Text });

export default function Letter({ text, position, fontSize, fadeDelay, mouse }) {
  const [x, y, z] = position;
  const [isLoading, setIsLoading] = useState(true);
  const opacity = useRef(0); // useRef instead of useState to keep animation loop from stalling
  const opacityFadeSpeed = 0.01; // Opacity Fade in speed
  // Get random point on a sphere that letter will move to
  // const spherePoint = getRandomSpherePoints(1);

  console.log('Loaded');

  let spherePosition = new THREE.Spherical();
  spherePosition.setFromCartesianCoords(x, y, z);
  const initialRadius = spherePosition.radius;
  const initialPhi = spherePosition.phi;
  const initialTheta = spherePosition.theta;
  // const numOfRotations = 1 * (Math.PI * 2);
  let positionXYZ = new THREE.Vector3();
  positionXYZ.setFromSpherical(spherePosition);

  // Create rotation axis
  const origin = new THREE.Vector3(0, 0, 0);
  const xAxis = new THREE.Vector3(1, 0, 0);
  const yAxis = new THREE.Vector3(0, 1, 0);
  const zAxis = new THREE.Vector3(0, 0, 1);
  // Create quaternions and normalize
  let xQuat = new THREE.Quaternion();
  xQuat.normalize();
  let yQuat = new THREE.Quaternion();
  yQuat.normalize();
  let zQuat = new THREE.Quaternion();
  zQuat.normalize();

  // From cylinder pointing at dot on sphere example
  let rotationMatrix = new THREE.Matrix4();
  let targetQuaternion = new THREE.Quaternion();

  let phiPath = []; // phi angles, each array value is animation step
  let rotationIndex = 0; // Current step of rotation path array
  let thetaRotation = 0; // Current theta rotation
  let phiSign = 1; // Current sign of phi to flip rotation at 180 degree sign swap

  useEffect(() => {
    // Create rotation paths
    const phiResolution = 0.01;
    // Build path from 0 to 180 degrees
    for (let i = 0; i <= Math.PI; i += phiResolution) {
      phiPath.push(i);
    }
    // Build path from 180 degrees to 0 bc in spherical coordinates 0 to 180 is halfway around sphere, then theta is reversed and 180 to 0 is rest of sphere
    const phiSize = phiPath.length;
    phiPath.push(-1); // loop uses this value to trigger theta to flip
    for (let j = Math.PI - phiResolution; j > 0; j -= phiResolution) {
      phiPath.push(j);
    }
  });

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

  useFrame(() => {
    // Fade in Text
    if (!isLoading && opacity.current < 1) {
      opacity.current = opacity.current + opacityFadeSpeed;
    }
    textRef.current.material.opacity = opacity.current;

    // // Basic collapse to center
    // spherePosition.set(
    //   initialRadius * mouse.current[2],
    //   initialPhi * mouse.current[2],
    //   initialTheta * mouse.current[2]
    // );

    // Flip theta when phi is at 180 to move around opposite side of sphere
    // The -1 value is a flag inserted to trigger flip
    if (phiPath[rotationIndex] === -1) {
      thetaRotation = THREE.Math.degToRad(180);
      phiSign = -1;
      // increment counter an extra time so value after -1 flag is used
      if (rotationIndex < phiPath.length - 1) {
        rotationIndex += 1;
      } else {
        rotationIndex = 0;
      }
    } else if (rotationIndex === 0) {
      thetaRotation = THREE.Math.degToRad(0);
      phiSign = 1;
    }

    // const phiRotation = THREE.Math.degToRad(0);
    let phiRotation = phiPath[rotationIndex];
    if (rotationIndex < phiPath.length - 1) {
      rotationIndex += 3;
    } else {
      rotationIndex = 0;
    }

    // // let phiRotation = THREE.Math.degToRad(180) * mouse.current[2];
    // const phiSign = phiRotation >= 0 ? 1 : -1;
    // if (phiSign < 0) {
    //   phiRotation = Math.abs(phiRotation);
    //   thetaRotation = THREE.Math.degToRad(180);
    // } else {
    //   thetaRotation = THREE.Math.degToRad(0);
    // }

    // const thetaRotation = THREE.Math.degToRad(180) * mouse.current[2];
    // const phiSpinFactor = spherePosition.phi + 0.01;
    const phiSpinFactor = 0;
    // const thetaSpinFactor = spherePosition.theta + 0.01;
    const thetaSpinFactor = 0;

    // console.log('Phi: ', phiRotation);
    // console.log('Theta: ', thetaRotation);
    // makeSafe Restricts the polar angle phi to be between 0.000001 and pi - 0.000001.
    spherePosition
      .set(
        initialRadius * mouse.current[2],
        // initialRadius,
        phiSpinFactor + phiRotation,
        thetaRotation + thetaSpinFactor
      )
      .makeSafe();

    // Convert to cartesian coordinates and update
    positionXYZ.setFromSpherical(spherePosition);
    textRef.current.position.set(positionXYZ.x, positionXYZ.y, positionXYZ.z);
    // textRef.current.rotation.set(spherePosition.theta, 0, 0);
    textRef.current.lookAt(origin);
    textRef.current.rotateX(THREE.Math.degToRad(-90));
    // flip to counteract lookat function which flips for positive values
    if (phiSign >= 0) {
      textRef.current.rotateY(THREE.Math.degToRad(180));
    }

    // from cone pointing to dot on sphere example
    // rotationMatrix.lookAt(
    //   textRef.current.position.normalize(),
    //   origin.normalize(),
    //   textRef.current.up
    // );
    // targetQuaternion.setFromRotationMatrix(rotationMatrix);
    // textRef.current.quaternion.set(targetQuaternion);

    // // Spin around normal axis
    // var normalToSphereQuat = new THREE.Quaternion();
    // //we set the axis around which the rotation will occur. It needs to be normalized
    // var axis = new THREE.Vector3(
    //   positionXYZ.x,
    //   positionXYZ.y,
    //   positionXYZ.z
    // ).normalize();
    // //and the angle value (radians)
    // var angle = 0.01;
    // normalToSphereQuat.setFromAxisAngle(axis, angle);
    // textRef.current.applyQuaternion(normalToSphereQuat);

    //and the angle value (radians)
    // var angle = 0.01;
    // console.log(spherePosition.phi);
    // xQuat.setFromAxisAngle(xAxis, spherePosition.phi);
    // textRef.current.applyQuaternion(xQuat);

    // let axis = new THREE.Vector3(
    //   positionXYZ.x,
    //   positionXYZ.y,
    //   positionXYZ.z
    // ).normalize();
    // let currentQuat = new THREE.Quaternion();
    // currentQuat.setFromAxisAngle(axis, THREE.Math.degToRad(180));
    // currentQuat.normalize();

    // textRef.current.rotateX(THREE.Math.degToRad(360 * mouse.current[2]));
  });

  return (
    <Suspense fallback={null}>
      {/* <text
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
        <meshPhongMaterial attach='material' /> 
        <MeshWobbleMaterial
          attach='material'
          factor={0} // Strength, 0 disables the effect (default=1)
          speed={10} // Speed (default=1)
        />
      </text> */}

      {/* <Text
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
          attach='material'
          factor={1} // Strength, 0 disables the effect (default=1)
          speed={10} // Speed (default=1)
        />
      </Text> */}
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
        <axesHelper />
        {/* <arrowHelper /> */}
      </Text>
    </Suspense>
  );
}

// THREE.Object3D.prototype.rotateAroundWorldAxis = (function () {
//   var q1 = new THREE.Quaternion();
//   return function (point, axis, angle) {
//     q1.setFromAxisAngle(axis, angle);

//     this.quaternion.multiplyQuaternions(q1, this.quaternion);

//     this.position.sub(point);
//     this.position.applyQuaternion(q1);
//     this.position.add(point);

//     return this;
//   };
// })();

// function rotate(point, axis, angle){
//   q1.setFromAxisAngle(axis, angle);

//     this.quaternion.multiplyQuaternions(q1, this.quaternion);

//     this.position.sub(point);
//     this.position.applyQuaternion(q1);
//     this.position.add(point);
// }

// // Create rotation variables
// const tempObject = new THREE.Object3D(); // Temp object to run calcs before applying changes
// let xQuat = new THREE.Quaternion();
// let yQuat = new THREE.Quaternion();
// let zQuat = new THREE.Quaternion();
// let point = new THREE.Vector3(holeX, holeY, holeZ);
// let xAxis = new THREE.Vector3(1, 0, 0);
// let yAxis = new THREE.Vector3(0, 1, 0);
// let zAxis = new THREE.Vector3(0, 0, 1);

// // Final x, y, z locations for each letter
// const targetX = holeX + spherePoint[0].x * sphereRadius;
// const targetY = holeY + spherePoint[0].y * sphereRadius;
// const targetZ = holeZ + spherePoint[0].z * sphereRadius;

// const implodeX = (x - targetX) * transPercent;
// const implodeY = (y - targetY) * transPercent;
// const implodeZ = (z - targetZ) * transPercent;
// textRef.current.position.set(x - implodeX, y - implodeY, z - implodeZ);
// textRef.current.rotation.set(0, 0, 1);

// var timer = Date.now() * 0.00025;
// textRef.current.rotateAroundWorldAxis(point, xAxis, THREE.Math.degToRad(90));
// textRef.current.rotateAroundWorldAxis(point, axis, Math.sin(timer * 7));

// // Apply rotations to temporary object and then only apply final result to avoid rendering intermediate steps of calculation
// // tempObject.position.set(x - implodeX, y - implodeY, z - implodeZ);
// tempObject.position.set(x, y, z);
// xQuat.setFromAxisAngle(xAxis, THREE.Math.degToRad(360 * mouse.current[2]));
// // yQuat.setFromAxisAngle(yAxis, THREE.Math.degToRad(360 * mouse.current[2]));
// // zQuat.setFromAxisAngle(zAxis, THREE.Math.degToRad(360 * mouse.current[2]));
// tempObject.quaternion.multiplyQuaternions(xQuat, tempObject.quaternion);
// // tempObject.quaternion.multiplyQuaternions(yQuat, tempObject.quaternion);
// // tempObject.quaternion.multiplyQuaternions(zQuat, tempObject.quaternion);
// tempObject.position.sub(point);
// tempObject.position.applyQuaternion(xQuat);
// // tempObject.position.applyQuaternion(yQuat);
// // tempObject.position.applyQuaternion(zQuat);
// tempObject.position.add(point);

// tempObject.position.set(x, y, z);
// const enableX = false;
// const enableY = false;
// const enableZ = true;
// const rotateSpeed = 0.005;
// const randomFactor = 0;
// const xSpeed = 0.5;
// const ySpeed = 0.7;
// const zSpeed = 1;

// if (enableX) {
//   xQuat.setFromAxisAngle(xAxis, THREE.Math.degToRad(xSpeed + randomFactor));
//   textRef.current.quaternion.multiplyQuaternions(
//     xQuat,
//     textRef.current.quaternion
//   );
// }
// if (enableY) {
//   yQuat.setFromAxisAngle(yAxis, THREE.Math.degToRad(ySpeed + randomFactor));
//   textRef.current.quaternion.multiplyQuaternions(
//     yQuat,
//     textRef.current.quaternion
//   );
// }
// if (enableZ) {
//   zQuat.setFromAxisAngle(zAxis, THREE.Math.degToRad(zSpeed + randomFactor));
//   textRef.current.quaternion.multiplyQuaternions(
//     zQuat,
//     textRef.current.quaternion
//   );
// }

// textRef.current.position.sub(point);
// enableX && textRef.current.position.applyQuaternion(xQuat);
// enableY && textRef.current.position.applyQuaternion(yQuat);
// enableZ && textRef.current.position.applyQuaternion(zQuat);
// textRef.current.position.add(point);

// Apply rotated position
// textRef.current.position.set(
//   tempObject.position.x,
//   tempObject.position.y,
//   tempObject.position.z
// );
// textRef.current.rotation.set(
//   tempObject.rotation.x,
//   tempObject.rotation.y,
//   tempObject.rotation.z
// );

// var timer = Date.now() * 0.00025;
// const radius = 5;
// textRef.current.position.set(
//   Math.sin(timer * 7) * radius,
//   Math.cos(timer * 5) * radius,
//   Math.cos(timer * 3) * radius
// );

// // Move letter to blackhole center as mouse moves to left of screen
// const transPercent = mouse.current[2]; // Transition between new/final locations from 0 to 1
// const sphereRadius = 5;
