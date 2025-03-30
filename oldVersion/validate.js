import { define, each, isFunction, isString } from "./include.js"

/**
 * @typedef {     "number"
 * | "string"   | "boolean"
 * | "function" | "object"
 * | "bigint"   | "symbol"  } NativeTypes
 */

/**
 * @typedef {<T>(value: unknown) => value is T} typeIsFn
 */

/**
 * @typedef {(value: unknown, fn: typeIsFn) => boolean} onErrorFn
 */

const eachOptsStoppable = { stoppable: true }
const defaultValidateOpts = {
  restValues: true,
  onerror: throwTypeError
}

function throwTypeError(value) {
  throw new TypeError(
    "The `" + value +
    "` being checked did not pass the check successfully."
  )
}
function defineSetterOnError(target, options) {
  define(target, "onerror", {
    set(callbackFn) {
      _checkType(defaultValidateOpts, isFunction, callbackFn)
      options.onerror = callbackFn
    },
    get() { return options.onerror }
  })
}

function _checkType(options, callbackFn, value) {
  var pass = !!callbackFn(value)

  if (!pass) return options.onerror(value)

  return pass
}

function _checkAllType(options, callbackFn, values) {
  var pass = false
  var curr = values[0]

  each(
    values,
    (value) => (!!callbackFn(curr = value)),
    eachOptsStoppable
  )

  if (!pass) return options.onerror(curr)

  return pass
}

function _checkWithRest(options, callbackFn, values) {
  var pass = !!callbackFn(...values)

  if (!pass) return options.onerror(values)

  return pass
}

/**
 * @param {NativeTypes | typeIsFn} expectType
 * @param {...unknown} values
 * @return {boolean}
 * @throws {TypeError}
 */
export function validate(expectType, ...values) {
  if (isString(expectType)) expectType = isOfType(expectType)
  if (isFunction(expectType)) {
    return _checkWithRest(defaultValidateOpts, expectType, values)
  }
  throwTypeError(expectType)
}

/**
 * @param {NativeTypes | typeIsFn} expectType
 * @param {...unknown} values
 * @return {boolean}
 * @throws {TypeError}
 */
validate.any = function validateAny(expectType, ...values) {
  if (isString(expectType)) expectType = isOfType(expectType)
  if (isFunction(expectType)) {
    return _checkAllType(defaultValidateOpts, expectType, values)
  }
  throwTypeError(expectType)
}

/**
 * @param {NativeTypes | typeIsFn} expectType
 * @param {{ onerror: onErrorFn }} options
 * @throws {TypeError}
 */
export function makeValidator(expectType, options) {
  options = { ...options, ...defaultValidateOpts }

  if (isString(expectType)) expectType = isOfType(expectType)
  if (!isFunction(expectType)) throwTypeError(expectType)

  /**
   * @param  {...unknown} values
   * @throws {TypeError}
   * @return {boolean}
   */
  function validator(...values) {
    return _checkWithRest(options, expectType, values)
  }

  /**
   * @param  {...unknown} values
   * @throws {TypeError}
   * @return {boolean}
   */
  validator.any = function (...values) {
    return _checkAllType(options, expectType, values)
  }

  defineSetterOnError(validator, options)
  return validator
}
