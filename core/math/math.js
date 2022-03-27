import is from "../types.js"

const { PI, E, SQRT2, sqrt } = Math
export const CONST = {
  /** @type {3.1415926535897932} */
  PI,
  /** @type {6.2831853071795865} */
  PI2: PI * 2,
  /** @type {6.2831853071795865} */
  TAU: PI * 2,
  /** @type {2.7182818284590451} */
  E,
  /** @type {1.6180339887498948} */
  PHI: (1 + sqrt(5)) / 2,
  /** @type {1.4142135623730951} */
  SQRT2
}
Object.freeze(CONST)
export function validNumber(value) {
  if (!is.num(value))
    throw new TypeError("Type error. Required a number")
}
validNumber.all = function (...values) {
  let i = values.length
  while (i--) validNumber(values[i])
}
/**
 * @param {number} inmin
 * @param {number} inmax
 * @param {number} outmin
 * @param {number} outmax
 */
export function normalizer(inmin, inmax, outmin, outmax) {
  validNumber.all(inmin, inmax, outmin, outmax)
  if (inmin > inmax || outmin > outmax)
    throw new Error("Minmax error")
  return (value = inmin) => {
    if (!isNumber(value)) value = inmin
    if (value < inmin) value = inmin
    if (value > inmax) value = inmax
    return outmin + ((outmax - outmin) * (value - inmin) / inmax)
  }
}
/**
 * @param {number} value
 * @param {number} min
 * @param {number} max
 */
export function constraints(value, min, max) {
  validNumber.all(value, min, max)
  if (value < min) return min
  if (value > max) return max
  return value
}