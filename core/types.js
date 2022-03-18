const { freeze, assign } = Object
const { toString } = Object.prototype
const { isInteger, isSafeInteger } = Number
const { iterator, toStringTag } = Symbol
const objCons = {}.constructor
const isOfType = type => value => typeof value === type
const getObjName = value => toString.call(value).slice(8, -1) || null
const is = value => {
  if (value === null) return "null"
  switch (getObjName(value)) {
    case "Array": return "array"
    case "Map": return "map"
    case "Set": return "set"
    case "Error": return "error"
  }
  return typeof value
}
const _ = {
  empty: value => value === undefined || value === null,
  null: value => value === null,
  undefined: value => value === undefined,
  nonZeroValue: value => !(_.empty(value) || value === 0 ||
    ((_.str(value) || _.arrayLike(value)) && value.length === 0)),

  num: value => isFinite(value),
  str: isOfType("string"),
  func: isOfType("function"),
  symbol: isOfType('symbol'),
  bool: value => value === !!value,
  obj: value => !_.empty(value) && typeof value === "object",

  class: value => _.func(value) && ("" + value).startsWith('class '),
  notClass: value => _.empty(value) || value === globalThis,
  plainObj: value => _.obj(value) && getObjName(value) === "Object" &&
    (value = value.constructor, value === null || value === objCons),
  error: value => value instanceof Error,
  argument: value => _.arrayLike(value) &&
    getObjName(value) === "Arguments",

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
  iterable: value => !_.empty(value) && _.func(value[iterator]),
}
freeze(assign(is, _, {
  null_: _.null,
  undefined_: _.undefined,
  class_: _.class,
  NaN: _.nan,
  [toStringTag]: "is",
  toString,
  constructor: null
}))
export default is