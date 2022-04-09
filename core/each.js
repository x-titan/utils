import is from "./types.js"

// #region Types
/** @typedef {(value, index: number, array: any[]) => void} iterator */
/** @typedef {(value, name: string) => void} iteratorOBJ */
// #endregion

/**
 * @param {Array} arr
 * @param {iterator} fn
 * @param {boolean} [stoppable]
 */
export default function each(arr, fn, stoppable = true) {
  if (!is.func(fn))
    throw new TypeError("Second argument not be function")
  if (is.iterable(arr)) {
    let i = 0
    for (const item of arr)
      if (fn(item, i, arr) === false
        && stoppable === true) break
  } else if (is.arrayLike(arr)) {
    let i = arr.length
    while (i--)
      if (fn(item, i, arr) === false
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
  if (!(is.obj(obj) || is.func(obj)) || !is.func(fn)) return obj
  const keys = Object.keys(obj)
  let i = keys.length, k;
  if (stoppable) while (i--) {
    if (fn(obj[k = keys[i]], k, obj) === false) break
  }
  else while (i--) fn(obj[k = keys[i]], k, obj)
  return obj
}
Array.each = each