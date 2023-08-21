import { isNumber, validate } from "../include.js";

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

  [iterator]() {
    const from = this.from
    const to = this.to
    const sign = Math.sign(to - from)
    const canIterate = getDirection(sign)

    let i = from - sign

    return {
      next() {
        const index = i + sign
        const can = canIterate(index, to)

        if (can) { i = index }

        return {
          done: !can,
          value: i,
        }
      }
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
 * @param {(index:number, from:number, to:number) => (number)} [push]
 */
range.array = function (from, to, push) {
  const arr = []

  if (!isNumber(to)) {
    to = from
    from = 0
  }

  for (let i = from; i < to; i++) {
    arr.push(push?.call(push, i, from, to)  || i)
  }

  return arr
}

Array.range = range
