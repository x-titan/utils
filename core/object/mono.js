import is from "../types.js"

const _listMono = new Set(["Mono"]), onerror_blank = () => {
  throw new Error("Objects of the Mono class must be in only one instance")
}
/**
 * Сhecks whether this item is in the list and returns the result.
 * After checking, it is added to the list.
 * 
 * If the item is in the list returns "false". So it's okay.
 * 
 * Else "True". This means that the item is present in the list.
 * @param {Function} onerror <-- Calling on error
 * @class
 */
function Mono(onerror) {
  if (is.notClass(this))
    throw new Error("This element is a class. Call 'new'")
  Mono.force(this, onerror)
}
/**
 * @param {Object} self
 * @param {*} [self.]
 */
Mono.has = self => _listMono.has(self.constructor.name);
/**
 * Сhecks whether this item is in the list and returns the result.
 * After checking, it is added to the list.
 * 
 * If the item is in the list returns "false". So it's okay.
 * 
 * Else "True". This means that the item is present in the list.
 * @param {Object} self <-- "this"
 * @param {*} [self.]
 * @param {Function} onerror <-- Calling on error
 */
Mono.force = (self, onerror) => {
  if (!is.obj(self)) throw new TypeError("Bad Object")
  if (!is.func(onerror)) onerror = onerror_blank
  let x = self.constructor.name;
  if (_listMono.has(x)) onerror(); else _listMono.add(x)
}
Mono = Object.freeze(Mono)
export default Mono