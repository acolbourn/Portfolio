import React, { useRef, useState } from 'react';
import GetFPS from '.././3dAnimations/GetFPS';
import SpinnerFade from '.././3dAnimations/SpinnerFade';
import ThreeViewer from '.././3dAnimations/ThreeViewer';
import WEBGL from '.././3dAnimations/webGLCheck';
import HomeFallback from './HomeFallback';
import useStyles from './styles/HomeStyles';

export default function Home() {
  const classes = useStyles();
  const [graphics, setGraphics] = useState('high');
  const handleGraphicsChange = (value) => {
    setGraphics(value);
  };
  // Loading Spinner ref - useRef instead of useState so canvas doesn't re-render.
  const isLoading = useRef(true);
  let content; // Page content depending on graphics capability

  // Check for webGL compatibility, then render 3d or 2d version
  if (WEBGL.isWebGLAvailable() && graphics !== 'bad') {
    content = (
      <div className={classes.threeViewport}>
        <ThreeViewer graphics={graphics} isLoading={isLoading} />
        <SpinnerFade isLoading={isLoading} />
      </div>
    );
  } else {
    content = <HomeFallback />;
  }

  return (
    <div className={classes.root}>
      {/* check fps and display graphics option menu */}
      <GetFPS handleGraphicsChange={handleGraphicsChange} graphics={graphics} />
      {content}
    </div>
  );
}
