import { isFunction, isObject, validateType } from "../include.js"

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
  constructor(onerror) {
    const target = new.target

    if (ctorList.has(target)) {
      return (
        isFunction(onerror)
          ? onerror()
          : monoError(target.name)
      )
    }
    ctorList.add(target)
  }

  /** @param {new unknown} target */
  static has(target) { return ctorList.has(target) }

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
    validateType(isObject, target)

    const cons = target.constructor

    if (this.has(cons)) {
      return (
        isFunction(onerror)
          ? onerror()
          : monoError(cons.name)
      )
    }

    ctorList.add(cons)
    return target
  }

  /**
   * @param {new unknown} target
   * @param {() => throw} onerror
   * @return {target}
   */
  static mono(target, onerror) {
    validateType(isFunction, target)

    const _ = function (...args) {
      return Mono.mixin(new target(...args), onerror)
    }

    try {
      if (!target.prototype) {
        Object.setPrototypeOf(target, target.prototype = {})
      }

      target.constructor = target.prototype.constructor = _
      Object.setPrototypeOf(_, _.prototype = target.prototype || {})
    } catch (e) {
      console.warn(
        "Mono error. Failed mixining class `"
        + target.name + "` to `Mono`"
      )
      console.trace(e)
    }

    return _.constructor = _.prototype.constructor = _
  }
}

const ctorList = new Set([Mono])

export default Mono
