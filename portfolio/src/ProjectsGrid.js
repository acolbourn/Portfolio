import React, { useState } from 'react';
// import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { AnimateSharedLayout, motion } from 'framer-motion';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
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
  },
  gridContainer: {
    flex: 1,
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
    gridAutoRows: 'minmax(10px, auto)',
    gap: '1em',
    padding: '1em',
    margin: 0,
  },
  card: {
    backgroundColor: theme.colors.secondary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioGroup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    '& .MuiFormGroup-root': {
      flexDirection: 'row',
    },
  },
}));

export default function ProjectsGrid() {
  const classes = useStyles();
  // const theme = useTheme();
  const [value, setValue] = useState('all');
  const [projects, setProjects] = useState(
    webProjects.concat(roboticsProjects)
  );

  const handleFilterChange = (event) => {
    const selection = event.target.value;
    setValue(selection);
    if (selection === 'all') {
      setProjects(webProjects.concat(roboticsProjects));
    } else if (selection === 'web') {
      setProjects(webProjects);
    } else if (selection === 'robotics') {
      setProjects(roboticsProjects);
    }
  };
  //   const [projects, setProjects] = useState(['1', '2', '3', '4', '5', '6']);

  //   const handleFilterChange = (event) => {
  //     const selection = event.target.value;
  //     setValue(selection);
  //     if (selection === 'all') {
  //       setProjects(['1', '2', '3', '4', '5', '6']);
  //     } else if (selection === 'web') {
  //       setProjects(['1', '2', '3']);
  //     } else if (selection === 'robotics') {
  //       setProjects(['4', '5', '6']);
  //     }
  //   };

  return (
    <div className={classes.root}>
      <div className={classes.radioGroup}>
        <FormControl component='fieldset'>
          {/* <FormLabel component='legend'>Filter Projects:</FormLabel> */}
          <RadioGroup
            aria-label='filter'
            name='filter'
            value={value}
            onChange={handleFilterChange}
          >
            <FormControlLabel value='all' control={<Radio />} label='All' />
            <FormControlLabel value='web' control={<Radio />} label='Web' />
            <FormControlLabel
              value='robotics'
              control={<Radio />}
              label='Robotics'
            />
          </RadioGroup>
        </FormControl>
      </div>
      <AnimateSharedLayout>
        <motion.ul layout className={classes.gridContainer}>
          {projects.map((project, idx) => (
            <motion.li layout className={classes.card} key={project.id}>
              <ProjectCard id={project.id} project={project} />
            </motion.li>
          ))}
          {/* {projects.map((project) => {
            return (
              <motion.li layout className={classes.card} key={project}>
                <h1>{project}</h1>
              </motion.li>
            );
          })} */}
        </motion.ul>
      </AnimateSharedLayout>
    </div>
  );
}
