import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ClassesCard from './ClassesCard';
import { codingClasses } from './constants';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function Classes() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        spacing={3}
      >
        {codingClasses.map((codingClass, idx) => (
          <Grid key={idx} item>
            <ClassesCard codingClass={codingClass} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
