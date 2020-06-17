import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    width: '100%',
    flexWrap: 'nowrap',
    justifyContent: 'center',
  },
  timelineBox: {
    display: 'flex',
    width: '95%',
    flexWrap: 'nowrap',
    justifyContent: 'center',
  },
  yearBox: {
    // display: 'flex',
    // flexDirection: 'column',
    // width: '10%',
    // border: '1px solid blue',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  line: {
    height: '1px',
    width: '100%',
    backgroundColor: '#444',
  },
  tick: {
    height: '15px',
    width: '2px',
    backgroundColor: '#444',
    position: 'absolute',
  },
  year: {
    color: '#444',
    position: 'absolute',
    top: '10px',
    left: '5px',
  },
}));

export default function Timeline() {
  const classes = useStyles();
  const startYear = 2011;
  const endYear = 2021;
  const years = calculateYears(startYear, endYear);
  console.log(years);

  return (
    <div className={classes.root}>
      <div className={classes.timelineBox}>
        {years.map((year) => (
          <div key={year} className={classes.yearBox}>
            <div className={classes.line}></div>
            <div className={classes.tick}></div>
            <div className={classes.year}>{year}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function calculateYears(startYear, endYear) {
  let years = [];
  let currentYear = startYear;
  while (currentYear < endYear) {
    years.push(currentYear);
    currentYear++;
  }
  return years;
}
