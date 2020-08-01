import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// import Logo from './Logo';
import ThreeViewer from './ThreeViewer';
// import Cannon from './Cannon.js';
// import SwarmViewer from './SwarmViewer';

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
    margin: 0,
    padding: 0,
    minWidth: '0 !important',
    minHeight: '0 !important',
    display: 'flex',
    // flexDirection: 'column',
    // overflow: 'hidden',
  },
  threeViewport: {
    flex: '1 1 auto',
    // Needed for home page canvas to let the size shrink w/out overflow, must be updated in page body as well
    minWidth: '0 !important',
    minHeight: '0 !important',
    overflow: 'hidden',
  },
});

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.threeViewport}>
        <ThreeViewer />
        {/* <SwarmViewer /> */}
      </div>
    </div>
  );
}
