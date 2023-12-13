import { assign, isNumber, makeValidator } from "../include.js"

const validateNumber = makeValidator(isNumber)

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

assign(Number.prototype,{
  clamp: function (min, max) {
    return clamp(this, min, max)
  },
  map: function(fromLow, fromHigh, toLow, toHigh){
    return map(this, fromLow, fromHigh, toLow, toHigh)
  },
})

Math.clamp = clamp
Math.map = map