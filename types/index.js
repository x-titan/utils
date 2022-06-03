import {
  assign,
  getObjectType,
  isArray,
  isDefined,
  isExt,
  isFunction,
  isIterable,
  isNumber,
  isObject,
  makeValidator,
  toString,
  validateType,
} from '../inherits.js'

const objCtor = {}.constructor

const { isSafeInteger } = Number

function isOfType(type) {
  return (value) => (typeof value === type)
}

/** @return {string} */
function getConstructorName(value) {
  return (
    (isDefined(value) && isFunction(value.constructor))
      ? value.constructor.name
      : null
  )
}

/** @param {new unknown} value */
function canNew(value) {
  if (isFunction(value)) try {
    console.warn('Trying call `function` with `new`')
    new value
    return true
  } catch (e) {
    if (!e.message.includes('is not a constructor')) {
      console.error(e)
    }
  }
  return false
}

function any(exec, ...list) {
  validateType(isFunction, exec)

  let i = list.length
  if (i === 0) return false

  while (i--) {
    if (!exec(list[i])) return false
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
  defined: isDefined,
  zeroValue: (value) => (
    _.empty(value)
    || value === 0
    || _.arrayLike(value)
    && value.length === 0
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
    && getObjectType(value) === 'Object'
    && (value = value.constructor) === null
    || value === objCtor
  ),

  buffer: (value) => (
    isDefined(value)
    && isFunction(value.constructor?.isBuffer)
    && value.constructor.isBuffer(value)
  ),

  class: (value) => (
    isFunction(value)
    && ('' + value).startsWith('class ')
  ),

  arrayLike: (value) => (
    !_.empty(value)
    && _.int(value.length)
    && value.length > -1
  ),

  args: (value) => (
    _.arrayLike(value) && getObjectType(value) === 'Arguments'
  ),

  genFunc: (value) => (
    isFunction(value) && getConstructorName(value) === 'GeneratorFunction'
  ),

  asyncFunc: (value) => (
    isFunction(value) && getConstructorName(value) === 'AsyncFunction'
  ),

  array: isArray,
  iterable: isIterable,
  extensible: isExt,
  error: (value) => (value instanceof Error),
}

assign(is, _, {
  constructor: null,
  [Symbol.toStringTag]: 'is',
  null_: _.null,
  undefined_: _.undefined,
  class_: _.class,
  NaN: _.nan,
  arguments_: _.args,
  getObjectType,
  getConstructorName,
  isOfType,
  any,
  canNew,
  makeValidator,
  toString,
})

Object.freeze(is)

export default is
