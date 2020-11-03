import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Timeline from './Timeline';
import AboutSkills from './AboutSkills';
import useStyles from './styles/AboutStyles';

export default function About() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const webSkills = [
    'JavaScript',
    'Python',
    'React',
    'HTML 5',
    'CSS 3',
    'Node',
    'Express',
    'MongoDB',
    'WebGL',
    'Three.js',
    'D3.js',
    'Git',
  ];
  const roboticsSkills = [
    'ROS',
    'Gazebo',
    'LabVIEW',
    "PLC's",
    "MCU's",
    'Arduino',
    'Raspberry Pi',
    'AutoCAD',
    'SolidWorks',
    'Mechanical Design',
    '3d Printing',
    'Electrical Schematics',
  ];

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
              overlap between them. I'm focused on Frontend and React at the
              moment, but I'm very interested in all Backend, Fullstack, and
              Robotics software opportunities as well.
            </Typography>
            <Typography
              paragraph
              variant='body1'
              className={classes.lastParagraph}
            >
              Outside of work you'll find me making music, hiking, biking, or
              flying planes again if you pay me enough.
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
