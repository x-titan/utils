import { validateType } from "../include.js"

const PI = Math.PI
const toDegree = 180 / PI
const toRadian = PI / 180

/**
 * π/2 → 90°  
 * π → 180°
 * @param {number} radian (π)
 * @return {number} degree 180°
 */
export function radianToDegree(radian) {
  validateType("number", radian)
  return radian * toDegree
}

/**
 * 90° → π/2  
 * 180° → π
 * @param {number} degree (180°)
 * @return {number} radian π
 */
export function degreeToRadian(degree) {
  validateType("number", degree)
  return degree * toRadian
}
