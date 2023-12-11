import { validate } from "../include.js"

const PI = Math.PI
const toDegree = 180 / PI
const toRadian = PI / 180

/**
 * π / 2 → 90° [3.14 / 2]
 * 
 * π → 180° [3.14]
 * @param {number} radian (π)
 * @return {number} degree 180°
 */
export function radianToDegree(radian) {
  validate("number", radian)
  return radian * toDegree
}

/**
 * 90° → π / 2 [3.14 / 2]
 * 
 * 180° → π [3.14]
 * @param {number} degree (180°)
 * @return {number} radian π
 */
export function degreeToRadian(degree) {
  validate("number", degree)
  return degree * toRadian
}
