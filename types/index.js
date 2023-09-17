import {
  assign,
  isArray,
  isDefined,
  isExt,
  isFunction,
  isIterable,
  isNumber,
  isObject,
  toString,
  validate,
} from "../include.js"

const objCtor = {}.constructor

const { isSafeInteger } = Number

function isOfType(type) {
  return (value) => (typeof value === type)
}

/** @return {string} */
function getObjectName(value) {
  return toString.call(value).slice(8, -1) || null
}

/** @return {string} */
function getConstructorName(value) {
  return (
    (isDefined(value) && isFunction(value.constructor))
      ? value.constructor.name
      : null
  )
}

function any(exec, ...list) {
  validate(isFunction, exec)

  let i = list.length

  while (i !== 0) {
    if (!exec(list[--i])) return false
  }

  return true
}

export function is(value) {
  if (value === undefined) return "undefined"
  if (value === null) return "null"
  if (_.array(value)) return "array"

  return typeof value
}

const _ = {
  empty: (value) => ((value === undefined) || (value === null)),
  null: (value) => (value === null),
  undefined: (value) => (value === undefined),
  defined: isDefined,
  zeroValue: (value) => (
    !isDefined(value)
    || (value === 0)
    || (_.arrayLike(value)
      && (value.length === 0))
  ),
  nonZeroValue: (value) => (!_.zeroValue(value)),

  num: isNumber,
  func: isFunction,
  obj: isObject,
  str: isOfType("string"),
  symbol: isOfType("symbol"),
  bool: (value) => (value === !!value),

  int: (value) => (isNumber(value) && ((value % 1) === 0)),
  uint: (value) => (_.int(value) && (value >= 0)),
  float: (value) => (isNumber(value) && ((value % 1) !== 0)),
  unsigned: (value) => (isNumber(value) && (value >= 0)),
  positive: (value) => (isNumber(value) && (value > 0)),
  negative: (value) => (isNumber(value) && (value < 0)),
  finite: isFinite,
  infinity: (value) => ((value === Infinity) || (value === -Infinity)),
  safeInt: (value) => (isNumber(value) && isSafeInteger(value)),
  nan: (value) => (value !== value),

  plainObj: (value) => (
    isObject(value)
    && (getObjectName(value) === "Object")
    && ((value = value.constructor) === null)
    || (value === objCtor)
  ),

  buffer: (value) => (
    isDefined(value)
    && isFunction(value.constructor?.isBuffer)
    && value.constructor.isBuffer(value)
  ),

  class: (value) => (
    isFunction(value)
    && Function.toString.call(value).startsWith("class ")
  ),

  arrayLike: (value) => (
    isDefined(value)
    && _.uint(value.length)
  ),

  args: (value) => (
    _.arrayLike(value)
    && getObjectName(value) === "Arguments"
  ),

  genFunc: (value) => (
    isFunction(value)
    && getConstructorName(value) === "GeneratorFunction"
  ),

  asyncFunc: (value) => (
    isFunction(value)
    && getConstructorName(value) === "AsyncFunction"
  ),

  arr: isArray,
  array: isArray,
  iterable: isIterable,
  ext: isExt,
  extensible: isExt,
  error: (value) => (value instanceof Error),
}

assign(is, _, {
  constructor: null,
  prototype: null,
  [Symbol.toStringTag]: "TypeOf",
  null_: _.null,
  undefined_: _.undefined,
  class_: _.class,
  arguments_: _.args,
  any,
  err: _.error,
  toString,
})

Object.freeze(is)
