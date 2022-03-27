const { freeze, assign } = Object
const { toString } = Reflect
const { isInteger, isSafeInteger } = Number
const { iterator, toStringTag } = Symbol
const objCtor = {}.constructor

/** @return {string} */
function getCtorName(value) {
  return typeof value.constructor === "function" ?
    value.constructor.name : null;
}
function isOfType(type) {
  return value => typeof value === type;
}
/** @return {string} */
function getObjName(value) {
  return toString.call(value).slice(8, -1) || null;
}
const _ = {
  empty: value => value === undefined || value === null,
  null: value => value === null,
  undefined: value => value === undefined,
  nonZeroValue: value => !(_.empty(value) || value === 0 ||
    ((_.str(value) || _.arrayLike(value)) && value.length === 0)),

  num: isFinite,
  str: isOfType("string"),
  func: isOfType("function"),
  genFunc: value => _.func(value) &&
    getCtorName(value) === "GeneratorFunction",
  asyncFunc: value => _.func(value) &&
    getCtorName(value) === "AsyncFunction",
  anonymFunc: value => _.func(value) &&
    value.prototype?.constructor !== value,
  symbol: isOfType('symbol'),
  bool: value => value === !!value,
  obj: value => !_.empty(value) && typeof value === "object",

  class: value => _.func(value) && ("" + value).startsWith('class '),
  notClass: value => _.empty(value) || value === globalThis,
  plainObj: value => _.obj(value) && getObjName(value) === "Object" &&
    (value = value.constructor, value === null || value === objCtor),
  error: value => value instanceof Error,
  args: value => _.arrayLike(value) &&
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
  buffer: value => {
    if (value.constructor && _.func(value.constructor.isBuffer))
      return value.constructor.isBuffer(value)
    return false
  }
}
function is(value) {
  if (value === undefined) return "undefined"
  if (value === null) return "null"

  if (_.array(value)) return "array"
  if (_.buffer(value)) return "buffer"
  if (_.error(value)) return "error"
  if (_.args(value)) return "arguments"

  const t = typeof value
  if (t === "function") {
    if (_.asyncFunc(value)) return "asyncfunction"
    if (_.genFunc(value)) return "generatorfunction"
    return t
  }
  return t
}
freeze(assign(is, _, {
  null_: _.null,
  undefined_: _.undefined,
  class_: _.class,
  NaN: _.nan,
  argument: _.args,
  arguments_: _.args,
  [toStringTag]: "is",
  toString,
  getObjName,
  getCtorName,
  isOfType,
  constructor: null,
}))
export default is