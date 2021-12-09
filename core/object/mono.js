import is from "../types.js"

const _listMono = new Set(["Mono"]), onerror_ = () => {
  throw new Error("Objects of the Mono class must be in only one instance")
}
const Mono = Object.freeze(
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
    constructor(onerror) { Mono.force(this, onerror) }
    /**
     * @param {Object} self
     * @param {*} [self.]
     */
    static has(self) { _listMono.has(self.constructor.name) }
    /**
     * Сhecks whether this item is in the list and returns the result.
     * After checking, it is added to the list.
     *
     * If the item is in the list returns `false`. So it's okay.
     *
     * Else `true`. This means that the item is present in the list.
     * @param {Object} self `this`
     * @param {*} [self.]
     * @param {Function} onerror Calling on error
     */
    static force(self, onerror) {
      if (!is.obj(self)) throw new TypeError("Bad Object")
      if (!is.func(onerror)) onerror = onerror_
      if (_listMono.has(self = self.constructor.name)) onerror(); else _listMono.add(self)
    }
  }
)
export default Mono