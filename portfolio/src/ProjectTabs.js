import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ProjectCard from './ProjectCard';
import { roboticsProjects, webProjects } from './constants';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'center',
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function ProjectTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

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
          aria-label='full width tabs example'
        >
          <Tab label='Robotics' {...a11yProps(0)} />
          <Tab label='Web Development' {...a11yProps(1)} />
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
            {roboticsProjects.map((project, index) => (
              <Grid
                item
                // xs={12}
                // sm={6}
                key={index}
                className={classes.gridItem}
              >
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  imgSrc={project.imgSrc}
                  imgAlt={project.imgAlt}
                  title={project.title}
                  description={project.description}
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
            justify='space-evenly'
            alignItems='center'
          >
            {webProjects.map((project, index) => (
              <Grid
                item
                // xs={12}
                // sm={6}
                key={index}
                className={classes.gridItem}
              >
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  imgSrc={project.imgSrc}
                  imgAlt={project.imgAlt}
                  title={project.title}
                  description={project.description}
                />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
