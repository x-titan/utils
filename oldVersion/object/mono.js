import { isFunction, isObject, } from "../include.js"
import { validate } from "../validate.js"

const monoError = (name) => {
  throw new Error(
    "Objects of the `Mono` class must be in only one instance. "
    + "This class `" + name + "` has already been used"
  )
}

/**
 * Сhecks whether this item is in the list and returns the result.
 * After checking, it is added to the list.
 *
 * If the item is in the list returns `false`. So it's okay.
 *
 * Else `true`. This means that the item is present in the list.
 */
class Mono {
  /** @param {() => throw} [onerror] Calling on error */
  constructor(onerror) { Mono.mixin(new.target, onerror) }

  /** @param {new unknown} target */
  static has(target) { return constructorList.has(target) }

  /**
   * Сhecks whether this item is in the list and returns the result.
   * After checking, it is added to the list.
   *
   * If the item is in the list returns `false`. So it's okay.
   *
   * Else `true`. This means that the item is present in the list.
   * @param {Object} target `this`
   * @param {*} [target.]
   * @param {() => throw} onerror Calling on error
   */
  static mixin(target, onerror) {
    validate(isObject, target)

    const cons = target.constructor

    if (constructorList.has(cons)) {
      return (
        isFunction(onerror)
          ? onerror()
          : monoError(cons.name)
      )
    }

    constructorList.add(cons)
    return target
  }

  /**
   * @param {new unknown} target
   * @param {() => throw} onerror
   * @return {target}
   */
  static extend(target, onerror) {
    validate(isFunction, target)

    const _ = function (...args) {
      return Mono.mixin(new target(...args), onerror)
    }

    Object.setPrototypeOf(_, _.prototype = target.prototype)

    return _.constructor = _
  }
}

const constructorList = new Set([Mono])

export default Mono
