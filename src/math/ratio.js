import gcd from "./gcd.js"
import { validateNumber } from "./validateNumber.js"


/**
 * @param {number} width
 * @param {number} height
 * @return {{
 *   dimensions: [number, number],
 *   aspect: [number, number],
 *   gcd: number,
 * }}
 */
export function ratio(width, height) {
  validateNumber.every(width, height)
  const divider = gcd(width, height)

  return {
    aspect: [width / divider, height / divider],
    gcd: divider,
    dimensions: [width, height]
  }
}

/**
 * @param {number} width
 * @param {number} height
 * @return {{ x: number, y: number }[]}
 */
export function allRatio(width, height) {
  validateNumber.every(width, height)
  let divider = gcd(width, height)
  const arr = [{ x: width, y: height }]
  const aspect_width = width / divider
  const aspect_height = height / divider

  while (--divider > 0) {
    arr.push({ x: aspect_width * divider, y: aspect_height * divider })
  }
  return arr
}
