const { freeze, assign, getPrototypeOf: getProto } = Object
const { isInteger, isSafeInteger } = Number
const { iterator } = Symbol
const isOfType = type => value => typeof value === type
const getObjName = value => {
  const x = Object.prototype.toString.call(value).slice(8, -1)
  if (x) return x
  return null
}
const plainProto = getProto({})
const is = value => {
  if (value === null) return "null"
  return typeof value
}
const _ = {
  empty: value => value === undefined || value === null,
  null: value => value === null,
  undefined: value => value === undefined,
  nonZeroValue: value => !(value === undefined ||
    value === null || value === 0 || _.nan(value)) ||
    ((_.str(value) || _.arrayLike(value)) && value.length !== 0),

  num: value => typeof value === "number" && isFinite(value),
  str: isOfType("string"),
  func: isOfType("function"),
  symbol: isOfType('symbol'),
  bool: value => value === !!value,
  obj: value => !_.empty(value) &&
    (_.func(value) || typeof value === "object"),

  class: value => _.func(value) && ("" + value).startsWith('class '),
  notClass: value => _.empty(value) || value === globalThis,
  plainObj: value => _.obj(value) && getObjName(value) === "Object" &&
    (value = getProto(value), value === null || value === plainProto),
  error: value => value instanceof Error,
  argument: value => _.arrayLike(value) &&
    getObjName(value) === "argument",

  int: isInteger,
  decimal: value => _.num(value) && value * 10 % 1 === 0,
  float: value => _.num(value) && value % 1 !== 0,
  positive: value => _.num(value) && value > 0,
  negative: value => _.num(value) && value < 0,
  finite: isFinite,
  infinity: value => value === Infinity || value === -Infinity,
  safeInt: isSafeInteger,
  nan: value => "number" === typeof value && isNaN(value),

  array: Array.isArray,
  arrayLike: value => _.obj(value) &&
    _.int(value.length) && value.length > -1,
  iterable: value => !_.empty(value) && _.func(value[iterator])
}
freeze(assign(is, _, {
  null_: _.null,
  class_: _.class,
  NaN: _.nan,
  vec: _.vector,
}))
export default is