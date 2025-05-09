import assert from "./assert.js"

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

function _typeof(type, value) {
  return ((typeof value) === type)
}

function _toCallback(type) {
  return function (value) {
    return ((typeof value) === type)
  }
}

/**
 * @param {NativeTypes | typeIsFn} assertion
 * @param {unknown} value
 * @param {string} [message]
 * @return {void | never}
 * @throws {Error}
 */
export default function validate(assertion, value, message) {
  if (typeof assertion === "string") {
    assertion = _toCallback(assertion)
  }
  assert(
    typeof assertion === "function",
    "The first argument must be a function"
  )
  assert(assertion(value), message || "Validation error")
}

/**
 * @param {NativeTypes | typeIsFn} assertion
 * @param {...unknown} values
 * @throws {Error}
 */
validate.every = function (assertion, ...values) {
  if (typeof assertion === "string") {
    assertion = _toCallback(assertion)
  }
  assert(
    typeof assertion === "function",
    "The first argument must be a function"
  )
  for (const value of values) assert(assertion(value))
}

/** @deprecated */
validate.any = validate.every

validate.some = function (assertion, ...values) { }

/**
 * @param {NativeTypes | typeIsFn} assertion
 * @param {string} [message]
 * @throws {Error}
 */
validate.clone = function (assertion, message) {
  if (typeof assertion === "string") {
    assertion = _toCallback(assertion)
  }
  assert(
    typeof assertion === "function",
    "The first argument must be a function"
  )

  message = message || "Validation error"

  /** @throws {Error} */
  function validator(value) {
    assert(assertion(value), message)
  }
  /** @throws {Error} */
  validator.every = function (...values) {
    for (const value of values)
      assert(assertion(value), message)
  }
  return validator
}

/** @deprecated */
validate.makeValidator = validate.clone
