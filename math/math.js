import { isNumber, makeValidator } from '../inherits.js'

const { EPSILON } = Number
const ONE_EPS = 1 - EPSILON
const { PI, E, SQRT2, sqrt } = Math
const { isInteger } = Number

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
 * @param {number} a
 * @param {number} b
 */
export function gcd(a, b) {
  validateNumber.any(a, b)
  a = Math.abs(a)
  b = Math.abs(b)

  if (b > a) {
    const t = a
    a = b
    b = t
  }

  let i = a

  while (i--) {
    if (isInteger(a / i) && isInteger(b / i)) return i
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
  a = Math.abs(a)
  b = Math.abs(b)

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
  x = Math.abs(x)
  y = Math.abs(y)

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
export function minmax(inmin, inmax, outmin, outmax) {
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
Number.validateInteger = validateInteger
Number.normalizer = normalizer
Number.isNumber = isNumber

Math.minmax = minmax
Math.gcd = gcd
Math.ratio = ratio
Math.allRatio = allRatio
Math.constraints = constraints
Math.equals = equals
