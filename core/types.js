const { freeze, assign, getPrototypeOf } = Object
const isOfType = type => value => typeof value === type
const getObjName = () => {
  const x = Object.prototype.toString.call(value).slice(8, -1)
  if (x) return x
  return null
}
const objProto = getPrototypeOf({})
const getType = value => {
  if (value === null) return "null"
  return typeof value
}
const _ = {
  empty: value => value === undefined || value === null,
  null: value => value === null,
  undefined: value => value === undefined,
  nonZeroValue: value => !(value === undefined || value === null || value === 0 || _.nan(value)),

  num: isOfType("number"),
  str: isOfType("string"),
  func: isOfType("function"),
  symbol: isOfType('symbol'),
  bool: value => value === true || value === false,
  obj: value => !_.empty(value) && (_.func(value) || typeof value === "object"),

  class: value => _.func(value) && value.toString().startsWith('class '),
  notClass: value => _.empty(value) || value === globalThis,
  plainObj: value => _.obj(value) && getObjName(value) === "Object" && (value = getPrototypeOf(value), value === null || value === objProto),

  int: value => Number.isInteger(value),
  infinity: value => value === Infinity || value === -Infinity,
  safeInt: value => Number.isSafeInteger(value),
  nan: value => "number" === typeof value && isNaN(value),

  array: Array.isArray,
  arrayLike: value => !_.empty(value) && !_.func(value) && _.int(value) && value.length > -1,
  iterable: value => !_.empty(value) && _.func(value[Symbol.iterator])
}
const is = freeze(assign(getType, _, {
  null_: _.null,
  class_: _.class,
  NaN: _.nan,
}))
export default is