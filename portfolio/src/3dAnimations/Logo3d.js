import React, { useRef } from 'react';
import { useLoader, useFrame } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function Logo3d() {
  // This reference gives direct access to the mesh
  const mesh = useRef();

  const { nodes } = useLoader(GLTFLoader, '/LogoOnePiece2.glb');
  console.log(nodes);
  console.log(nodes.Curve.geometry);
  const geometry = nodes.Curve.geometry.center();
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.z += 0.01;
  });

  return (
    <group position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} dispose={null}>
      <mesh
        ref={mesh}
        scale={[65, 65, 65]}
        geometry={geometry}
        castShadow
        receiveShadow
      >
        <meshPhongMaterial attach='material' color='blue' />
      </mesh>
    </group>
  );
}
