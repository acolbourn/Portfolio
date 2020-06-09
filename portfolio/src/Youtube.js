import React from 'react';
import ReactPlayer from 'react-player';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Carousel from 'react-material-ui-carousel';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  carouselItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // youtube: {
  //   width: '100%',
  // },
}));

export default function Youtube({ youtube }) {
  const classes = useStyles();
  // const robotVideos = [
  //   'vD6ngnMxDQM',
  //   'Vt46-e4vAJM',
  //   'H3HIfaRytCg',
  //   'Fu9YxBRYT_E',
  // ];
  //   const hackathonVideos = ['uWXcr1ekypU', 'WZ6fewjkqo4'];
  return (
    <Carousel
      autoPlay={false}
      navButtonsAlwaysVisible={false}
      fullHeightHover={true}
      className={classes.root}
    >
      {youtube.map((video) => (
        <Paper className={classes.carouselItem}>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${video.vidLink}`}
            playing
            controls={true}
            volume={0}
            muted
            width='100%'
            className={classes.youtube}
          />
          <Typography variant='body1'>{video.vidDesc}</Typography>
        </Paper>
      ))}
    </Carousel>
  );
}
