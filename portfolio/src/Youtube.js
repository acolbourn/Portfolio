import React from 'react';
import ReactPlayer from 'react-player';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Carousel from 'react-material-ui-carousel';
import useStyles from './styles/YoutubeStyles';

export default function Youtube({ youtube }) {
  const classes = useStyles();
  let videoContainer;

  if (youtube.length > 1) {
    videoContainer = (
      <Carousel
        autoPlay={false}
        navButtonsAlwaysVisible={true}
        fullHeightHover={false}
        className={classes.root}
      >
        {youtube.map((video, idx) => (
          <Paper key={idx} className={classes.carouselPaper}>
            <div className={classes.playerContainer}>
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${video.vidLink}`}
                playing
                controls={true}
                volume={0}
                muted
                width='100%'
                height='100%'
                className={classes.youtube}
              />
            </div>
            <Typography variant='body1' className={classes.vidDescription}>
              {video.vidDesc}
            </Typography>
          </Paper>
        ))}
      </Carousel>
    );
  } else {
    videoContainer = (
      <Paper className={classes.singleVidPaper}>
        <div className={classes.playerContainer}>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${youtube[0].vidLink}`}
            playing
            controls={true}
            volume={0}
            muted
            width='100%'
            height='100%'
            className={classes.youtube}
          />
        </div>
        <Typography variant='body1' className={classes.vidDescription}>
          {youtube[0].vidDesc}
        </Typography>
      </Paper>
    );
  }

  return videoContainer;
}
