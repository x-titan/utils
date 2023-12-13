import { isNumber, makeValidator } from "../include.js"

const { isInteger } = Number
const { PI, sqrt, abs } = Math

Math.PHI = (1 + sqrt(5)) / 2;
Math.PI2 = Math.TAU = PI * 2

export const validateNumber = makeValidator(isNumber)

export const validateInteger = makeValidator(
  (n) => (isNumber(n) && isInteger(n))
)

export function equals(a, b) {
  if (a === b) {
    return (1 / a === 1 / b)
  }

  return (a !== a) && (b !== b)
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

Number.validateNumber = validateNumber
Number.validateInteger = validateInteger
Number.isNumber = isNumber

Math.gcd = gcd
Math.ratio = ratio
Math.allRatio = allRatio
Math.equals = equals
