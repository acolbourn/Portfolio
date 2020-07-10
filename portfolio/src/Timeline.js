import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '200px',
    flexWrap: 'nowrap',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    marginBottom: '6.5rem',
    // backgroundColor: 'green',
  },
  timelineBox: {
    display: 'flex',
    width: '90%',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  jobBoxRoot: {
    width: '90%',
    // height: '5px',
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: '0',
    zIndex: '100',
  },
  overlayBoxRoot: {
    width: '90%',
    // height: '5px',
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: '0',
  },
  jobBox: {
    width: '100%',
    height: '185px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    // backgroundColor: 'blue',
    position: 'relative',
  },
  overlayJobBox: {
    width: '100%',
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    // backgroundColor: 'blue',
    position: 'relative',
  },
  jobLine: {
    height: '5px',
  },
  jobText: {
    textAlign: 'center',
    // backgroundColor: 'red',
    margin: '0 auto 10px',
    [theme.breakpoints.down('xs')]: {
      writingMode: 'vertical-rl',
      transform: 'rotate(180deg)',
      textAlign: 'left',
    },
  },
  jobTitleBox: {
    zIndex: '2000',
    textAlign: 'center',
    height: '200px',
    position: 'absolute',
    left: 0,
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100px',
    top: '0px',
    backgroundColor: 'transparent',
    opacity: '0',
    transition: 'opacity 0.5s',
    '&:hover': {
      opacity: '0.95',
    },
  },
  jobTitle: {
    textAlign: 'center',
    width: '100px',
    marginTop: '40px',
    padding: '3px',
    borderRadius: '5px',
    backgroundColor: '#373737',
  },
  yearBox: {
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
    // backgroundColor: 'red',
    color: '#444',
    position: 'absolute',
    top: '10px',
    left: '5px',
    [theme.breakpoints.down('xs')]: {
      transform: 'rotate(-90deg)',
      top: '20px',
      left: '-15px',
    },
  },
  overlayBackground: {
    height: '75px',
    backgroundColor: '#373737',
  },
}));

export default function Timeline() {
  const jobs = [
    {
      job: 'Microfluidics Lab',
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
    {
      job: 'Freelancer',
      jobTitle: 'Product Design',
      startYear: '2015.5',
      endYear: '2017.5',
      color: '#D26CD5',
      overlapTimeline: true,
    },
    {
      job: "Robotics Master's",
      jobTitle: 'NYU Student',
      startYear: '2017.5',
      endYear: '2019.5',
      color: '#96bb7c',
      overlapTimeline: false,
    },
    {
      job: 'Coding Bootcamps',
      jobTitle: 'Udemy Student',
      startYear: '2019.5',
      endYear: 'current',
      color: '#FFF600',
      overlapTimeline: false,
    },
  ];
  const classes = useStyles();
  const theme = useTheme();
  const years = calculateYears(jobs);
  const { mainTimeline, overlapTimeline } = calculateTimeline(jobs);

  return (
    <div className={classes.root}>
      <div className={classes.jobBoxRoot}>
        {mainTimeline.map((job) => {
          if (job.overlapTimeline === false) {
            return (
              <div
                className={classes.jobBox}
                key={job.job}
                style={{
                  width: `${job.jobLengthPercent}%`,
                }}
              >
                <div className={classes.jobText}>{job.job}</div>
                <div className={classes.jobTitleBox}>
                  <div className={classes.jobTitle}>{job.jobTitle}</div>
                </div>
                <div
                  className={classes.jobLine}
                  style={{
                    backgroundColor: job.color,
                  }}
                ></div>
              </div>
            );
          }
        })}
      </div>
      <div className={classes.overlayBoxRoot}>
        {overlapTimeline.map((job) => {
          return (
            <div
              className={classes.overlayJobBox}
              key={job.job}
              style={{
                width: `${job.jobLengthPercent}%`,
                visibility: job.overlapTimeline ? 'visible' : 'hidden',
              }}
            >
              <div className={classes.jobText}>{job.job}</div>
              <div className={classes.jobTitleBox}>
                <div className={classes.jobTitle}>{job.jobTitle}</div>
              </div>
              <div
                className={classes.jobLine}
                style={{
                  backgroundColor: job.color,
                }}
              ></div>
              <div className={classes.overlayBackground}></div>
            </div>
          );
        })}
      </div>
      <div className={classes.timelineBox}>
        {years.map((year) => {
          return (
            <div key={year} className={classes.yearBox}>
              <div className={classes.line}></div>
              <div className={classes.tick}></div>
              <div className={classes.year}>{year}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function calculateYears(jobs) {
  const startYear = Math.floor(parseFloat(jobs[0].startYear));
  const date = new Date();
  const endYear = date.getFullYear();
  let years = [];
  let currentYear = startYear;
  while (currentYear <= endYear) {
    years.push(currentYear);
    currentYear++;
  }
  return years;
}

function calculateTimeline(jobs) {
  let timeline = { mainTimeline: [], overlapTimeline: [] };
  const startYear = Math.floor(parseFloat(jobs[0].startYear));
  const date = new Date();
  const endYear = date.getFullYear();
  const endMonth = date.getMonth();
  const totalYears = endYear + 1 - startYear;
  let overlayStart = 0;
  let overlayEnd;
  let spacerKey = 0;

  jobs.forEach((job) => {
    const start = job.startYear - startYear;
    let end;
    if (job.endYear === 'current') {
      if (endMonth > 2 && endMonth < 8) {
        end = endYear + 0.5 - startYear;
      } else if (endMonth >= 8) {
        end = endYear + 1 - startYear;
      }
    } else {
      end = job.endYear - startYear;
    }

    const jobLengthPercent = ((end - start) / totalYears) * 100;

    timeline.mainTimeline.push({
      ...job,
      jobLengthPercent,
    });

    if (job.overlapTimeline === true) {
      overlayEnd = job.startYear - startYear;
      const spacerPercent = ((overlayEnd - overlayStart) / totalYears) * 100;
      timeline.overlapTimeline.push({
        job: `spacer ${spacerKey}`,
        color: 'red',
        jobLengthPercent: spacerPercent,
      });
      overlayStart = job.endYear - startYear;
      spacerKey++;

      timeline.overlapTimeline.push({
        ...job,
        jobLengthPercent,
      });
    }
  });

  return timeline;
}
