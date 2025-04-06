import { validateNumber } from "./validateNumber.js"

/**
 * @param {number} a
 * @param {number} b
 * 
 * @example
 * equals(5, 5) == true
 * equals(5, 9) == false
 * equals(0, -0) == false
 * equals(NaN, NaN) == true
 */
export default function equals(a, b) {
  validateNumber.every(a, b)

  if (a === b) {
    return (1 / a === 1 / b)
  }

  return (a !== a) && (b !== b)
}