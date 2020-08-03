import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HomeFallback from './HomeFallback';
import WEBGL from './3dAnimations/webGLCheck';

// import Logo from './Logo';
import ThreeViewer from './ThreeViewer';
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
  },
}));

export default function Home() {
  const classes = useStyles();
  let content;

  // Check for webGL compatibility, then render 3d or 2d version
  if (WEBGL.isWebGLAvailable()) {
    content = (
      <div className={classes.threeViewport}>
        <ThreeViewer />
      </div>
    );
  } else {
    content = <HomeFallback />;
  }

  return <div className={classes.root}>{content}</div>;
}
