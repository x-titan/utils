import is from "./types.js"

// #region Types
/** @typedef {(value, index: number, array: any[]) => (void | boolean)} iterator */
/** @typedef {(value, name: string) => (void | boolean)} iteratorOBJ */
// #endregion

/**
 * @param {Array} arr
 * @param {iterator} fn
 * @param {boolean} [stoppable]
 */
export default function each(arr, fn, stoppable = true) {
  if (!arr?.[Symbol.iterator] || !is.func(fn)) return arr
  const len = arr.length
  let i = -1
  if (stoppable) while (++i < len) {
    if (fn(arr[i], i, arr) === false) break
  }
  else while (++i < len) fn(arr[i], i, arr)
  return arr
}
/**
 * @param {Object} obj
 * @param {*} [obj.]
 * @param {iteratorOBJ} fn
 * @param {boolean} [stoppable]
 */
each.obj = (obj, fn, stoppable = true) => {
  if (!is.obj(obj) || !is.func(fn)) return obj
  const keys = Object.keys(obj), len = keys.length;
  let i = -1, k;
  if (stoppable) while (++i < len) {
    if (fn(obj[k = keys[i]], k, obj) === false) break
  }
  else while (++i < len) fn(obj[k = keys[i]], k, obj)
  return obj
}
each([], () => { })