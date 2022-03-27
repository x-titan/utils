import is from "../types.js"
const { freeze } = Object

function baseRange(start, stop, step) {
  const self = {
    [Symbol.iterator]() {
      const len = stop
      let i = start - step
      const iterable = {
        next() {
          const done = iterable.isDone
          return { done, value: done ? null : i += step }
        },
        get isDone() {
          const _i = i + step
          return !((step > 0) ?
            _i < len : _i > len)
        },
        get self() { return _range }
      }
      freeze(iterable)
      return iterable
    },
    start,
    stop,
    step
  }
  return freeze(self)
}
/** 
 * @param {number} [start] 
 * @param {number} [stop] 
 * @param {number} [step] 
 */
export default function range(start, stop, step) {
  if (step === 0) throw new Error("Step not a zero value")
  if (!is.num(start)) start = 0
  if (!is.num(stop)) {
    stop = start || 1
    start = 0
  }
  if (!is.num(step))
    step = (start > stop) ? -1 : 1
  if ((start > stop && step > 0) ||
    (start < stop && step < 0))
    throw new Error("Reverse step error")
  return baseRange(start, stop, step)
}