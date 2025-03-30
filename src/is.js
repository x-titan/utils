import * as types from "./types.js"

/** @param {unknown} value */
function typeis(value) {
  if (types.isNull(value)) return "null"
  if (types.isArray(value)) return "array"

  return typeof value
}
const is = Object.assign(typeis, {
  arr: types.isArray,
  array: types.isArray,
  arrayLike: types.isArrayLike,
  bigint: types.isBigInt,
  boolean: types.isBoolean,
  defined: types.isDefined,
  empty: types.isEmpty,
  func: types.isFunction,
  iterable: types.isIterable,
  null: types.isNull,
  num: types.isNumber,
  obj: types.isObject,
  str: types.isString,
  symbol: types.isSymbol,
  undefined: types.isUndefined,

  toString: Object.prototype.toString
})

export default is
