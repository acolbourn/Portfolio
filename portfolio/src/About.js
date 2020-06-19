import React from 'react';
import { Typography } from '@material-ui/core';
import Timeline from './Timeline';

export default function About() {
  return (
    <div>
      <h1>About Me</h1>
      <Typography paragraph variant='body1'>
        Engineer and tinkerer to my core. While I love designing parts or
        breaking out the soldering iron, writing the software that brings a
        project to life has always been my favorite phase of a project. For this
        reason, I'm currently transitioning towards primarily software focused
        roles going forward.
      </Typography>
      <Typography paragraph variant='body1'>
        I'm interested in all aspects of the internet, robotics, and the overlap
        between them. I'm focused on Frontend and React at the moment, but I'm
        very interested in all Backend, Fullstack, and Robotics software
        opportunities as well.
      </Typography>
      <Typography paragraph variant='body1'>
        Outside of work you'll find me making music, hiking, biking, or flying
        planes again if you pay me enough.
      </Typography>
      <Timeline />
    </div>
  );
}
