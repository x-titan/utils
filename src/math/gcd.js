import { validateNumber } from "./validateNumber.js"

/**
 * @param {number} a
 * @param {number} b
 */
export default function gcd(a, b) {
  validateNumber.every(a, b)
  a = Math.abs(a)
  b = Math.abs(b)
  let temp = b

  while (b !== 0) {
    temp = a % b
    a = b;
    b = temp;
  }
  return a
}

/**
 * @param {number} a
 * @param {number} b
 */
gcd.recursive = function (a, b) {
  if (b === 0) return a
  return gcd.recursive(b, a % b)
}
