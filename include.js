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
  isExtensible: isExt,
  getOwnPropertyDescriptor: getDesc,
  defineProperty: define,
} = Reflect

export function isDefined(value) {
  return (value !== null) && (value !== undefined)
}

/** @return {value is (...args: unknown[]) => unknown} */
export function isFunction(value) {
  return (typeof value) === "function"
}

/** @return {value is object} */
export function isObject(value) {
  return (value !== null) && ((typeof value) === "object")
}

/** @return {value is number} */
export function isNumber(value) {
  return isFinite(value) && ((typeof value) === "number")
}

/** @return {value is Iterable} */
export function isIterable(value) {
  return isDefined(value) && isFunction(value[iterator])
}

function defaultValidatorError(value) {
  throw new TypeError(
    "The `" + value +
    "` being checked did not pass the check successfully."
  )
}

/** @typedef {"number"|"string"|"boolean"|"object"|"symbol"|"function"} NativeTypes */

/**
 * @param {NativeTypes | (value: unknown) => boolean} type
 * @param {unknown} source
 * @param {() => Error} err
 * @return {boolean}
 */
export function validateType(type, source, err) {
  if (((typeof source) === type) || (isFunction(type) && type(source))) {
    return true
  }

  if (isFunction(err)) throw err()

  defaultValidatorError(source)
}

/**
 * @param {string | (value: unknown) => boolean} type
 * @param {...unknown} sources
 */
validateType.any = function (type, ...sources) {
  if ((typeof type) === "string") {
    type = ((value) => ((typeof value) === type))
  }

  validateType("function", type)

  let i = sources.length

  while (--i) (validateType(type, sources[i], type))

  return true
}

/**
 * @param {(value: unknown) => boolean} exec
 * @param {(value: unknown, fn: exec) => throw} onerror
 * @return {((value: unknown) => void) & {any: (...values: unknown[]) => void}}
 */
export function makeValidator(exec, onerror) {
  if (!isFunction(onerror)) onerror = defaultValidatorError

  const out = (value) => (validateType(exec, value, onerror))

  out.any = function (...values) { each(values, out, false) }

  return out
}

/**
 * @param {unknown[]} arr
 * @param {(value: unknown, index: number, array: arr) => void} fn
 * @param {{stoppable: ?boolean, ?ctx}} [config]
 */
export function each(arr, fn, config) {
  validateType(isIterable, arr)
  validateType(isFunction, fn)

  const {
    stoppable = false,
    ctx = null,
  } = (config || plainObj)

  let index = 0

  for (const item of arr) {
    if ((fn.call(ctx, item, index++, arr) === false) && stoppable) {
      break
    }
  }

  return arr
}

/**
 * @param {unknown[]} arr
 * @param {(value: unknown, index: number, array: arr) => void} fn
 * @param {{stoppable: ?boolean, ?ctx}} [config]
 */
each.reverse = function (arr, fn, config = plainObj) {
  validateType(isArray, arr)
  validateType(isFunction, fn)

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
 * @param {(value: unknown, index: number, self: obj) => void} fn
 * @param {{stoppable: ?boolean, ?ctx}} [config]
 */
each.obj = function (obj, fn, config) {
  validateType(isDefined, obj)
  validateType(isFunction, fn)

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
