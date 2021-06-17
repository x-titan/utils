import is from "./types.js"

class XCore {
  static #version = "0.8"
  static has(source) { return is.str(source) && !!XCore.prototype[source] }
  static define(name, value) {
    if (XCore.has(name)) return value
    Object.defineProperty(XCore.prototype, name, {
      value: value, configurable: false,
      writable: false, enumerable: is.array(value)
    }); return value
  }
  /** @param {string} source */
  has(source) { XCore.has(source) }
  /** @param {string} name */
  define(name, value) { return XCore.define(name, value) }
  get version() { return XCore.#version }
}

export default new XCore