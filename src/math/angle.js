import { validateNumber } from "./validateNumber.js"

/**
 * `0 - 360` => `0 - 2PI`
 * @param {number} degree
 */
export function degreeToRadian(degree) {
  validateNumber(degree)
  return degree * Math.PI / 180
}

/**
 * `0 - 2PI` => `0 - 360`
 * @param {number} radian
 */
export function radianToDegree(radian) {
  validateNumber(radian)
  return radian * 180 / Math.PI
}
