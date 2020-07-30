import React, { useState } from 'react';
import { extend, Canvas } from 'react-three-fiber';
import { Text } from 'troika-three-text';

const fonts = {
  Roboto: 'https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff',
  'Noto Sans':
    'https://fonts.gstatic.com/s/notosans/v7/o-0IIpQlx3QUlC5A4PNr5TRG.woff',
  Comfortaa:
    'https://fonts.gstatic.com/s/comfortaa/v12/1Ptsg8LJRfWJmhDAuUs4TYFs.woff',
  Cookie: 'https://fonts.gstatic.com/s/cookie/v8/syky-y18lb0tSbf9kgqU.woff',
  Philosopher:
    'https://fonts.gstatic.com/s/philosopher/v9/vEFV2_5QCwIS4_Dhez5jcWBuT0s.woff',
  Quicksand:
    'https://fonts.gstatic.com/s/quicksand/v7/6xKtdSZaM9iE8KbpRA_hK1QL.woff',
  Trirong: 'https://fonts.gstatic.com/s/trirong/v3/7r3GqXNgp8wxdOdOn4so3g.woff',
  Trocchi: 'https://fonts.gstatic.com/s/trocchi/v6/qWcqB6WkuIDxDZLcPrxeuw.woff',
  'Advent Pro':
    'https://fonts.gstatic.com/s/adventpro/v7/V8mAoQfxVT4Dvddr_yOwhTqtLg.woff',
  'Henny Penny':
    'https://fonts.gstatic.com/s/hennypenny/v5/wXKvE3UZookzsxz_kjGSfPQtvXQ.woff',
  Orbitron:
    'https://fonts.gstatic.com/s/orbitron/v9/yMJRMIlzdpvBhQQL_Qq7dys.woff',
  Sacramento:
    'https://fonts.gstatic.com/s/sacramento/v5/buEzpo6gcdjy0EiZMBUG4C0f-w.woff',
  'Snowburst One':
    'https://fonts.gstatic.com/s/snowburstone/v5/MQpS-WezKdujBsXY3B7I-UT7SZieOA.woff',
  Syncopate:
    'https://fonts.gstatic.com/s/syncopate/v9/pe0sMIuPIYBCpEV5eFdCBfe5.woff',
  Wallpoet:
    'https://fonts.gstatic.com/s/wallpoet/v9/f0X10em2_8RnXVVdUObp58I.woff',
  'Sirin Stencil':
    'https://fonts.gstatic.com/s/sirinstencil/v6/mem4YaWwznmLx-lzGfN7MdRyRc9MAQ.woff',
};

// Register Text as a react-three-fiber element
extend({ Text });

const text = 'Alex Colbourn';

export default function TextGeometry() {
  // State:
  const [rotation, setRotation] = useState([0, 0, 0, 0]);
  const [opts, setOpts] = useState({
    font: 'Philosopher',
    fontSize: 30,
    color: '#99ccff',
    maxWidth: 300,
    lineHeight: 1,
    letterSpacing: 0,
    textAlign: 'justify',
    materialType: 'MeshPhongMaterial',
  });

  // Handlers:
  const onMouseMove = (e) => {
    setRotation([
      ((e.clientY / e.target.offsetHeight - 0.5) * -Math.PI) / 8,
      ((e.clientX / e.target.offsetWidth - 0.5) * -Math.PI) / 8,
      0,
    ]);
  };

  return (
    <div>
      <Canvas
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        pixelRatio={window.devicePixelRatio}
        onMouseMove={onMouseMove}
      >
        <text
          position-z={-180}
          rotation={rotation}
          {...opts}
          text={text}
          font={fonts[opts.font]}
          anchorX='center'
          anchorY='middle'
        >
          {opts.materialType === 'MeshPhongMaterial' ? (
            <meshPhongMaterial attach='material' color={opts.color} />
          ) : null}
        </text>

        <pointLight position={[-100, 0, -160]} />
        <pointLight position={[0, 0, -170]} />
        <pointLight position={[100, 0, -160]} />
      </Canvas>
    </div>
  );
}
