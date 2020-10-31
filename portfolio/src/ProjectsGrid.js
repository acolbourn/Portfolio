import React, { useState } from 'react';
// import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { AnimateSharedLayout, motion } from 'framer-motion';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ProjectCard from './ProjectCard';
import { roboticsProjects, webProjects } from './constants';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    fontFamily: 'AvenirNextCyr, ProximaNova, sans-serif',
    fontWeight: '400',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    flex: 1,
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 375px))',
    gridAutoRows: 'min-content',
    justifyContent: 'center',
    gap: '2em',
    padding: '2em',
    margin: 0,
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioGroup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '2em',
    '& .MuiToggleButton-root': {
      width: '200px',
    },
  },
}));

export default function ProjectsGrid() {
  const classes = useStyles();
  // const theme = useTheme();
  const [filterValue, setFilterValue] = useState('all');
  const combinedProjects = roboticsProjects.concat(webProjects);
  const [projects, setProjects] = useState(combinedProjects);

  const handleFilterChange = (event, selection) => {
    setFilterValue(selection);
    if (selection === 'all') {
      setProjects(combinedProjects);
    } else if (selection === 'web') {
      setProjects(webProjects);
    } else if (selection === 'robotics') {
      setProjects(roboticsProjects);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.radioGroup}>
        <ToggleButtonGroup
          value={filterValue}
          exclusive
          onChange={handleFilterChange}
          aria-label='filter'
        >
          <ToggleButton value='all' aria-label='all'>
            All
          </ToggleButton>
          <ToggleButton value='web' aria-label='web'>
            Web
          </ToggleButton>
          <ToggleButton value='robotics' aria-label='robotics'>
            Robotics
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <AnimateSharedLayout>
        <motion.ul layout className={classes.gridContainer}>
          {projects.map((project, idx) => (
            <motion.li layout className={classes.card} key={project.id}>
              <ProjectCard id={project.id} project={project} />
            </motion.li>
          ))}
        </motion.ul>
      </AnimateSharedLayout>
    </div>
  );
}
