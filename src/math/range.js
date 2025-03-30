import assert from "../assert.js"
import { each } from "../collection.js"
import { isNumber } from "../types.js"

function forward(i, to) { return i < to }
function backward(i, to) { return i > to }
function getDirection(sign) { return ((sign > 0) ? forward : backward) }

/**
 * @param {number} from
 * @param {number} [to]
 * @param {number} [step]
 */
export default function range(from, to, step) {
  assert(isNumber(from), "The first argument must be a number")

  if (!isNumber(to)) {
    to = from
    from = 0
  }
  if (!isNumber(step)) step = 1
  step = Math.abs(step)

  const sign = Math.sign(to - from)
  const direction = getDirection(sign)
  assert(step !== 0, "step cant be a zero")
  assert(sign !== 0, "minmax error")

  return {
    *[Symbol.iterator]() {
      let i = from
      while (direction(i, to)) {
        yield i;
        i = i + (sign * step);
      }
    },

    /**
     * @type { (callback: (value: number, index: number, thisArg: this) => boolean) => this }
     */
    forEach: each.bind(this, this)
  }
}

/**
 * @param {number} from
 * @param {number} [to]
 * @param {number} [step]
 */
range.array = function (from, to, step) {
  const arr = []
  for (const element of range(from, to, step)) {
    arr.push(element)
  }
  return arr
}
