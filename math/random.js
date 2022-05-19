import { isNumber } from '../inherits.js'

const proxyRand = Math.random

/** @param {number} seed */
export function randomSeed(seed) {
  const _rand = (
    isNumber(seed)
      ? () => ((seed = (seed * 9301 + 49297) % 233280) / 233280)
      : proxyRand
  )

  return function (min = 0, max = 1) {
    if (!isNumber(min)) min = 0
    if (!isNumber(max)) {
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
    return min + _rand() * (max - min)
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

Math.random = random
Math.randomSeed = randomSeed
Math.randInt = randInt
