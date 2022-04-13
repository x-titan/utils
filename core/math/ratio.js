import each from "../each.js"
import is from "../types.js"
import { validNumber } from "./math.js"
import range from "./range.js"

const _ = (a, b, c) => a * b / c
const numsLen = (...nums) => {
  let len = 0
  each(nums, (n) => {
    if (is.num(n)) len++
  })
  return len
}

export function ratio(x, y, w, h) {
  if (numsLen(x, y, w, h) !== 3)
    throw new TypeError("Arguments types not be a number")
  if (!is.num(x)) return y * w / h
  if (!is.num(y)) return x * h / w
  if (!is.num(w)) return x * h / y
  if (!is.num(h)) return y * w / x
}
export function eachRatio(x, y) {
  validNumber.all(x, y)
  const list = []
  if (x === y) {
    console.warn("Ratio warn: x and y the equals. x: " + x + " y: " + y)
    list.push({ x, y }, { x: 1, y: 1 })
    return list
  }
  each(range(x, 1), n => {
    const res = ratio(x, y, n)
    if (is.int(res))
      list.push({ x: n, y: res })
  })
  return list
}

Math.ratio = ratio
Math.eachRatio = eachRatio