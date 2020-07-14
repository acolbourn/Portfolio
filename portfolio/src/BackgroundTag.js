import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    fontSize: '18px',
    fontFamily: 'La Belle Aurore, cursive',
    color: '#515152',
  },
  header: {
    marginTop: '1rem',
  },
  footer: {
    marginTop: '1rem',
    position: 'absolute',
    bottom: '5px',
  },
  indentLevel0: {
    marginLeft: '10px',
  },
  indentLevel1: {
    marginLeft: '35px',
  },
  h1Tag: {
    marginTop: '0.35rem',
    marginBottom: '0.35rem',
  },
});

export default function BackgroundTag({ tagType, isMobile }) {
  const classes = useStyles();

  let tag;
  if (tagType === 'header') {
    tag = (
      <div className={classes.header}>
        <div className={classes.indentLevel1}>{'<body>'}</div>
      </div>
    );
  } else if (tagType === 'footer') {
    tag = (
      <div className={classes.footer}>
        <div className={classes.indentLevel1}>{'</body>'}</div>
        <div className={classes.indentLevel0}>{'</html>'}</div>
      </div>
    );
  } else if (tagType === 'h1Top') {
    tag = <div className={classes.h1Tag}>{'<h1>'}</div>;
  } else if (tagType === 'h1Bottom') {
    tag = <div className={classes.h1Tag}>{'</h1>'}</div>;
  } else {
    tag = null;
  }

  return isMobile ? null : <div className={classes.root}>{tag}</div>;
}
