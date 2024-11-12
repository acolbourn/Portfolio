/**
 * Calculates an array of years starting from the `startYear` of the first job in the `jobs` array
 * and ending with the current year.
 *
 * @param {Array} jobs - An array of job objects, where each job has a `startYear` property.
 *                        `startYear` should be a string or number representing the year the job started.
 * @returns {Array} years - An array of consecutive years from the `startYear` of the first job to the current year.
 */
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

/**
 * Calculates a timeline of job periods with possible overlaps, generating both main and overlap timelines.
 *
 * @param {Array} jobs - An array of job objects, where each job includes:
 *   - `startYear`: The starting year of the job (number or string).
 *   - `endYear`: The ending year of the job, or "current" if ongoing.
 *   - `overlapTimeline`: A boolean indicating if the job should be part of the overlapping timeline.
 *
 * @returns {Object} timeline - An object containing two arrays:
 *   - `mainTimeline`: Array of job objects with an additional `jobLengthPercent`, representing each job's duration as a percentage of the entire timeline.
 *   - `overlapTimeline`: Array containing job overlaps, with each job's `jobLengthPercent` and any necessary spacers in between.
 */
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
