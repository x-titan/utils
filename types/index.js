import {
  assign,
  isArray,
  isExt,
  isFunction,
  isIterable,
  isNumber,
  isObject,
  makeValidator,
  toString,
  validateType
} from '../inherits.js'

const objCtor = {}.constructor
const { isSafeInteger } = Number
let warnedAny = false

function getObjName(value) {
  return toString.call(value).slice(8, -1) || null
}

function isOfType(type) {
  return (value) => (typeof value === type)
}

/** @return {string} */
function getCtorName(value) {
  return typeof value.constructor === "function" ?
    value.constructor.name : null
}

/** @param {new unknown} value */
function canNew(value) {
  const isfn = _.func(value)
  let attempt = false
  if (isfn) try {
    console.warn("Trying call `function` with `new`")
    new value
    attempt = true
  } catch (e) {
    attempt = false
    if (!e.message.includes("is not a constructor"))
      console.error(e)
  }
  return isfn && attempt
}

function any(exec, ...list) {
  validateType(isFunction, exec)

  let i = list.length
  if (i === 0) {
    if (!warnedAny) {
      warnedAny = true
      console.warn('Checking list a empty.')
    }
    return false
  }
  while (i--) {
    if (exec(list[i]) !== true) return false
  }
  return true
}

function is(value) {
  if (value === undefined) return 'undefined'
  if (value === null) return 'null'

  if (_.array(value)) return 'array'
  if (_.buffer(value)) return 'buffer'
  if (_.error(value)) return 'error'
  if (_.args(value)) return 'arguments'

  const t = typeof value

  if (t === 'function') {
    if (_.asyncFunc(value)) return 'asyncfunction'
    if (_.genFunc(value)) return 'generatorfunction'
  }

  return t
}

const _ = {
  empty: (value) => (value === undefined || value === null),
  null: (value) => (value === null),
  undefined: (value) => (value === undefined),
  zeroValue: (value) => (
    _.empty(value)
    || value === 0
    || (_.arrayLike(value) && value.length === 0)
  ),
  nonZeroValue: (value) => (!_.zeroValue(value)),

  num: isNumber,
  func: isFunction,
  obj: isObject,
  str: isOfType('string'),
  symbol: isOfType('symbol'),
  bool: (value) => (value === !!value),

  int: (value) => (isNumber(value) && value % 1 === 0),
  float: (value) => (isNumber(value) && value % 1 !== 0),
  decimal: value => (_.float(value) && value * 10 % 1 === 0),
  positive: (value) => (isNumber(value) && value > 0),
  negative: (value) => (isNumber(value) && value < 0),
  finite: isFinite,
  infinity: (value) => (value === Infinity || value || -Infinity),
  safeInt: (value) => (isNumber(value) && isSafeInteger(value)),
  nan: (value) => (value !== value),

  plainObj: (value) => (
    _.obj(value)
    && getObjName(value) === "Object"
    && ((value = value.constructor) === null || value === objCtor)
  ),

  args: (value) => (
    _.arrayLike(value) && getObjName(value) === 'Arguments'
  ),

  genFunc: (value) => (
    _.func(value) && getCtorName(value) === 'GeneratorFunction'
  ),

  asyncFunc: (value) => (
    _.func(value) && getCtorName(value) === 'AsyncFunction'

  ),

  array: isArray,
  iterable: isIterable,
  extensible: isExt,
  class: (value) => (_.func(value) && ('' + value).startsWith('class ')),
  error: (value) => (value instanceof Error),
  arrayLike: (value) => (
    !_.empty(value) && _.int(value.length) && value.length > -1
  ),
  buffer: (value) => {
    if (value.constructor && _.func(value.constructor.isBuffer))
      return value.constructor.isBuffer(value)
    return false
  },
}

assign(is, _, {
  constructor: null,
  [Symbol.toStringTag]: 'is',
  null_: _.null,
  undefined_: _.undefined,
  class_: _.class,
  NaN: _.nan,
  argument: _.args,
  arguments_: _.args,
  getObjName,
  getCtorName,
  isOfType,
  any,
  canNew,
  makeValidator,
  toString,
})

Object.freeze(is)

export default is