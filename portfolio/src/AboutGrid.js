import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Timeline from './Timeline';
import AboutSkills from './AboutSkills';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%', 
    fontFamily: 'AvenirNextCyr, ProximaNova, sans-serif',
    fontWeight: '400',
    display: 'grid',
    gridTemplateRows: 'repeat(2, minmax(min-content, 50%))',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateAreas: `
            'about webSkills'
            'timeline roboticsSkills'
        `,
    [theme.breakpoints.down('md')]: {
        gridTemplateRows: 'repeat(3, minmax(min-content, 33%))',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateAreas: `
                'about webSkills'
                'about roboticsSkills'
                'timeline timeline'
            `
    },
    [theme.breakpoints.down('sm')]: {
        gridTemplateRows: 'repeat(2, minmax(min-content, 50%))',
        gridTemplateColumns: '1fr',
        gridTemplateAreas: `
                'about'
                'timeline'
            `
    },
    gap: '16px',
    padding: '16px',
    [theme.breakpoints.down('md')]: {
      gap: '10px',
      padding: '10px',
    },
    '@media (max-height: 750px)': {
      gap: '10px',
      padding: '10px',
    },        
  },  
  gridItem: {
    backgroundColor: theme.colors.background,
    border: '1px solid',
    borderRadius: '4px',
    borderColor: theme.colors.fadedBlue,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    [theme.breakpoints.down('md')]: {
      padding: '10px',
    },
    '@media (max-height: 750px)': {
      padding: '10px',
    },
    [theme.breakpoints.down('xs')]: {      
      paddingBottom: '20px',
    },
  },
  about: {
      gridArea: 'about',
      fontSize: '1rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '0.8rem',
    },
    [theme.breakpoints.down('xs')]: {      
      fontSize: '0.8rem',
    },
    '@media (max-height: 890px)': {
      fontSize: '0.7rem',
    },
  },
  timeline: {
      gridArea: 'timeline',
  },
  webSkills: {
      gridArea: 'webSkills',
  },
  roboticsSkills: {
      gridArea: 'roboticsSkills',
  },
  title: {
    color: theme.colors.primary,
    fontFamily: 'AvenirNextCyr, ProximaNova, sans-serif',
    fontWeight: '300',
    fontSize: '42px',
    [theme.breakpoints.down('md')]: {
      fontSize: '35px',
      '@media (max-height: 890px)': {
        fontSize: '25px',
      },
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '35px',      
    },
    [theme.breakpoints.down('xs')]: {      
      fontSize: '35px',
    },
    '@media (max-height: 750px)': {
      fontSize: '25px',
    },   
  },
  content: {
    flex: 1,    
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '16px 16px 0 16px',
    [theme.breakpoints.down('md')]: {
      margin: '8px 16px 0 16px',
    },
    '& .MuiTypography-root': {
      fontFamily: 'AvenirNextCyr, ProximaNova, sans-serif',
      fontWeight: '400'
    },
    '& .MuiTypography-body1': {
      fontSize: '1rem',
      [theme.breakpoints.down('md')]: {
        fontSize: '0.9rem',      
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',      
      },
    }    
  },
  skillGroupBox: {
    height: '100%',
    width: '100%',
    display: 'grid',  
    gridTemplateRows: 'repeat(3, minmax(min-content, 33%))',
    gridTemplateColumns: 'repeat(4, 1fr)', 
    gap: '4px', 
    justifyItems: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    alignContent: 'space-around',      
  },
  skillBox: {      
    margin: 0,
    backgroundColor: '#303030',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', 
    fontSize: '40px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '35px',      
    },
  }, 
}));

export default function AboutGrid() {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const webSkills = ['JavaScript', 'Python', 'React', 'HTML 5', 'CSS 3', 'WebGL', 'Three.js', 'D3.js', 'Node', 'Express', 'MongoDB', 'Git'];
    const roboticsSkills = ['ROS', 'Gazebo', 'LabVIEW', "PLC's", 'Microcontrollers', 'Arduino', 'Raspberry Pi','AutoCAD', 'SolidWorks', 'Mechanical Design', '3d Printing', 'Electrical Schematics'];    

    return (
        <div className={classes.root}>
            <div className={`${classes.gridItem} ${classes.about}`}>
                <Typography className={classes.title} variant='h4' gutterBottom>
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
                    <Typography paragraph variant='body1' style={{marginBottom: '2px'}}>
                      Outside of work you'll find me making music, hiking, biking, or
                      flying planes again if you pay me enough.
                    </Typography>
                  </div>
            </div>
            <div className={`${classes.gridItem} ${classes.timeline}`}>
                <Typography className={classes.title} variant='h4' gutterBottom>
                  Timeline
                </Typography>
                <Divider variant="middle" />
                <div className={classes.content}>
                  <Timeline />
                </div>
            </div>
            <AboutSkills skills={webSkills} title={'Web Skills'} classes={classes} className={'webSkills'} isMobile={isMobile} />
            <AboutSkills skills={roboticsSkills} title={'Robotics Skills'} classes={classes} className={'roboticsSkills'} isMobile={isMobile} />            
        </div>
    )
}
