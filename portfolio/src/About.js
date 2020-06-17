import React from 'react';
import { Typography } from '@material-ui/core';
import Timeline from './Timeline';

export default function About() {
  return (
    <div>
      <h1>About Me</h1>
      <Typography paragraph variant='body1'>
        Engineer and tinkerer to my core. While I love designing parts or
        breaking out the soldering iron, writing the software that makes a
        project come to life has always been my favorite part. For this reason,
        I'm transitioning towards primarily software related roles going
        forward. I'm interested in all aspects of the internet, robotics, and
        the overlap between them.
      </Typography>
      <Typography paragraph variant='body1'>
        I'm a creative problem solver and independent employee, with a proven
        track record of finishing complex projects on schedule.
      </Typography>
      <Typography paragraph variant='body1'>
        Outside of work you'll find me making music, hiking, or flying planes
        again if you pay me enough.
      </Typography>
      <Timeline />
    </div>
  );
}
