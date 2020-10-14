import React, { Suspense, useRef, useCallback } from 'react';
import { Canvas } from 'react-three-fiber';
import { Stats } from 'drei';
import Lights from './Lights';
import HomeFallback from '../HomeFallback';
import ThreeScale from './ThreeScale';

export default function ThreeViewer({ graphics, isLoading }) {
  // Process mouse & touchscreen movements.  Note - useRef is essential as useState would trigger rerenders causing glitches in animation updates
  const mouse = useRef({
    mouseX: 0, // Raw X
    mouseY: 0, // Raw Y
    mouseXScaled: 0, // X scaled linearly from -1 to 1
    mouseYScaled: 0, // Y scaled linearly from -1 to 1
    mouseXLeftLin: 1, // X scaled linearly from 0 to 1 on left
    mouseXRightLin: 0, // X scaled linearly from 0 to 1 on right
    mouseXLeftLog: 0, // X scaled logarithmically on left
    mouseXRightLog: 0, // X scaled logarithmically on right
    inDeadZone: true, // true = mouse in center, else false
    inBlackHoleZone: false, // true = mouse on left edge, else false
    isLeftOrRight: true, // false = mouse on left, true = right
    disableMouse: true, // disable mouse initially for fade in
    introState: 'Loading', // State machine for intro animations -see description below
    blackHoleState: 'Stars Out', // State machine for blackhole
  });

  // The intro animation uses a state machine passed inside the mouse.introState ref above.  It executes the following sequence:
  // 1. Loading - SpinnerFade Component visible which displays the loading spinner.
  // 2. Text Loaded / Boxes Loaded - These states wait in parallel.  useEffects inside of both LogoBoxes and HeaderText components wait until they are both mounted and then update state.
  // 3. Text and Boxes Loaded - At this point the resources are loaded so the animations begin.  HeaderText updates the isLoading ref which is consumed by SpinnerFade and fades/unmounts the loading spinner.  At the same time, it triggers the names/titles to fade in.
  // 4. Name Loaded - HeaderText checks the opacity fade in of the name and once it's fully faded in updates the state.  This triggers LogoBoxes to begin the box assemble animation.  It also triggers StarsAnimated to fade the stars in.
  // 5. Boxes Assembled - LogoBoxes checks the positions of the boxes and updates to this state when boxes are fully assembled.  This triggers HeaderText to fade in the instructions.
  // 6. Done - HeaderText checks that the instructions are fully faded in and then updates the state as done.  This triggers this component (ThreeViewer) to unlock the mouse.

  const deadZone = 75; // Space at center of screen where mouse movements don't effect animations

  // Scaling must be processed within canvas by passing to ThreeScale component, then passed back using this ref for mouse processing, otherwise canvas is rerendered.
  const scaleRef = useRef({
    windowHalfX: 0, // Screen width / 2
    windowHalfY: 0, // Screen height / 2
    blackHoleZoneShifted: 0, // Blackhole Zone
    mouseXScale: 0,
    mouseYScale: 0,
    mouseXLeftLinScale: 0,
    mouseXRightLinScale: 0,
    mouseXRightLogScale: 0,
  });

  // Process mouse and touchscreen movements
  const handleMouseAndTouch = useCallback((event) => {
    let mouseX, mouseY;

    // Import scaling functions from ThreeScale component
    const {
      windowHalfX,
      windowHalfY,
      blackHoleZoneShifted,
      mouseXScale,
      mouseYScale,
      mouseXLeftLinScale,
      mouseXRightLinScale,
      mouseXRightLogScale,
    } = scaleRef.current;

    // Detect if mouse event or touchscreen event
    const eventType = event.nativeEvent.type;
    if (eventType === 'mousemove') {
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
    } else if (eventType === 'touchmove') {
      event.preventDefault();
      const touch = event.touches[0];
      mouseX = touch.clientX - windowHalfX;
      mouseY = touch.clientY - windowHalfY;
    }

    // Determine if mouse x position is in deadzone
    let inDeadZone = true; // true if mouse x in center of screen
    if (mouseX <= deadZone && mouseX >= -1 * deadZone) {
      inDeadZone = true;
    } else {
      inDeadZone = false;
    }

    // Determine if mouse x position is in blackhole zone
    let inBlackHoleZone; // true if mouse x on left edge of screen
    if (mouseX <= blackHoleZoneShifted) {
      inBlackHoleZone = true;
    } else {
      inBlackHoleZone = false;
    }

    // Determine which side of screen mouse is on
    let isLeftOrRight = false; // false if mouse on left, true if right
    isLeftOrRight = mouseX < 0 ? false : true;

    // Unlock mouse when intro animations are complete
    if (mouse.current.introState === 'Done') {
      mouse.current.disableMouse = false;
    }

    // Update mouse ref, use try/catch in case ThreeScale component hasn't created scaling functions yet.
    try {
      // Update mouse ref
      mouse.current = {
        mouseX: mouseX,
        mouseY: mouseY,
        mouseXScaled: mouseXScale(mouseX),
        mouseYScaled: mouseYScale(mouseY),
        mouseXLeftLin: mouseXLeftLinScale(mouseX),
        mouseXRightLin: mouseXRightLinScale(mouseX),
        mouseXLeftLog: 0,
        mouseXRightLog: mouseXRightLogScale(mouseX),
        inDeadZone: inDeadZone,
        inBlackHoleZone: inBlackHoleZone,
        isLeftOrRight: isLeftOrRight,
        disableMouse: mouse.current.disableMouse,
        introState: mouse.current.introState,
        blackHoleState: mouse.current.blackHoleState,
      };
    } catch (err) {
      // Error ok as intro animation state machine handles race conditions
    }
  }, []);

  return (
    <>
      <Suspense fallback={<HomeFallback />}>
        <Canvas         
          gl={{ antialias: false, alpha: true }}
          camera={{ position: [0, 0, 40] }}
          onCreated={({ gl }) => gl.setClearColor('#1D1D1D')}
          onMouseMove={handleMouseAndTouch}
          onTouchMove={handleMouseAndTouch}
          onTouchStart={(e) => e.preventDefault()}
          onTouchEnd={(e) => e.preventDefault()}
          onTouchCancel={(e) => e.preventDefault()}
          pixelRatio={window.devicePixelRatio * 1.5}          
        >
          <Lights mouse={mouse} graphics={graphics} />         
          <ThreeScale
            scaleRef={scaleRef}
            deadZone={deadZone}
            mouse={mouse}
            graphics={graphics}
            isLoading={isLoading}
          />
          <Stats showPanel={1} />
        </Canvas>        
      </Suspense>
    </>
  );
}
