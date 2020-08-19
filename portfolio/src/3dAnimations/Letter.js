import React, { useRef, useEffect, useState, Suspense } from 'react';
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

  let spherePosition = new THREE.Spherical();
  spherePosition.setFromCartesianCoords(x, y, z);
  const initialRadius = spherePosition.radius;
  const initialPhi = spherePosition.phi;
  const initialTheta = spherePosition.theta;
  const numOfRotations = 3 * (Math.PI * 2);
  let positionXYZ = new THREE.Vector3();
  positionXYZ.setFromSpherical(spherePosition);

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

    // Collapse to center and rotate
    const phiRotations = 0;
    // const phiRotations = numOfRotations * mouse.current[2];
    const thetaRotations = 0;
    // const thetaRotations = numOfRotations * mouse.current[2];
    const phiSpinFactor = spherePosition.phi + 0.01;
    // const thetaSpinFactor = spherePosition.theta + 0.01;
    const thetaSpinFactor = 0;

    spherePosition.set(
      initialRadius * mouse.current[2],
      phiSpinFactor + phiRotations,
      thetaRotations + thetaSpinFactor
    );

    // Convert to cartesian coordinates and update
    positionXYZ.setFromSpherical(spherePosition);
    textRef.current.position.set(positionXYZ.x, positionXYZ.y, positionXYZ.z);
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
      </Text>
    </Suspense>
  );
}

function degrees_to_radians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
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
// textRef.current.rotateAroundWorldAxis(point, xAxis, degrees_to_radians(90));
// textRef.current.rotateAroundWorldAxis(point, axis, Math.sin(timer * 7));

// // Apply rotations to temporary object and then only apply final result to avoid rendering intermediate steps of calculation
// // tempObject.position.set(x - implodeX, y - implodeY, z - implodeZ);
// tempObject.position.set(x, y, z);
// xQuat.setFromAxisAngle(xAxis, degrees_to_radians(360 * mouse.current[2]));
// // yQuat.setFromAxisAngle(yAxis, degrees_to_radians(360 * mouse.current[2]));
// // zQuat.setFromAxisAngle(zAxis, degrees_to_radians(360 * mouse.current[2]));
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
//   xQuat.setFromAxisAngle(xAxis, degrees_to_radians(xSpeed + randomFactor));
//   textRef.current.quaternion.multiplyQuaternions(
//     xQuat,
//     textRef.current.quaternion
//   );
// }
// if (enableY) {
//   yQuat.setFromAxisAngle(yAxis, degrees_to_radians(ySpeed + randomFactor));
//   textRef.current.quaternion.multiplyQuaternions(
//     yQuat,
//     textRef.current.quaternion
//   );
// }
// if (enableZ) {
//   zQuat.setFromAxisAngle(zAxis, degrees_to_radians(zSpeed + randomFactor));
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
