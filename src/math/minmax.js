import { validateNumber } from "./validateNumber.js"

/**
 * @param {number} a
 * @param {number} b
 */
export default function minmax(a, b) {
  validateNumber.every(a, b)
  if (a > b) {
    var t = b;
    b = a;
    a = t;
  }
  return {
    min: a,
    max: b
  }
}