const { freeze, assign, setPrototypeOf } = Object
const { toString } = Reflect
const { isInteger, isSafeInteger } = Number
const { iterator, toStringTag } = Symbol
const objCtor = {}.constructor
let warnedAny = false
let warnedMakeValidator = false
/** @return {string} */
function getCtorName(value) {
  return typeof value.constructor === "function" ?
    value.constructor.name : null;
}
/** @return {string} */
function getObjName(value) {
  return toString.call(value).slice(8, -1) || null
}
function isOfType(type) {
  return value => typeof value === type;
}
function makeValidator(valid, onerror) {
  if (!_.func(onerror)) {
    onerror = (value) => {
      throw new TypeError("The `" + value +
        "` being checked did not pass the check successfully.")
    }
  }
  switch (typeof valid) {
    case "function":
      return value => {
        if (valid(value) === false)
          throw onerror(value, valid)
      }
    case "string":
      return value => {
        if (is(value) !== valid)
          throw onerror(value, is)
      }
    default:
      if (!warnedMakeValidator) {
        warnedMakeValidator = true
        console.warn("Type of `valid = " + valid +
          "` not supported or undefined. Using `is.nonZeroValue`.")
      }
      return value => {
        if (!_.nonZeroValue(value))
          throw onerror(value, _.nonZeroValue)
      }
  }
}
function any(exec, ...list) {
  if (!_.func(exec))
    throw new Error("First argument is not a function.")
  let i = list.length
  if (i === 0) {
    if (!warnedAny) {
      warnedAny = true
      console.warn("Checking list a empty.")
    }
    return false
  }
  while (i--)
    if (exec(list[i]) !== true)
      return false
  return true
}
/** @param {new unknown} value */
function canNew(value) {
  const isfn = _.func(value)
  let attempt = false
  if (isfn) try {
    new value
    attempt = true
  } catch (e) {
    attempt = false
    if (!e.message.includes("is not a constructor"))
      console.trace(e)
  }
  return isfn && attempt
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
const _ = {
  empty: value => value === undefined || value === null,
  null: value => value === null,
  undefined: value => value === undefined,
  zeroValue: value => _.empty(value) || value === 0 ||
    ((_.str(value) || _.arrayLike(value)) && value.length === 0),
  nonZeroValue: value => !_.zeroValue(value),

  num: isFinite,
  str: isOfType("string"),
  symbol: isOfType('symbol'),
  bool: value => value === !!value,

  func: isOfType("function"),
  genFunc: value => _.func(value) &&
    getCtorName(value) === "GeneratorFunction",
  asyncFunc: value => _.func(value) &&
    getCtorName(value) === "AsyncFunction",
  anonymFunc: value => _.func(value) && !canNew(value),

  obj: value => !_.empty(value) && typeof value === "object",
  plainObj: value => _.obj(value) && getObjName(value) === "Object" &&
    (value = value.constructor, value === null || value === objCtor),

  class: value => _.func(value) && ("" + value).startsWith('class '),
  notClass: value => _.empty(value) || value === globalThis,
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
assign(is, _, {
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
  canNew,
  any,
  makeValidator,
  constructor: null
})
freeze(setPrototypeOf(is, is.prototype = Object.create(null)))
export default is