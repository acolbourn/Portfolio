import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber';
import Color from 'color';
import { scaleLinear, scalePow } from 'd3-scale';
import { useSpring, animated } from 'react-spring/three';
import logoPoints from './logoPoints.js';
import { getRandomSpherePoints } from './LogoBoxesHelpers';

export default function LogoBoxes({
  mouse,
  meshPosition,
  meshScale,
  fadeDelay,
}) {
  console.log('LogoBoxes rendered');

  const colorPalette = ['#222831', '#393e46', '#0092ca']; // Colors when mouse at bottom of screen
  const uniformColor = '#0047AB'; // Color when mouse at top of screen
  let defaultBoxColor = Color('#2a363b'); // Color at screen center
  const depth = 5; // Layers of boxes in Z direction
  const numOfInstances = logoPoints.length * depth; // Total # of boxes
  const boxSize = 1; // Physical box dimensions
  const maxBoxDistance = 6000; // Max distance boxes spread from each other
  const meshOffset = -2; // offset so rotation is exactly centered
  const groupPosZ = meshOffset + (depth * boxSize) / 2 - boxSize / 2; // Z center of logo
  const groupPosXY = 0; // X and Y center of logo
  const tempObject = new THREE.Object3D(); // Init box object
  const tempColor = new THREE.Color(); // Init color object
  let boxColors = []; // Array of box colors
  let boxColorsHex = []; // Array of box colors in hex
  let uniformBoxColorHex; // Uniform box color in hex
  let defaultBoxColorHex = defaultBoxColor.hex(); // Default box color hex
  const standardRotationSpeed = 0.007; // standard rotation speed of logo
  const maxRotationSpeed = 0.12; // max rotation speed of logo
  const windowHalf = window.innerWidth / 2; // Half window width for scaling

  // Generate initial color arrays. Use id's to reduce number of computations run each loop.  Only a set number of colors is calculated each time instead of each individual box, and then boxes pull from one of those precalculated limited colors based on their id.
  colorPalette.forEach((color) => boxColors.push(Color(color)));
  boxColors.forEach((color) => boxColorsHex.push(color.hex()));
  const colors = new Array(numOfInstances).fill().map(() => defaultBoxColorHex);
  const numOfColors = colorPalette.length;
  // Assign each box into color id group
  const colorIds = new Array(numOfInstances)
    .fill()
    .map(() => Math.floor(Math.random() * numOfColors));
  // Create random sphere points to assign to each box for exploding effect
  const spherePoints = getRandomSpherePoints(numOfInstances);
  let mouseVelX = 0; // Delayed mouse X position for smoother animation
  let mouseVelY = 0; // Delayed mouse Y position for smoother animation
  let mouseVelExplode = 0; // Delayed explode for smoother animation
  let mouseVelImplode = 0; // Delayed implode for smoother animation
  let shineVel = 30; // Delayed box shine for smoother animation
  const animateSpeedY = 0.02; // Mouse smoothing delay Y direction
  const explodeSpeed = 0.02; // Mouse smoothing delay explosion
  const implodeSpeed = 0.2; // Mouse smoothing delay implosion
  const shineFadeSpeed = 0.01; // Speed that box shine fades out
  let animateVel = explodeSpeed; // Delayed smoothing animation speed
  let colorIndex = 0; // Current color index to select varying color when mouse at bottom of screen
  let offset; // Starting index of next color used in render loop

  // Create array with xy points copied to each depth in z direction
  const logoPoints3d = [];
  logoPoints.forEach((point) => {
    for (let z = 0; z < depth; z++) {
      logoPoints3d.push([point[0], point[1], z]);
    }
  });

  const ref = useRef(); // Mesh ref
  const matRef = useRef(); // Material ref
  // Note: useRefs instead of useState are essential to keep animation loop fast and avoid triggering re-renders which cause small glitches
  const isLoadingRef = useRef(true); // loading ref for opacity fade
  const initBoxPositionRef = useRef(3000); // inital box position ref

  // Init react-spring variables, used for smooth movement
  const springScaleRef = useRef(); // react-spring scale ref
  const massImplode = 1; // react-spring mass when imploding
  const massExplode = 2; // react-spring mass when exploding
  let massCurrent = massImplode; // current react-spring mass
  const frictionImplode = 30; // react-spring friction when imploding
  const frictionExplode = 50; // react-spring friction when exploding
  let frictionCurrent = frictionImplode; // current react-spring friction
  const [groupScaleSpring, set] = useSpring(() => ({
    scale: [meshScale[0], meshScale[0], meshScale[0]],
    config: { mass: massCurrent, tension: 150, friction: frictionCurrent },
  }));

  // Initialize empty color array
  const colorArray = useMemo(
    () =>
      Float32Array.from(
        new Array(numOfInstances)
          .fill()
          .flatMap((_, i) => tempColor.set(colors[i]).toArray())
      ),
    [colors, numOfInstances, tempColor]
  );

  // Memoize blended colors to save processing each loop
  const blendedColorArray = useMemo(() => {
    let tempColors = [];
    const resolution = 0.01;
    // Create array of each color mixed together in steps of resolution
    for (let r = 0; r < numOfColors; r++) {
      for (let mix = 0; mix <= 1; mix += resolution) {
        const tempColor = boxColors[r].mix(
          boxColors[r + 1 >= numOfColors ? 0 : r + 1],
          mix.toFixed(2)
        );
        tempColors.push(tempColor);
      }
    }
    return tempColors;
  }, [boxColors, numOfColors]);
  offset = blendedColorArray.length / numOfColors; // Starting index of next color used in render loop

  // Start boxes spread out and assemble after delay
  useEffect(() => {
    let timer1 = setTimeout(() => {
      initBoxPositionRef.current = 0;
      isLoadingRef.current = false;
    }, fadeDelay);
    // Clear timeout on unmount
    return () => {
      clearTimeout(timer1);
    };
  }, [fadeDelay]);

  // // Force rerender on window resize
  // const [dimensions, setDimensions] = React.useState({
  //   height: window.innerHeight,
  //   width: window.innerWidth,
  // });
  // React.useEffect(() => {
  //   function handleResize() {
  //     setDimensions({
  //       height: window.innerHeight,
  //       width: window.innerWidth,
  //     });
  //   }
  //   window.addEventListener('resize', handleResize);
  //   return (_) => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // });

  // Scaling functions
  // From left edge to mid left, collapse sphere to origin
  let sphereScale = scalePow()
    .exponent(0.3)
    .domain([0, -0.5])
    .range([1, 5])
    .clamp(true);
  // From left edge to mid left, scale logo group from 0 to origina scale
  let meshGroupScale = scaleLinear()
    .domain([0, 0.1])
    .range([0, meshScale[0]])
    .clamp(true);
  // From deadzone to mid left, transition from logo to sphere
  let logo2SphereScale = scaleLinear()
    .domain([-0.5, -1])
    .range([0, -1])
    .clamp(true);
  // Rotate faster as mouse moves from center to left edge/blackhole
  let rotSpeedScale = scalePow()
    .exponent(0.3)
    .domain([0, 1])
    .range([maxRotationSpeed, standardRotationSpeed])
    .clamp(true);
  // Create smooth scale between implosion/explosion animation speeds
  // Scale from 3/4 of window to left window edge, right quarter remains constant at explode speed
  const animateScale = scalePow()
    .exponent(0.1)
    .domain([windowHalf / 2, -windowHalf])
    .range([explodeSpeed, implodeSpeed])
    .clamp(true);
  // Increase box shine closer to blackhole
  let shineScale = scaleLinear().domain([0, 1]).range([100, 30]).clamp(true);

  useFrame((state) => {
    let { mouseX, mouseYScaled } = mouse.current;
    const {
      // mouseXScaled,
      // mouseYScaled,
      mouseXLeftLin,
      // mouseXRightLin,
      // mouseXLeftLog,
      mouseXRightLog,
      inDeadZone,
      isLeftOrRight,
      disableMouse,
    } = mouse.current;

    let i = 0;
    const time = state.clock.getElapsedTime();

    // Turn on visibility after delay for fade in effect
    ref.current.visible = !isLoadingRef.current;

    // Scale mouse positions and velocities for animations
    if (disableMouse) {
      // Disable mouse on load and use intro animation values
      mouseX = initBoxPositionRef.current;
      mouseYScaled = 0;
    }
    const mouseExplode = maxBoxDistance * mouseXRightLog;
    const mouseImplode = mouseXLeftLin;

    // Create delayed mouse movement velocities
    // "Velocity" in this case just means a slower/smoother animation.
    const scaledAnimationSpeed = animateScale(mouse.current.mouseX);
    animateVel += scaledAnimationSpeed - animateVel;
    mouseVelX += (mouseX - mouseVelX) * animateVel;
    mouseVelY += (mouseYScaled - mouseVelY) * animateSpeedY;
    mouseVelExplode += (mouseExplode - mouseVelExplode) * animateVel;
    mouseVelImplode += (mouseImplode - mouseVelImplode) * animateVel;

    // Delay box shine fade out but keep fade in instant
    const targetShine = shineScale(mouseXLeftLin);
    if (matRef.current.shininess > targetShine) {
      shineVel += (targetShine - shineVel) * shineFadeSpeed;
    } else {
      shineVel = targetShine;
    }
    matRef.current.shininess = shineVel;

    // Rotate logo group
    // if mouse in deadzone to right edge, rotate standard speed
    // else if mouse on left rotate faster from deadzone to left edge
    if (inDeadZone || isLeftOrRight) {
      ref.current.rotation.y += standardRotationSpeed;
    } else {
      ref.current.rotation.y += rotSpeedScale(mouseVelImplode);
    }

    // Calculate box colors based on mouse position
    if (mouseVelY < 0) {
      // if mouse above center, mix center default color with uniform color
      uniformBoxColorHex = defaultBoxColor
        .mix(Color(uniformColor), Math.abs(mouseVelY))
        .hex();
      boxColorsHex = boxColorsHex.map(() => uniformBoxColorHex);
    } else {
      // else mouse is below center so mix multi-color array with default
      // Reset color looping index each time it reaches end of array
      colorIndex >= blendedColorArray.length - 1
        ? (colorIndex = 0)
        : (colorIndex += 1);
      // Mix each variable color with default color based on mouse position.  Since multiple colors are in precomputed color array, offset applies different colors to each box group.  Remove offset to make all boxes cycle through the same colors simultaneously.
      const absMouseVelY = Math.abs(mouseVelY);
      for (let r = 0; r < numOfColors; r++) {
        boxColorsHex[r] = defaultBoxColor
          .mix(
            blendedColorArray[
              (colorIndex + r * offset) % blendedColorArray.length
            ],
            absMouseVelY
          )
          .hex();
      }
    }

    // Set mouse to 0 on left side of screen to bypass explosion effect
    const sphereDist = mouseVelExplode >= 0 ? mouseVelExplode : 0;

    // Apply common scales
    const mouseShiftedX = -1 * mouseVelImplode;
    const sphereRadius = sphereScale(mouseShiftedX);
    const groupScale = meshGroupScale(mouseXLeftLin);
    let logo2Sphere = logo2SphereScale(mouseShiftedX);

    // Update box positions and rotations.
    logoPoints3d.forEach((position, idx) => {
      const id = i++; // Box id
      // Box position within logo group
      const x = position[0];
      const y = position[1];
      const z = position[2];

      // Explosion Animation
      // Calculate point on sphere based on user mouse movement
      // Generate explode functions
      const explodeX = spherePoints[idx].x * sphereDist;
      const explodeY = spherePoints[idx].y * sphereDist;
      const explodeZ = spherePoints[idx].z * sphereDist;

      // Generate implode functions
      const implodeX =
        (-x - groupPosXY) * logo2Sphere -
        spherePoints[idx].x * sphereRadius * (1 + logo2Sphere);
      const implodeY =
        (-y - groupPosXY) * logo2Sphere -
        spherePoints[idx].y * sphereRadius * (1 + logo2Sphere);
      const implodeZ =
        (-z - groupPosZ) * logo2Sphere -
        spherePoints[idx].z * sphereRadius * (1 + logo2Sphere);

      // Set box position
      tempObject.position.set(
        groupPosXY - implodeX - explodeX,
        groupPosXY - implodeY - explodeY,
        groupPosZ - implodeZ - explodeZ
      );

      // Rotate individual boxes using current time.  This gives a wave like effect bc time will be slightly different as each box is set in the loop.
      tempObject.rotation.y =
        Math.sin(x / 4 + time) +
        Math.sin(y / 4 + time) +
        Math.sin(z / 4 + time);
      tempObject.rotation.z = tempObject.rotation.y * 2;
      // Apply new values to matrix
      tempColor.set(boxColorsHex[colorIds[idx]]).toArray(colorArray, id * 3);
      tempObject.updateMatrix();
      ref.current.setMatrixAt(id, tempObject.matrix);
    });

    // if mouse in blackhole zone, shrink scale fast, else expand slow
    if (mouseXLeftLin <= 0) {
      massCurrent = massImplode;
      frictionCurrent = frictionImplode;
    } else {
      massCurrent = massExplode;
      frictionCurrent = frictionExplode;
    }

    // Apply react-spring scaling
    set({
      scale: [groupScale, groupScale, groupScale],
      config: { mass: massCurrent, tension: 150, friction: frictionCurrent },
    });

    ref.current.geometry.attributes.color.needsUpdate = true;
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <animated.mesh
      ref={springScaleRef}
      {...groupScaleSpring}
      position={meshPosition}
    >
      <instancedMesh
        ref={ref}
        args={[null, null, numOfInstances]}
        rotation={[0, 0, Math.PI]}
        scale={meshScale}
      >
        <boxBufferGeometry attach='geometry' args={[boxSize, boxSize, boxSize]}>
          <instancedBufferAttribute
            attachObject={['attributes', 'color']}
            args={[colorArray, 3]}
          />
        </boxBufferGeometry>
        <meshPhongMaterial
          ref={matRef}
          attach='material'
          vertexColors={THREE.VertexColors}
          shininess={30}
        />
      </instancedMesh>
    </animated.mesh>
  );
}
