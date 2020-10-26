import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Timeline from './Timeline';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%', 
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    fontFamily: 'AvenirNextCyr, ProximaNova, sans-serif',
    fontWeight: '400' 
    
  },  
  paperCustom: {
    backgroundColor: theme.colors.background,
    border: '1px solid',
    borderColor: theme.colors.fadedBlue,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },  
  rightContainer: {    
    flex: '50%', 
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column'
  },
  topRightContainer: {
    flex: '50%',
    paddingBottom: theme.spacing(1),
  },
  bottomRightContainer: {
    flex: '50%',
    paddingTop: theme.spacing(1),
  },
  leftContainer: {  
    flex: '50%',    
    padding: theme.spacing(2),    
    paddingRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(2)
    },    
    display: 'flex',
    flexDirection: 'column'
  },
  topLeftContainer: {
    flex: '50%',
    paddingBottom: theme.spacing(1),
  },
  bottomLeftContainer: {
    flex: '50%',
    paddingTop: theme.spacing(1),
  },  
  title: {
    color: theme.colors.primary,
    fontFamily: 'AvenirNextCyr, ProximaNova, sans-serif',
    fontWeight: '300'
  },
  content: {
    flex: 1,    
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '16px 16px 0 16px',
    '& .MuiTypography-root': {
      fontFamily: 'AvenirNextCyr, ProximaNova, sans-serif',
      fontWeight: '400'
    }    
  },
  skillGroupBox: {
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'space-around'
  },
  skillBox: {
    whiteSpace: 'nowrap',
    flex: 1,
    margin: '8px',
  }
}));

export default function AboutNew() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const webSkills = ['JavaScript', 'Python', 'React', 'HTML 5', 'CSS 3', 'WebGL', 'Three.js', 'D3.js', 'Node', 'Express', 'MongoDB', 'MERN Stack', 'Git'];
  const roboticsSkills = ['Robot Operating System (ROS)', 'Gazebo', 'LabVIEW', 'Python', 'Microcontrollers', "Programmable Logic Controllers (PLC's)", 'Raspberry Pi', 'Arduino', 'AutoCAD', 'SolidWorks', 'Mechanical Design', '3d Printing', 'Electrical Schematics'];

  const webSkillsGroup = webSkills.map(skill => (
    <div key={skill} className={classes.skillBox}>
      <h4>{skill}</h4> 
    </div>
  ))

  const rightContainer = (
    <div className={classes.rightContainer}>
          <div className={classes.topRightContainer}>
            <Paper classes={{root: classes.paperCustom}}>
              <Typography className={classes.title} variant='h3' gutterBottom>
                Web Skills
              </Typography>
              <Divider variant="middle" />
              <div className={classes.content}>
                <div className={classes.skillGroupBox}>
                  {webSkillsGroup}
                </div>
              </div>
            </Paper>
          </div>
          <div className={classes.bottomRightContainer}>
            <Paper classes={{root: classes.paperCustom}}>
              <Typography className={classes.title} variant='h3' gutterBottom>
                Robotics Skills
              </Typography>
              <Divider variant="middle" />
              <div className={classes.content}>
                <Typography paragraph variant='body1'>
                  ROS
                </Typography>
              </div>
            </Paper>
          </div>
        </div>       
  )

  return (
    <div className={classes.root}>
        <div className={classes.leftContainer}>
          <div className={classes.topLeftContainer}>
            <Paper classes={{root: classes.paperCustom}}>
                <Typography className={classes.title} variant='h3' gutterBottom>
                  About Me
                </Typography>
                <Divider variant="middle" />
                  <div className={classes.content}>
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
                    <Typography paragraph variant='body1' gutterBottom={false}>
                      Outside of work you'll find me making music, hiking, biking, or
                      flying planes again if you pay me enough.
                    </Typography>
                  </div>
              </Paper>
            </div>
            <div className={classes.bottomLeftContainer}>
              <Paper classes={{root: classes.paperCustom}}>
                <Typography className={classes.title} variant='h3' gutterBottom>
                  Timeline
                </Typography>
                <Divider variant="middle" />
                <div className={classes.content}>
                  <Timeline />
                </div>
              </Paper>
            </div>
          </div>
         {!isMobile? rightContainer : null}
    </div>
  );
}
