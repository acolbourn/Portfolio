import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { calculateTimeline, calculateYears } from './TimelineHelpers';
import { jobs } from './constants';
import useStyles from './styles/TimelineStyles';

export default function Timeline() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const years = calculateYears(jobs);
  const { mainTimeline, overlapTimeline } = calculateTimeline(jobs);

  const jobTimeline = (
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
              {!isMobile && (
                <div className={classes.jobTitleBox}>
                  <div className={classes.jobTitle}>{job.jobTitle}</div>
                </div>
              )}
              <div
                className={classes.jobLine}
                style={{
                  backgroundColor: job.color,
                }}
              ></div>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );

  const jobOverlaps = (
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
            {!isMobile && (
              <div className={classes.jobTitleBox}>
                <div className={classes.jobTitle}>{job.jobTitle}</div>
              </div>
            )}
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
  );

  const graphLine = (
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
  );

  return (
    <div className={classes.root}>
      {jobTimeline}
      {jobOverlaps}
      {graphLine}
    </div>
  );
}
