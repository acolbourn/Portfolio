/**
 * Generates an array of random points on the surface of a sphere.
 *
 * @param {number} count - The number of random points to generate.
 * @returns {Array<{x: number, y: number, z: number}>} An array of objects, each representing a point with x, y, and z coordinates.
 */
export function getRandomSpherePoints(count) {
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
 * Calculates the hypotenuses from a group position to a set of 3D logo points.
 *
 * @param {number} groupPosXY - The X and Y position of the group.
 * @param {number} groupPosZ - The Z position of the group.
 * @param {Array.<Array.<number>>} logoPoints3d - An array of 3D points representing the logo, where each point is an array [x, y, z].
 * @returns {Array.<number>} An array of hypotenuses calculated from the group position to each 3D logo point.
 */
export function getHypotenuses(groupPosXY, groupPosZ, logoPoints3d) {
  let hypotenuses = [];

  logoPoints3d.forEach((point) => {
    const [x, y, z] = point;
    hypotenuses.push(Math.hypot(x - groupPosXY, y - groupPosXY, z - groupPosZ));
  });
  return hypotenuses;
}

/**
 * Generates a random integer between the specified minimum and maximum values.
 *
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (exclusive).
 * @returns {number} A random integer between min (inclusive) and max (exclusive).
 */
export function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
