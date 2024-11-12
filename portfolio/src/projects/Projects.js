import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { AnimateSharedLayout, motion } from 'framer-motion';
import React, { useState } from 'react';
import { roboticsProjects, webProjects } from './constants';
import ProjectCard from './ProjectCard';
import useStyles from './styles/ProjectsStyles';

export default function Projects() {
  const classes = useStyles();
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
      <AnimateSharedLayout>
        <motion.ul layout className={classes.cardGrid}>
          <motion.div layout className={classes.buttonGroup}>
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
          </motion.div>
          {projects.map((project) => (
            <motion.li layout className={classes.card} key={project.id}>
              <ProjectCard id={project.id} project={project} />
            </motion.li>
          ))}
        </motion.ul>
      </AnimateSharedLayout>
    </div>
  );
}
