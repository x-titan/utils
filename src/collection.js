import assert from "./assert.js"
import {
  isDefined,
  isFunction,
  isIterable,
} from "./types.js"

const nope = {}
const { has } = Reflect

/**
 * @template T
 * @param {T[] | Iterable<T>} collection
 * @param {(value: T, index: number, thisArg: collection) => boolean} callback
 * @param {{ stoppable: boolean, thisArg: collection | any }} options
 * @returns 
 */
export function each(collection, callback, options) {
  assert(isIterable(collection), "collection must be a iterable")
  assert(isFunction(callback), "callback must be a function")

  const {
    thisArg = collection,
    stoppable = false,
  } = (options || nope)

  var index = 0
  for (const element of collection) {
    if (callback.call(
      thisArg,
      element,
      index++,
      collection,
    ) && (stoppable === true)) break
  }
  return collection
}

/**
 * @template T
 * @param {T} target
 * @param {(value: any, key: string, thisArg: target) => boolean} callback
 * @param {{ stoppable: boolean, thisArg: target | any }} options
 * @returns 
 */
each.keys = function (target, callback, options) {
  assert(isDefined(target), "target must be a object")
  assert(isFunction(callback), "callback must be a function")

  const {
    thisArg = collection,
    stoppable = false,
  } = (options || nope)

  for (const key in target) {
    if (has(target, key) && callback.call(
      thisArg,
      target[key],
      key,
      collection,
    ) && (stoppable === true)) break
  }
}

export function every(collection, callback) {
  assert(isIterable(collection), "collection must be a iterable")
  assert(isFunction(callback), "callback must be a function")

  var pass = false
  var index = 0
  for (const element of collection) {
    if (!(pass = !!callback.call(
      collection,
      element,
      index++,
      collection,
    ))) break
  }
  return pass
}

export function some(collection, callback) {
  assert(isIterable(collection), "collection must be a iterable")
  assert(isFunction(callback), "callback must be a function")

  var pass = false
  var index = 0
  for (const element of collection) {
    if (pass = !!callback.call(
      collection,
      element,
      index++,
      collection,
    )) break
  }
  return pass
}

export function filter(collection, callback, options) {

}
