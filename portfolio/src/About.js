import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Timeline from './Timeline';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  aboutContainer: {
    flexGrow: 2,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    maxWidth: '960px',
  },
  sideContainer: {
    flexGrow: 1,
    backgroundColor: 'grey',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  DELETETHIS: {
    width: '100%',
  },
  contentContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  content: {
    width: '90%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    color: theme.colors.primary,
    marginLeft: '15px',
    fontSize: '73px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '54px',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '20px',
      marginLeft: 0,
      fontSize: '44px',
    },
    '@media (max-height: 800px)': {
      fontSize: '44px',
    },
  },
  textArea: {
    marginTop: '50px',
    marginLeft: '15px',
    [theme.breakpoints.down('xs')]: {
      margin: '10px 0',
    },
    '@media (max-height: 800px)': {
      margin: '10px 0',
    },
  },
}));

export default function About() {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <div className={classes.root}>
      <div className={classes.aboutContainer}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <div>
              <h1 className={classes.title}>About Me</h1>
            </div>
            <div className={classes.textArea}>
              <Typography paragraph variant='body1'>
                Engineer and tinkerer to my core. While I love designing parts
                or breaking out the soldering iron, writing the software that
                brings a project to life has always been my favorite phase of a
                project. This is why I'm transitioning into
                primarily software focused roles going forward.
              </Typography>
              <Typography paragraph variant='body1'>
                I'm interested in all aspects of the internet, robotics, and the
                overlap between them. I'm focused on Frontend and React at the
                moment, but I'm very interested in all Backend, Fullstack, and
                Robotics software opportunities as well.
              </Typography>
              <Typography paragraph variant='body1'>
                Outside of work you'll find me making music, hiking, biking, or
                flying planes again if you pay me enough.
              </Typography>
            </div>
            <Timeline />
          </div>
        </div>
      </div>
      {isDesktop && (
        <div className={classes.sideContainer}>
          <img
            className={classes.DELETETHIS}
            src='./images/optimized/c3p0.jpg'
            alt='c3p0'
          />
        </div>
      )}
    </div>
  );
}
