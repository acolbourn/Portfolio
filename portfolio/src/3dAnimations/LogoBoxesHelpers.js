// Generate random points on a sphere
function getRandomSpherePoints(count) {
  let points = [];
  for (let i = 0; i < count; i++) {
    let u = Math.random();
    let v = Math.random();
    let theta = u * 2.0 * Math.PI;
    let phi = Math.acos(2.0 * v - 1.0);
    let r = Math.cbrt(Math.random());
    let sinTheta = Math.sin(theta);
    let cosTheta = Math.cos(theta);
    let sinPhi = Math.sin(phi);
    let cosPhi = Math.cos(phi);
    let x = r * sinPhi * cosTheta;
    let y = r * sinPhi * sinTheta;
    let z = r * cosPhi;
    points.push({ x: x, y: y, z: z });
  }
  return points;
}

/**
 * Scales mouse movements from window units to desired units.  The center of the screen represents (0,0)
 *
 * @param {number} mouseCurrent  Current raw mouse position.
 * @param {number} windowSize    Current raw window size.
 * @param {string} scaleType     Desired scale funcion ('log' or 'linear').
 * @param {number} deadZone      Space around center of window in which scale is truncated to 0 (in window units).
 * @param {number} maxOutput     Max of desired output scale.
 * @return {number} Scaled value from 0 to max output.
 */
function scaleMouse(mouseCurrent, windowSize, scaleType, deadZone, maxOutput) {
  const sign = mouseCurrent < 0 ? -1 : 1;
  let mouseScaled = Math.abs(mouseCurrent);
  const windowHalf = windowSize / 2;

  if (mouseScaled < deadZone) {
    return (mouseScaled = 0);
  } else {
    if (scaleType === 'log') {
      // Calculate logarithmic function so animations start slow towards center and accelerate towards edge of screen
      // position is between 0 and half of window length
      const minp = 0;
      const maxp = windowHalf;
      // The result should be between 0 and maxOutput of desired animation
      // const minv = Math.log(1);
      // const maxv = Math.log(maxOutput);
      const logBase = 60000;
      const baseDivisor = 1 / Math.log(logBase);
      const minv = Math.log(1) * baseDivisor;
      const maxv = Math.log(maxOutput) * baseDivisor;
      // calculate adjustment factor
      const scale = (maxv - minv) / (maxp - minp);
      // mouseScaled = Math.exp(minv + scale * (mouseScaled - minp));
      mouseScaled = Math.pow(logBase, minv + scale * (mouseScaled - minp));
    } else {
      // else assume standard linear scale using y = mx + b
      const m = maxOutput / (windowHalf - deadZone);
      const b = maxOutput - m * windowHalf;
      mouseScaled = m * mouseScaled + b;
    }
  }

  // ensure scaled value doesn't exceed user max
  if (mouseScaled > maxOutput) {
    mouseScaled = maxOutput;
  }
  return mouseScaled * sign;
}

export { getRandomSpherePoints, scaleMouse };
