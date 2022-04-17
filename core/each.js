import is from "./types.js"

// #region Types
/** @typedef {(value, index: number, array: any[]) => void} iterator */
/** @typedef {(value, name: string) => void} iteratorOBJ */
// #endregion
const validateFunc = is.makeValidator(is.func, () => {
  throw new TypeError("Argumnet not be function")
})
/**
 * @param {Array} arr
 * @param {iterator} fn
 * @param {boolean} [stoppable]
 */
export default function each(arr, fn, stoppable = true) {
  validateFunc(fn)
  if (is.iterable(arr)) {
    let i = 0
    for (const item of arr)
      if (fn(item, i++, arr) === false
        && stoppable === true) break
  } else if (is.arrayLike(arr)) {
    let i = arr.length
    while (i--)
      if (fn(arr[i], i, arr) === false
        && stoppable === true) break
  } else throw new TypeError("First argument not be iterable")
  return arr
}
/**
 * @param {Object} obj
 * @param {*} [obj.]
 * @param {iteratorOBJ} fn
 * @param {boolean} [stoppable]
 */
each.obj = (obj, fn, stoppable = true) => {
  validateFunc(fn)
  if (!(is.obj(obj) || is.func(obj))) return obj
  const keys = Object.keys(obj)
  let i = keys.length, k;
  while (i--) {
    if (fn(obj[k = keys[i]], k, obj) === false
      && stoppable === true) break
  }
  return obj
}
/**
 * @param {Array} arr
 * @param {(value, index: number, array: any[]) => boolean} fn
 */
each.filter = (arr, fn) => {
  validateFunc(fn)
  const out = []
  each(arr, (v, i) => {
    if (fn(v, i, arr) === true) out.push(v)
  }, false)
  return out
}
Array.each = each