import {
  assign,
  isArray,
  isDefined,
  isExtensible,
  isFunction,
  isIterable,
  isNumber,
  isObject,
  toString,

} from "../include.js"
import { validate } from "../validate.js"

const objCtor = {}.constructor

const { isSafeInteger } = Number

function isOfType(type) {
  return (value) => (typeof value === type)
}

/** @return {string} */
function getObjectName(value) {
  return toString.call(value).slice(8, -1)
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

export default function is(value) {
  if (value === null) return "null"
  if (isArray(value)) return "array"

  return typeof value
}

const _ = {

  //#region Defined and Undefined types
  defined: isDefined,
  empty: (value) => ((value === null) || (value === undefined)),
  null: (value) => (value === null),
  undefined: (value) => (value === undefined),
  //#endregion

  //#region Primitive types
  num: isNumber,
  str: isOfType("string"),
  bool: (value) => (value === !!value),
  func: isFunction,
  obj: isObject,
  //#endregion

  //#region Function types
  genFunc: (value) => (
    isFunction(value)
    && (getConstructorName(value) === "GeneratorFunction")
  ),

  asyncFunc: (value) => (
    isFunction(value)
    && (getConstructorName(value) === "AsyncFunction")
  ),

  args: (value) => (
    _.arrayLike(value)
    && (getObjectName(value) === "Arguments")
  ),
  //#endregion

  //#region Object definitions
  class: (value) => (
    isFunction(value)
    && Function.toString.call(value).startsWith("class ")
  ),

  extensible: isExtensible,
  //#endregion

  //#region Iterable types
  arr: isArray,
  array: isArray,
  iterable: isIterable,

  arrayLike: (value) => (
    isDefined(value)
    && _.uint(value.length)
  ),
  //#endregion

  //#region Number definitions
  int: (value) => (isNumber(value) && ((value % 1) === 0)),
  uint: (value) => (_.int(value) && (value >= 0)),
  float: (value) => (isNumber(value) && ((value % 1) !== 0)),
  unsigned: (value) => (isNumber(value) && (value >= 0)),
  positive: (value) => (isNumber(value) && (value > 0)),
  negative: (value) => (isNumber(value) && (value < 0)),
  finite: (value) => (isNumber(value) && isFinite(value)),
  infinity: (value) => ((value === Infinity) || (value === -Infinity)),
  safeInt: (value) => (isNumber(value) && isSafeInteger(value)),
  nan: (value) => (value !== value),
  //#endregion

  //#region ES6 Features 
  symbol: isOfType("symbol"),
  bigInt: isOfType("bigint"),

  promise: (value) => (
    isFunction(value)
    && getConstructorName(value) === "Promise"
  ),

  map: (value) => (
    isFunction(value)
    && getConstructorName(value) === "Map"
  ),

  set: (value) => (
    isFunction(value)
    && getConstructorName(value) === "Set"
  ),
  //#endregion

  //#region JS Features
  error: (value) => (value instanceof Error),
  //#endregion

  //#region Unstandard Features
  buffer: (value) => (
    isDefined(value)
    && isFunction(value.constructor?.isBuffer)
    && value.constructor.isBuffer(value)
  ),
  //#endregion

  //#region Uncategory methods
  plainObj: (value) => (
    isObject(value)
    && (getObjectName(value) === "Object")
    && (
      ((value = value.constructor) === null)
      || (value === objCtor)
    )
  ),

  zeroValue: (value) => (
    _.empty(value)
    || (value === 0)
    || (value.length === 0)
    || (Object.keys(value).length === 0)
  ),
  nonZeroValue: (value) => (!_.zeroValue(value)),
  //#endregion
}

assign(is, _, {
  constructor: null,
  prototype: null,

  [Symbol.toStringTag]: "TypeOf",
  toString,

  null_: _.null,
  undefined_: _.undefined,
  class_: _.class,
  arguments_: _.args,

  any,
})

Object.freeze(is)
