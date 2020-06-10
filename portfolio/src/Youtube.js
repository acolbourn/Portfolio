import React from 'react';
import ReactPlayer from 'react-player';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Carousel from 'react-material-ui-carousel';

const useStyles = makeStyles(() => ({
  root: {
    paddingBottom: '10px',
    '& div:nth-child(2)': {
      height: '48px',
      right: 'calc(50% - 120px)',
      top: 'calc(100% - 59px)',
      '& button': {
        top: 0,
      },
    },
    '& div:nth-child(3)': {
      height: '48px',
      left: 'calc(50% - 120px)',
      top: 'calc(100% - 59px)',
      '& button': {
        top: 0,
      },
    },
    '& div:nth-child(4)': {
      padding: '20px',
    },
  },
  carouselPaper: {
    width: '100% !important',
    textAlign: 'center',
  },
  singleVidPaper: {
    width: '100% !important',
    textAlign: 'center',
    marginBottom: '16px',
  },
  playerContainer: {
    position: 'relative',
    paddingTop: '56.25%' /* Player ratio: 100 / (1280 / 720) */,
  },
  youtube: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  vidDescription: {
    padding: '0.75rem',
  },
}));

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
