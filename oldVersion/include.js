import { validate } from "./validate.js"

const plainObj = {}

const { iterator } = Symbol

export const { assign } = Object

/** @type {(arg: unknown) => arg is unknown[]} */
export const isArray = Array.isArray

export const {
  toString,
  hasOwnProperty: has,
} = Object.prototype

export const {
  isExtensible,
  getOwnPropertyDescriptor: getDesc,
  defineProperty: define,
} = Reflect

export function isDefined(value) {
  return (value !== null) && (value !== undefined)
}

/** @return {value is (...args: unknown[]) => unknown} */
export function isFunction(value) {
  return ((typeof value) === "function")
}

/** @return {value is object} */
export function isObject(value) {
  return (value !== null) && ((typeof value) === "object")
}

/** @return {value is number} */
export function isNumber(value) {
  return ((typeof value) === "number") && isFinite(value)
}

/** @return {value is string} */
export function isString(value) {
  return ((typeof value) === "string")
}


/** @return {value is Iterable} */
export function isIterable(value) {
  return isDefined(value) && isFunction(value[iterator])
}

/**
 * @template T
 * @param {T[] | ArrayLike<T> | Iterable<T>} arr
 * @param {(value: T, index: number, thisArg: arr) => boolean} fn
 * @param {{stoppable: boolean, thisArg: arr}} [config]
 */
export function each(arr, fn, config) {
  validate(isIterable, arr)
  validate(isFunction, fn)

  const {
    stoppable = false,
    thisArg = null,
  } = (config || plainObj)

  let index = 0

  for (const item of arr) {
    if ((fn.call(thisArg, item, index++, arr) === false) && stoppable) {
      break
    }
  }

  return arr
}
each([1, 2, 3], (r) => { })
/**
 * @template T
 * @param {T[] | ArrayLike<T> | Iterable<T>} arr
 * @param {(value: T, index: number, thisArg: arr) => void} fn
 * @param {{stoppable: boolean, thisArg: arr}} [config]
 */
each.reverse = function (arr, fn, config = plainObj) {
  validate(isArray, arr)
  validate(isFunction, fn)

  const {
    stoppable = false,
    ctx = null,
  } = (config || plainObj)

  let index = arr.length

  while (index--) {
    if ((fn.call(ctx, arr[index], index, arr) === false) && stoppable) {
      break
    }
  }

  return arr
}

/**
 * @param {object} obj
 * @param {(value: unknown, index: number, thisArg: obj) => boolean} fn
 * @param {{stoppable: boolean, thisArg: arr}} [config]
 */
each.obj = function (obj, fn, config) {
  validate(isDefined, obj)
  validate(isFunction, fn)

  const {
    stoppable = false,
    ctx = null,
  } = (config || plainObj)

  const keys = Object.keys(obj)

  let i = keys.length, k;

  while (i--) {
    if (
      has.call(obj, k = keys[i])
      && (fn.call(ctx, obj[k], k, obj) === false)
      && stoppable
    ) break
  }

  return obj
}
