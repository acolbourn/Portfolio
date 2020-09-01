import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HomeFallback from './HomeFallback';
import WEBGL from './3dAnimations/webGLCheck';
import GraphicsMenu from './3dAnimations/GraphicsMenu';

// import Logo from './Logo';
import ThreeViewer from './3dAnimations/ThreeViewer';
// import Cannon from './Cannon.js';
// import SwarmViewer from './SwarmViewer';

const useStyles = makeStyles((theme) => ({
  root: {
    // Calcs create a fixed size so canvas is forced to shrink when window is resized
    height: 'calc(100vh - 64px)',
    [theme.breakpoints.down('xs')]: {
      height: 'calc(100vh - 56px)',
    },
    width: '100%',
    margin: 0,
    padding: 0,
    display: 'flex',
    overflow: 'hidden',
  },
  threeViewport: {
    flex: '1 1 auto',
    // Force canvas to not exceed page size and allow its size to go to 0
    minWidth: '0',
    minHeight: '0',
    overflow: 'hidden',
    touchAction: 'none',
  },
}));

export default function Home() {
  const classes = useStyles();
  const [graphics, setGraphics] = React.useState('high');
  const handleGraphicsChange = (event) => {
    setGraphics(event.target.value);
  };
  let content; // Page content depending on graphics capability

  // Check for webGL compatibility, then render 3d or 2d version
  if (WEBGL.isWebGLAvailable() && graphics !== 'bad') {
    content = (
      <div className={classes.threeViewport}>
        <ThreeViewer graphics={graphics} />
      </div>
    );
  } else {
    content = <HomeFallback />;
  }

  return (
    <div className={classes.root}>
      <GraphicsMenu
        handleGraphicsChange={handleGraphicsChange}
        graphics={graphics}
      />
      {content}
    </div>
  );
}
