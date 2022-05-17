const { iterator } = Symbol
const defaultValidatorError = (value) => {
  throw new TypeError(
    'The `' + value +
    '` being checked did not pass the check successfully.'
  )
}

export const { assign } = Object

export const {
  toString,
  hasOwnProperty: has,
} = Object.prototype

export const {
  isExtensible: isExt,
  getOwnPropertyDescriptor: getDesc,
  defineProperty: define,
} = Reflect

export const { isArray } = Array

/** @return {value is (...args)=>any} */
export function isFunction(value) {
  return typeof value === 'function'
}

/** @return {value is object} */
export function isObject(value) {
  return value !== null && typeof value === 'object'
}

/** @return {value is number} */
export function isNumber(value) {
  return isFinite(value) && typeof value === 'number'
}

export function isIterable(value) {
  return value && isFunction(value[iterator])
}

export function validateType(type, source, err) {
  if (isFunction(type) && type(source)) {
    return true
  }
  if (typeof type === 'string' && typeof source === type) {
    return true
  }

  if (err) throw err()

  defaultValidatorError(source)
}

validateType.any = function (type, ...sources) {
  if (typeof type === 'string') {
    type = (value) => (typeof value === type)
  }

  if (!isFunction(type)) {
    throw new TypeError('Required a function or string')
  }

  let i = sources.length

  while (--i) {
    if (!type(sources[i])) {
      defaultValidatorError(sources[i])
    }
  }
}

/**
 * @param {(value: unknown) => boolean} exec
 * @param {(value: unknown, fn: exec) => throw} onerror 
 * @return {(value: unknown) => void & {any: (...values: unknown[]) => void}}
 */
export function makeValidator(exec, onerror) {
  if (!isFunction(onerror)) onerror = defaultValidatorError

  let out
  switch (typeof exec) {
    case 'function': {
      out = function (value) {
        if (!exec(value)) throw onerror(value, exec)
      }
      break
    }
    case 'string': {
      out = function (value) {
        if (typeof value !== exec) throw onerror(value, out)
      }
      break
    }
    default: {
      throw new TypeError('Required a function or string.')
    }
  }

  out.any = function (...values) {
    forEach(values, out, false)
  }

  return out
}

/**
 * @param {unknown[]} arr
 * @param {(value: unknown, index: number, array: arr) => void} fn
 */
export function each(arr, fn, stoppable = false) {
  validateType(isIterable, arr)
  validateType(isFunction, fn)

  let index = 0
  for (const item of arr) {
    if (
      fn(item, index++, arr) === false
      && stoppable === true
    ) break
  }
}

/**
 * @param {object} obj
 * @param {*} [obj.]
 * @param {(value: unknown, index: number, self: obj) => void} fn
 */
each.obj = function (obj, fn, stoppable = false) {
  validateType((value) => (value !== null && value !== undefined), obj)
  validateType(isFunction, fn)

  const keys = Object.keys(obj)
  let i = keys.length, k;

  while (i--) {
    if (
      has.call(obj, k = keys[i])
      && fn(obj[k], k, obj) === false
      && stoppable === true
    ) break
  }

  return obj
}