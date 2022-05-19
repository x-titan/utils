import { isNumber, makeValidator } from '../inherits.js'

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
  SQRT2: SQRT2 || Math.sqrt(2),
  /** @type {2.220446049250313e-16} */
  EPSILON: Number.EPSILON || 2 ** -52
}

export const validateNumber = makeValidator(isNumber)

export function equals(a, b) {
  if (a === b) {
    return (a !== 0) || (1 / a === 1 / b)
  }
  return (a !== a) && (b !== b)
}

/**
 * @param {number} value
 * @param {number} min
 * @param {number} max
 */
export function constraints(value, min, max) {
  validateNumber.any(value, min, max)

  if (value < min) return min
  if (value > max) return max
  return value
}

/**
 * @param {number} inmin
 * @param {number} inmax
 * @param {number} outmin
 * @param {number} outmax
 */
export function normalizer(inmin, inmax, outmin, outmax) {
  validateNumber.any(inmin, inmax, outmin, outmax)
  if (inmin > inmax || outmin > outmax) {
    throw new Error('Minmax error')
  }
  return (value = inmin) => {
    if (!is.num(value)) value = inmin
    if (value < inmin) value = inmin
    if (value > inmax) value = inmax
    return outmin + ((outmax - outmin) * (value - inmin) / inmax)
  }
}

Number.validateNumber = validateNumber
Math.normalizer = normalizer
Math.constraints = constraints
Math.equals = equals
