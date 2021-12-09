import { extend } from "./object/extend.js"

const isOfType = type => value => typeof value === type
const toStr = value => Object.prototype.toString.call(value)
const getType = value => typeof value
const getObjName = () => {
  const x = toStr(value).slice(8, -1)
  if (x) return x
  return null
}
const getProto = Object.getPrototypeOf
const instance = (value, type) => getObjName(value) === type
const voidObj = {}

const _ = {
  empty: value => value === undefined || value === null,
  null: value => value === null,
  null_: _.null,
  undefined: value => value === undefined,
  nonZeroValue: value => !(value === undefined || value === null || value === 0 || _.nan(value)),

  num: isOfType("number"),
  str: isOfType("string"),
  func: isOfType("function"),
  symbol: isOfType('symbol'),
  bool: value => value === true || value === false,
  obj: value => !_.empty(value) && (_.func(value) || typeof value === "object"),

  class: value => _.func(value) && toStr(value).startsWith('class '),
  class_: _.class,
  notClass: value => _.empty(value) || value === globalThis,
  plainObj: value => _.obj(value) && getObjName(value) === "Object" && (value = getProto(value), value === null || value === getProto(voidObj)),

  int: value => Number.isInteger(value),
  infinity: value => value === Infinity || value === -Infinity,
  safeInt: value => Number.isSafeInteger(value),
  nan: value => "number" === typeof value && isNaN(value),
  NaN: _.nan,

  array: Array.isArray,
  arrayLike: value => !_.empty(value) && !_.func(value) && _.int(value) && value.length > -1,
  iterable: value => !_.empty(value) && _.func(value[Symbol.iterator])
}
const is = Object.freeze(extend.pro(
  value => {
    if (value === null) return "null"
    return getType(value)
  }, _))
export default is