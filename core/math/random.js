import is from "../types.js"

/** @param {number} [seed] */
export function randomSeed(seed) {
  const _random = is.num(seed) ? () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  } : Math.random
  return function (min = 0, max = 1) {
    if (!is.num(min)) min = 0
    if (!is.num(max)) {
      if (min < 1) {
        max = 1
      } else {
        max = min
        min = 0
      }
    }
    if (min > max) {
      const temp = max
      max = min
      min = temp
    }
    return min + _random() * (max - min)
  }
}
export const random = randomSeed()
/**
 * @param {number} start
 * @param {number} end
 */
export function randInt(start, end) {
  return Math.round(random(start, end))
}