import { Vector } from "./math/vector.js"
import { List, Queue, Stack } from "./list/index.js"
const { freeze, assign, getPrototypeOf: getProto } = Object
const isOfType = type => value => typeof value === type
const getObjName = () => {
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
    value === null || value === 0 || _.nan(value)),

  num: isOfType("number"),
  str: isOfType("string"),
  func: isOfType("function"),
  symbol: isOfType('symbol'),
  bool: value => value === true || value === false,
  obj: value => !_.empty(value) &&
    (_.func(value) ||
      typeof value === "object"),

  class: value => _.func(value) && ("" + value).startsWith('class '),
  notClass: value => _.empty(value) || value === globalThis,
  plainObj: value => _.obj(value) && getObjName(value) === "Object" &&
    (value = getProto(value), value === null || value === plainProto),

  int: Number.isInteger,
  decimal: value => _.num(value) && value % 1 !== 0,
  positive: value => _.num(value) && value > 0,
  negative: value => _.num(value) && value < 0,
  finite: value => _.num(value) && !_.infinity(value) && !_.nan(value),
  infinity: value => value === Infinity || value === -Infinity,
  safeInt: value => _.num(value) && Number.isSafeInteger(value),
  nan: value => "number" === typeof value && isNaN(value),

  array: Array.isArray,
  arrayLike: value => !_.empty(value) &&
    !_.func(value) &&
    _.int(value) &&
    value.length > -1,
  iterable: value => !_.empty(value) && _.func(value[Symbol.iterator]),
  vector: value => value instanceof Vector,
  list: value => value instanceof List,
  queue: value => value instanceof Queue,
  stack: value => value instanceof Stack
}
freeze(assign(is, _, {
  null_: _.null,
  class_: _.class,
  NaN: _.nan,
  vec: _.vector,
}))
export default is