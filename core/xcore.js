import is from "./types.js"
import each from "./each.js"
import { Extend, Mixin, Mono } from "./object.js"

class XCore {
  #version = "0.8"
  has(source) {
    return this.hasUtilsWithName(source) || this.hasOwnProperty(source)
  }
  /** @param {string} name */
  hasUtilsWithName(name) { return is.str(name) && !!XCore.prototype[name] }
  /** @param {string} name */
  define(name, value) { return XCore.define(name, value) }
  /** @param {string} name */
  static define(name, value) {
    Object.defineProperty(XCore.prototype, name, {
      value: value, configurable: false,
      writable: false, enumerable: is.array(value)
    })
    return value
  }
  get version() { return this.#version }
}
export default new XCore

XCore.define("is", is)
XCore.define("each", each)
XCore.define("Extend", Extend)
XCore.define("Mixin", Mixin)
XCore.define("Mono", Mono)