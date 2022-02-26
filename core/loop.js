import each from "./each.js"
import { List } from "./list/index.js"
import is from "./types.js"

//#region Types
/** @typedef {number} n */
/** @typedef {(timestep: n) => void} _fn */
/**
 * @typedef {{
 * start: boolean,
 * maxOffsetInterval: n,
 * }} _p
 */
//#endregion

const raf = requestAnimationFrame
export class Loop {
  #key = 0
  #fn = () => void 0
  #update
  /**
   * @param {Function} fn
   * @param {Object} [opt]
   * @param {number} [opt.maxOffsetInterval]
   * @param {boolean} [opt.play]
   */
  constructor(fn, opt) {
    if (!is.func(fn)) throw new TypeError("Bad argument")
    if (typeof opt !== "object") opt = {}
    const { maxOffsetInterval: max, play } = opt
    let dT = 0, lT = 0
    const m = typeof max === "number" ? max : 40;
    this.#update = fn
    this.#fn = (T = 0) => { this.#key = raf(this.#fn); if ((dT = T - lT) < m) fn(dT / 1000); lT = T }
    if (play) this.play()
  }
  set update(value) { if (is.func(value)) this.#update = update }
  get update() { return this.#update }
  play() { if (!this.#key) this.#key = raf(this.#fn) }
  pause() {
    if (this.#key) cancelAnimationFrame(this.#key)
    this.#key = 0
  }
  isRunning() { !!this.#key }
}
export class LoopMachine extends Loop {
  #list
  constructor(fnList = [], opt) {
    const list = new List
    each(fnList, x => is.func(x) && list.push(x), false)
    super(T => list.each(x => x.value(T)), opt)
    this.#list = list
  }
  set update(value) { if (is.func(value)) this.#list.push(value) }
  get update() { return this.#list.toArray() }
  add(fn) {
    this.value = fn
    return this
  }
  has(fn) {
    if (is.func(fn)) return this.#list.has(fn)
    return false
  }
  delete(fn) {
    if (is.func(fn)) return this.#list.removeFromValue(fn)
    return this
  }
  clear() {
    this.#list.clear()
    return this
  }
}
globalThis.Loop = Loop