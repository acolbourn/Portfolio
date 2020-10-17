import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%', 
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',   
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '100%',
    height: '100%',
  },
  leftContainer: {    
    flex: '50%',    
    padding: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  rightContainer: {    
    flex: '50%', 
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(1)
  }
}));

export default function AboutNew() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <div className={classes.leftContainer}>
          <Paper className={classes.paper}>Left</Paper>
        </div>
        <div className={classes.rightContainer}>
          <Paper className={classes.paper}>Right</Paper>
        </div>        
    </div>
  );
}
