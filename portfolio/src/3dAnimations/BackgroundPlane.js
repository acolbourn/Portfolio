import React, { useRef } from 'react';
// import * as THREE from 'three';
import { useFrame } from 'react-three-fiber';
import { Plane, Sphere, MeshDistortMaterial } from 'drei';

export default function BackgroundPlane({ position }) {
  const planeRef = useRef();
  //   let position = -100;
  useFrame(() => {
    // planeRef.current.material.opacity = 0.1;
    // console.log(planeRef.current);
    // planeRef.current.position.z = position;
    // position -= 10;
    // console.log(planeRef.current.position.z);
  });
  return (
    <Sphere ref={planeRef} args={[5, 32, 32]} position={position}>
      <MeshDistortMaterial
        attach='material'
        distort={0.5} // Strength, 0 disables the effect (default=1)
        speed={10} // Speed (default=1)
        color='black'
      />
    </Sphere>
    // <Plane ref={planeRef} args={[200000, 200000]} position={[0, 0, -100]}>
    //   <meshBasicMaterial attach='material' color='#1D1D1D'  />
    // </Plane>
  );
}
