import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    width: '100%',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  timelineBox: {
    display: 'flex',
    width: '95%',
    height: '150px',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'flex-end',
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
  jobLineBox: {
    width: '100%',
    height: '5px',
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: '-20px',
  },
  jobLine1: {
    height: '100%',
    width: '50%',
  },
  jobLine2: {
    height: '100%',
    width: '50%',
  },
  jobText: {
    position: 'absolute',
    top: '-80px',
  },
}));

export default function Timeline() {
  const jobs = [
    {
      job: 'UCSB Microfluidics Lab',
      jobTitle: 'Junior Specialist',
      startYear: '2011',
      endYear: '2012',
      color: '#08FDD8',
      overlapTimeline: false,
    },
    {
      job: 'Scifiniti',
      jobTitle: 'Junior Mechanical Engineer',
      startYear: '2012',
      endYear: '2013.5',
      color: '#DD0849',
      overlapTimeline: false,
    },
    {
      job: 'Sycal',
      jobTitle: 'Controls Engineer',
      startYear: '2013.5',
      endYear: '2017.5',
      color: '#08BCFD',
      overlapTimeline: false,
    },
    // {
    //   job: 'Freelance/Self Employed',
    //   jobTitle: 'Controls Engineer, Mechanical Design',
    //   startYear: '2015.5',
    //   endYear: '2017.5',
    //   color: '#D26CD5',
    //   overlapTimeline: true,
    // },
    {
      job: 'NYU Robotics Masters',
      jobTitle: 'Student',
      startYear: '2017.5',
      endYear: '2019.5',
      color: '#96bb7c',
      overlapTimeline: false,
    },
    {
      job: 'Coding Bootcamps',
      jobTitle: 'Student',
      startYear: '2019.5',
      endYear: 'current',
      color: '#FFF600',
      overlapTimeline: false,
    },
  ];
  const classes = useStyles();
  const startYear = 2011;
  const endYear = 2021;
  const years = calculateYears(startYear, endYear);
  const timeline = generateTimeline(jobs);

  return (
    <div className={classes.root}>
      <div className={classes.timelineBox}>
        {timeline.map((section) => {
          const {
            year,
            firstHalfColor,
            secondHalfColor,
            firstHalfJob,
          } = section;
          return (
            <div key={year} className={classes.yearBox}>
              <div className={classes.line}></div>
              <div className={classes.jobLineBox}>
                <div
                  className={classes.jobLine1}
                  style={{ backgroundColor: firstHalfColor }}
                ></div>
                <div
                  className={classes.jobLine2}
                  style={{ backgroundColor: secondHalfColor }}
                ></div>
              </div>
              <div className={classes.tick}></div>
              <div className={classes.year}>{year}</div>
              <div className={classes.jobText}>{firstHalfJob}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function generateTimeline(jobs) {
  let timeline = [];
  const startYear = Math.floor(parseFloat(jobs[0].startYear));
  const date = new Date();
  const endYear = date.getFullYear();
  const endMonth = date.getMonth();
  const years = calculateYears(startYear, endYear);

  years.forEach((year) => {
    let yearData = {
      year: year,
      firstHalfJob: '',
      firstHalfJobTitle: '',
      secondHalfJob: '',
      secondHalfJobTitle: '',
      firstHalfColor: '',
      secondHalfColor: '',
    };
    jobs.forEach((job) => {
      const start = parseFloat(job.startYear);
      let end;
      if (job.endYear === 'current') {
        if (endMonth > 2 && endMonth < 8) {
          end = endYear + 0.5;
        } else if (endMonth >= 8) {
          end = endYear + 1;
        }
      } else {
        end = parseFloat(job.endYear);
      }

      if (start <= year && end >= year + 0.5 && start < year + 0.5) {
        yearData = {
          ...yearData,
          year: year,
          firstHalfJob: job.job,
          firstHalfJobTitle: job.jobTitle,
          firstHalfColor: job.color,
        };
      }
      if (start <= year + 0.5 && end >= year + 1 && start < year + 1) {
        yearData = {
          ...yearData,
          year: year,
          secondHalfJob: job.job,
          secondHalfJobTitle: job.jobTitle,
          secondHalfColor: job.color,
        };
      }
    });
    timeline.push(yearData);
  });
  console.log(timeline);
  return timeline;
}

function calculateYears(startYear, endYear) {
  let years = [];
  let currentYear = startYear;
  while (currentYear <= endYear) {
    years.push(currentYear);
    currentYear++;
  }
  return years;
}
