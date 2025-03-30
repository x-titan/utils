import { isNumber } from "../include.js"

const proxyRand = Math.random

/** @param {number} seed */
export function newRandom(seed) {
  const _rand = (isNumber(seed)
    ? () => ((seed = (seed * 9301 + 49297) % 233280) / 233280)
    : proxyRand
  )

  return function (min = 0, max = 1) {
    if (!isNumber(min)) { min = 1 }
    if (!isNumber(max)) { max = 0 }
    if (min > max) {
      const temp = max
      max = min
      min = temp
    }
    return min + _rand() * (max - min)
  }
}

export const random = newRandom()

/**
 * @param {number} min
 * @param {number} max
 */
export function randInt(min, max) {
  return Math.round(random(min, max))
}

Math.random = random
Math.newRandom = newRandom
Math.randInt = randInt
