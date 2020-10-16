import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import ProjectCard from './ProjectCard';
import { a11yProps, TabPanel } from './ProjectHelpers';
import useStyles from './styles/ProjectStyles';
import { roboticsProjects, webProjects } from './constants';

export default function Projects() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'          
          textColor='primary'
          variant='fullWidth'
          aria-label='full width tabs'  
          classes={{indicator: classes.customIndicator, root: classes.customFont }}        
        >
          <Tab label='Robotics' {...a11yProps(0)} />
          <Tab label={isMobile ? 'Web' : 'Web Development'} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        className={classes.swipeContainer}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Grid
            container
            spacing={3}
            direction='row'
            justify='center'
            alignItems='center'
          >
            {roboticsProjects.map((project, idx) => (
              <Grid item key={idx} xs={12} sm={6} md={4}>
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  project={project}
                />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Grid
            container
            spacing={3}
            direction='row'
            justify='center'
            alignItems='center'
          >
            {webProjects.map((project, idx) => (
              <Grid item key={idx} xs={12} sm={6} md={4}>
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  project={project}
                />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
