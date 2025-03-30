import { isNumber } from "../include.js"
import { validate } from "../validate.js"

const { iterator } = Symbol

function forward(i, to) { return i < to }

function backward(i, to) { return i > to }

function getDirection(sign) { return (sign > 0 ? forward : backward) }

export class Range {
  #from = 0
  #to = 0

  /**
   * @param {number} [from]
   * @param {number} [to]
   */
  constructor(from, to) {
    this.from = from
    this.to = to
  }

  *[iterator]() {
    var { from, to } = this
    var sign = Math.sign(to - from)
    var direction = getDirection(sign)

    let i = from

    while (direction(i, to)) {
      yield i
      i = i + sign
    }
  }

  get length() {
    const len = this.to - this.from
    return Math.sign(len) * len
  }

  set from(num) { if (isNumber(num)) this.#from = num }
  get from() { return this.#from }

  set to(num) { if (isNumber(num)) this.#to = num }
  get to() { return this.#to }
}

/**
 * @param {number} from
 * @param {number} [to]
 */
export function range(from, to) {
  validate(isNumber, from)

  if (!isNumber(to)) {
    to = from
    from = 0
  }

  return new Range(from, to)
}

/**
 * @param {number} from
 * @param {number} [to]
 * @param {number} [step]
 */
range.array = function (from, to, step) {
  if (!isNumber(to)) {
    to = Math.ceil(from)
    from = 0
  }

  if (!isNumber(step)) {
    step = 1
  }

  if (step === 0) {
    throw new RangeError("Step cant be a Zero")
  }

  step = Math.abs(step)
  var arr = []
  var sign = Math.sign(to - from)
  var direction = getDirection(sign)
  var i = from

  while (direction(i, to)) {
    arr.push(i)
    i = i + (step * sign)
  }

  return arr
}

Array.range = range
