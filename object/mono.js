const isFunc = value => typeof value === "function"
const makeError = name => {
  throw new Error(
    "Objects of the `Mono` class must be in only one instance. " +
    "This class `" + name + "` has already been used")
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
  /** @param {Function} onerror Calling on error */
  constructor(onerror) {
    const target = new.target
    if (ctorList.has(target))
      return isFunc(onerror) ? onerror() : makeError(target.name)
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
   * @param {Function} onerror Calling on error
   */
  static mixin(target, onerror) {
    if (typeof target !== "object")
      throw new Error("Bad argument. Required object")
    const cons = target.constructor
    if (this.has(cons))
      return isFunc(onerror) ? onerror() : makeError(cons.name)
    ctorList.add(cons)
    return target
  }
  /**
   * @param {new unknown} target
   * @param {Function} onerror
   * @return {target}
   */
  static mono(target, onerror) {
    if (!isFunc(target))
      throw new Error("Bad argument. Required class or function")
    const _ = function (...args) {
      return Mono.mixin(new target(...args), onerror)
    }
    try {
      if (!target.prototype)
        Object.setPrototypeOf(target.prototype = {})
      target.constructor = target.prototype.constructor = _
      _.prototype = target.prototype || {}
    } catch (e) {
      console.warn("Mono error. Failed mixining class `" +
        target.name + "` to `Mono`")
      console.trace(e)
    }
    return _.constructor = _.prototype.constructor = _
  }
}
const ctorList = new Set([Mono])
export default Mono