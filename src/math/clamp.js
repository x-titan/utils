import { validateNumber } from "./validateNumber.js"

/**
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * 
 * @example 
 * var a1 = clamp(25, 180, 360)
 * a1 == 180
 * 
 * var a2 = clamp(33, 0, 10)
 * a2 == 10
 * 
 * var a3 = clamp(41, -30, 60)
 * a3 == 41
 */
export default function clamp(value, min, max) {
  validateNumber.every(value, min, max)

  if (min > max) {
    min = min + max
    max = min - max
    min = min - max
  }

  if (value < min) { value = min }
  if (value > max) { value = max }

  return value
}
