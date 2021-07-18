import is from "./types.js"

//#region Types
/** @typedef {(value, index: number, array: any[]) => (void | boolean)} iterator */
/** @typedef {(value, name: string) => (void | boolean)} iteratorOBJ */
//#endregion

/**
 * @param {Array} arr
 * @param {iterator} fn
 */
export default function each(arr, fn) {
  if (!is.array(arr) || !is.func(fn)) return arr
  let i = -1, len = arr.length;
  while (++i < len) if (fn(arr[i], i, arr) === false) break;
  return arr
}
/**
 * @param {Object} obj
 * @param {*} [obj.]
 * @param {iteratorOBJ} fn
 */
each.obj = function (obj, fn) {
  if (!is.obj(obj) || !is.func(fn)) return obj
  let keys = Object.keys(obj), i = -1, len = keys.length, k;
  while (++i < len) if (fn(obj[k = keys[i]], k, obj) === false) break;
  return obj
}