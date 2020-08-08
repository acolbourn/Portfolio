import * as THREE from 'three';
import ReactDOM from 'react-dom';
import React, { Suspense, useCallback, useRef, useMemo } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import SwarmEffects from './SwarmEffects';

function Swarm({ count, mouse }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const spherePoints = getRandomSpherePoints(count);

    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -20 + Math.random() * 40;
      const yFactor = -20 + Math.random() * 40;
      const zFactor = -20 + Math.random() * 40;
      temp.push({
        t,
        factor,
        speed,
        xFactor,
        yFactor,
        zFactor,
        mx: 0,
        my: 0,
        spherePoint: spherePoints[i],
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let {
        t,
        factor,
        speed,
        xFactor,
        yFactor,
        zFactor,
        spherePoint,
      } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.max(1.5, Math.cos(t) * 5);
      particle.mx += (mouse.current[0] - particle.mx) * 0.02;
      particle.my += (-mouse.current[1] - particle.my) * 0.02;

      // dummy.position.set(
      //   (particle.mx / 10) * a +
      //     xFactor +
      //     Math.cos((t / 10) * factor) +
      //     (Math.sin(t * 1) * factor) / 10,
      //   (particle.my / 10) * b +
      //     yFactor +
      //     Math.sin((t / 10) * factor) +
      //     (Math.cos(t * 2) * factor) / 10,
      //   (particle.my / 10) * b +
      //     zFactor +
      //     Math.cos((t / 10) * factor) +
      //     (Math.sin(t * 3) * factor) / 10
      // );

      dummy.position.set(
        particle.mx * spherePoint.x,
        particle.mx * spherePoint.y,
        particle.mx * spherePoint.z
      );
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <sphereBufferGeometry attach='geometry' args={[1, 32, 32]} />
        <meshPhongMaterial attach='material' color='white' />
      </instancedMesh>
    </>
  );
}

function getRandomSpherePoints(count) {
  let points = [];
  for (let i = 0; i < count; i++) {
    let u = Math.random();
    let v = Math.random();
    let theta = u * 2.0 * Math.PI;
    let phi = Math.acos(2.0 * v - 1.0);
    let r = Math.cbrt(Math.random());
    let sinTheta = Math.sin(theta);
    let cosTheta = Math.cos(theta);
    let sinPhi = Math.sin(phi);
    let cosPhi = Math.cos(phi);
    let x = r * sinPhi * cosTheta;
    let y = r * sinPhi * sinTheta;
    let z = r * cosPhi;
    points.push({ x: x, y: y, z: z });
  }
  return points;
}

function SwarmViewer() {
  const mouse = useRef([0, 0]);
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]),
    []
  );
  return (
    <div style={{ width: '100%', height: '100%' }} onMouseMove={onMouseMove}>
      <Canvas
        gl={{ alpha: false, antialias: false, logarithmicDepthBuffer: true }}
        camera={{ fov: 75, position: [0, 0, 70] }}
        onCreated={({ gl }) => {
          gl.setClearColor('#1D1D1D');
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.outputEncoding = THREE.sRGBEncoding;
        }}
      >
        <ambientLight intensity={1.1} />
        <pointLight position={[100, 100, 100]} intensity={2.2} />
        <pointLight position={[-100, -100, -100]} intensity={5} color='red' />
        <Swarm mouse={mouse} count={150} />
        <Suspense fallback={null}>
          <SwarmEffects />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default SwarmViewer;
