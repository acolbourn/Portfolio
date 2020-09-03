import React from 'react';
import HomeFallback from './HomeFallback';
import WEBGL from './3dAnimations/webGLCheck';
import GetFPS from './3dAnimations/GetFPS';
import ThreeViewer from './3dAnimations/ThreeViewer';
import useStyles from './styles/HomeStyles';

export default function Home() {
  console.log('Home rendered');
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
      {/* check fps and display graphics option menu */}
      <GetFPS handleGraphicsChange={handleGraphicsChange} graphics={graphics} />
      {content}
    </div>
  );
}
