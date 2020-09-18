import React, { useMemo } from 'react';
import { Shape } from 'three';

const eps = 0.00001;

function createShape(width, height, radius0) {
  const shape = new Shape();
  const radius = radius0 - eps;
  shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
  shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true);
  shape.absarc(
    width - radius * 2,
    height - radius * 2,
    eps,
    Math.PI / 2,
    0,
    true
  );
  shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true);
  return shape;
}

export default function RoundBox({ colorArray }) {
  const boxLength = 1;
  const width = boxLength;
  const height = boxLength;
  const depth = boxLength;
  const radius = 0.15;
  const smoothness = 1;

  const shape = useMemo(() => createShape(width, height, radius), [
    width,
    height,
    radius,
  ]);
  const extrudeSettings = useMemo(
    () => ({
      depth: depth - radius * 2,
      bevelEnabled: true,
      bevelSegments: smoothness * 2,
      steps: 1,
      bevelSize: radius - eps,
      bevelThickness: radius,
      curveSegments: smoothness,
    }),
    [depth, radius, smoothness]
  );

  //   let length = 1,
  //   width = 1;

  // let shape = new THREE.Shape();
  // shape.moveTo(0, 0);
  // shape.lineTo(0, width);
  // shape.lineTo(length, width);
  // shape.lineTo(length, 0);
  // shape.lineTo(0, 0);
  //   let extrudeSettings = {
  //     steps: 2,
  //     depth: 0,
  //     bevelEnabled: true,
  //     bevelThickness: 1,
  //     bevelSize: 1,
  //     bevelOffset: 0,
  //     bevelSegments: 1,
  //   };
  return (
    <extrudeBufferGeometry attach='geometry' args={[shape, extrudeSettings]}>
      <instancedBufferAttribute
        attachObject={['attributes', 'color']}
        args={[colorArray, 3]}
      />
    </extrudeBufferGeometry>
  );
}
