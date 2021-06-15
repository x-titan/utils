import is from "./types.js"
import each from "./each.js"
import { Extend, Mixin, Mono } from "./object.js"
import { Vector2, Vector3, calcRatio } from "./math.js"

class XCore {
  #version = "0.8"
  constructor() {
    this.define("is", is)
    this.define("each", each)
    this.define("Vector2", Vector2)
    this.define("Vector3", Vector3)
    this.define("calcRatio", calcRatio)
  }
  has(source) {
    return this.hasUtilsWithName(source) || this.hasOwnProperty(source)
  }
  hasUtilsWithName(name) { return is.str(name) && !!XCore.prototype[name] }
  define(name, value) {
    Object.defineProperty(XCore.prototype, name, {
      value: value, configurable: false,
      writable: false, enumerable: is.array(value)
    })
  }
  get version() { return this.#version }
}
export default new XCore;