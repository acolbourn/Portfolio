import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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
        {codingClasses.map((cls, idx) => (
          <Grid key={idx} item>
            <ClassesCard {...cls} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
