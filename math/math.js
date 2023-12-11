import { isNumber, makeValidator } from "../include.js"

const { EPSILON, isInteger } = Number
const ONE_EPS = 1 - EPSILON
const { PI, E, SQRT2, sqrt, abs } = Math

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
  SQRT2: SQRT2,
  /** @type {2.220446049250313e-16} */
  EPSILON: EPSILON,
  /** @type {0.9999999999999998} */
  ONE_EPS,
}

export const validateNumber = makeValidator(isNumber)

export const validateInteger = makeValidator(
  (n) => (isNumber(n) && isInteger(n))
)

export function equals(a, b) {
  if (a === b) {
    return (a !== 0) || (1 / a === 1 / b)
  }

  return (a !== a) && (b !== b)
}

/** @param {number} num */
export function normalizer(num) {
  validateNumber(num)
  const div = num % 1

  if (div <= EPSILON) {
    num = ~~num
  } else if (div >= ONE_EPS) {
    num = ~~num + 1
  }

  return num
}

/**
 * Greatest common divisor
 * @param {number} a
 * @param {number} b
 */
export function gcd(a, b) {
  validateNumber.any(a, b)
  a = abs(a)
  b = abs(b)

  let i = Math.min(a, b) + 1

  while (--i > 0) {
    if (isInteger(a / i) && isInteger(b / i)) { return i }
  }

  return 1
}

/**
 * @param {number} a
 * @param {number} b
 * @param {number} [c]
 * @param {number} [d]
 */
export function ratio(a, b, c, d) {
  validateNumber.any(a, b)
  a = abs(a)
  b = abs(b)

  const aspect_ratio = ((a > b) ? (a / b) : (b / a))

  if (isNumber(c) && isNumber(d)) {
    // pass
  } else if (isNumber(c)) {
    d = c * b / a
  } else if (isNumber(d)) {
    c = d * a / b
  } else {
    const n = gcd(a, b)
    c = a / n
    d = b / n
  }

  const cd_ratio = ((c > d) ? (c / d) : (d / c))

  return {
    a, b, c, d,
    aspect_ratio,
    itsOk: aspect_ratio === cd_ratio,
  }
}

/**
 * @param {number} x
 * @param {number} y
 */
export function allRatio(x, y) {
  validateNumber.any(x, y)
  x = abs(x)
  y = abs(y)

  let i = x
  const out = [{ x, y }]

  while (i--) {
    const j = i * y / x
    if (isInteger(j) && j !== 0) {
      out.push({ x: i, y: j })
    }
  }

  return out
}

/**
 * @param {number} value
 * @param {number} min
 * @param {number} max
 */
export function clamp(value, min, max) {
  validateNumber.any(value, min, max)

  if (min > max) {
    min = min + max
    max = min - max
    min = min - max
  }

  if (value < min) { value = min }
  if (value > max) { value = max }

  return value
}

/**
 * @param {number} value
 * @param {number} fromLow
 * @param {number} fromHigh
 * @param {number} toLow
 * @param {number} toHigh
 */
export function map(value, fromLow, fromHigh, toLow, toHigh) {
  validateNumber.any(value, fromLow, fromHigh, toLow, toHigh)

  const a = fromHigh - fromLow
  const b = toHigh - toLow

  if (a === 0 || b === 0) {
    throw new Error("Minmax error")
  }

  return (clamp(value, 0, a) * (b / a)) + toLow
}

Number.validateNumber = validateNumber
Number.validateInteger = validateInteger
Number.normalizer = normalizer
Number.isNumber = isNumber

Math.clamp = clamp
Math.gcd = gcd
Math.ratio = ratio
Math.allRatio = allRatio
Math.map = map
Math.equals = equals
