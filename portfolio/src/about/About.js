import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';
import AboutSkills from './AboutSkills';
import { roboticsSkills, webSkills } from './constants';
import useStyles from './styles/AboutStyles';
import Timeline from './Timeline';

export default function About() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={classes.root}>
      <div className={`${classes.gridItem} ${classes.about}`}>
        <Typography className={classes.title} variant='h4' gutterBottom>
          About Me
        </Typography>
        <Divider variant='middle' />
        <div className={classes.content}>
          <div className={classes.aboutText}>
            <Typography paragraph variant='body1'>
              Engineer and tinkerer to my core. While I love designing parts or
              breaking out the soldering iron, writing the software that brings
              a project to life has always been my favorite phase of a project.
              This is why I'm transitioning into primarily software focused
              roles going forward.
            </Typography>
            <Typography paragraph variant='body1'>
              I'm interested in all aspects of the internet, robotics, and the
              overlap between them. I'm currently focused on Frontend with
              React, but I'm very interested in all Backend, Fullstack, and
              Robotics software opportunities as well.
            </Typography>
            <Typography
              paragraph
              variant='body1'
              className={classes.lastParagraph}
            >
              Outside of work you'll find me making music, hiking, biking, or
              flying small planes.
            </Typography>
          </div>
        </div>
      </div>
      <div className={`${classes.gridItem} ${classes.timeline}`}>
        <Typography className={classes.title} variant='h4' gutterBottom>
          Timeline
        </Typography>
        <Divider variant='middle' />
        <div className={classes.content}>
          <Timeline />
        </div>
      </div>
      <AboutSkills
        skills={webSkills}
        title={'Web Skills'}
        classes={classes}
        classType={'webSkills'}
        isMobile={isMobile}
      />
      <AboutSkills
        skills={roboticsSkills}
        title={'Robotics Skills'}
        classes={classes}
        classType={'roboticsSkills'}
        isMobile={isMobile}
      />
    </div>
  );
}
