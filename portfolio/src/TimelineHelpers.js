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
      if (endMonth <= 1) {
        end = endYear - startYear;
      } else if (endMonth > 1 && endMonth < 8) {
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

export { calculateTimeline, calculateYears };
