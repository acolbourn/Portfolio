import React from 'react';
import Logo from './Logo';
import useStyles from './styles/HomeFallbackStyles';

export default function HomeFallback() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.name}>Alex Colbourn</div>
      <div className={classes.titles}>Web Developer / Robotics Engineer</div>
      <div className={classes.logo}>
        <Logo />
      </div>
    </div>
  );
}
