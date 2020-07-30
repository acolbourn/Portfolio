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

// Scale mouse movements to make smooth animations for user
function scaleMouse(mouseCurrent, windowSize) {
  const sign = mouseCurrent < 0 ? -1 : 1;
  let mouseScaled = Math.abs(mouseCurrent);
  const deadZone = 75;
  const windowHalf = windowSize / 2;
  const max = 300;
  if (mouseScaled < deadZone) {
    return (mouseScaled = 0);
  } else {
    // Calculate logarithmic function so animations start slow towards center and accelerate towards edge of screen
    // position is between 0 and half of window length
    let minp = 0;
    let maxp = windowHalf;
    // The result should be between 0 and max of desired animation
    let minv = Math.log(1);
    let maxv = Math.log(max);
    // calculate adjustment factor
    let scale = (maxv - minv) / (maxp - minp);
    mouseScaled = Math.exp(minv + scale * (mouseScaled - minp));
  }
  return mouseScaled * sign;
}

export { getRandomSpherePoints, scaleMouse };
