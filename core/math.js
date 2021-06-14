import is from "./types.js";

//#region Types
/** @typedef {number} n */
//#endregion

/** @param {n} x */
const e = (...x) => x.every(u => x(u)), num = x => (isNaN(x) || x === null) ? 0 : x,
  r = (...x) => x.reduce((a, b) => a + (is.num(b) ? 1 : 0), 0);

export class Vector2 {
  #x; #y
  /**
   * @param {n} x
   * @param {n} y
   */
  constructor(x, y) { this.set(x, y) }
  /**
   * @param {n} x
   * @param {n} y
   */
  set(x, y) { this.x = x; this.y = y }
  /**
   * @param {n} x
   * @param {n} y
   */
  add(x, y) { this.addX(x); this.addY(y) }
  /** @param {n} x */
  addX(x) { this.#x += num(x) }
  /** @param {n} y */
  addY(y) { this.#y += num(y) }
  /** @param {n} x */
  set x(x) { this.#x = num(x) }
  /** @param {n} y */
  set y(y) { this.#y = num(y) }
  get x() { return this.#x }
  get y() { return this.#y }
  copy() { return new Vector2(this.#x, this.#y) }
  valueOf() { return `${this.#x};${this.#y}` }
  toString() { return `Vector2 {x: ${this.#x}, y: ${this.#y}}` }
}
export class Vector3 {
  #x; #y; #z
  /**
   * @param {n} x
   * @param {n} y
   * @param {n} z
   */
  constructor(x, y, z) { this.set(x, y, z) }
  /**
   * @param {n} x
   * @param {n} y
   * @param {n} z
   */
  set(x, y, z) { this.x = x; this.y = y; this.z = z }
  /**
   * @param {n} x
   * @param {n} y
   * @param {n} z
   */
  add(x, y, z) { this.addX(x); this.addY(y); this.addZ(z) }
  /** @param {n} x */
  addX(x) { this.#x += num(x) }
  /** @param {n} y */
  addY(y) { this.#y += num(y) }
  /** @param {n} z */
  addZ(z) { this.#z += num(z) }
  /** @param {n} x */
  set x(x) { this.#x = num(x) }
  /** @param {n} y */
  set y(y) { this.#y = num(y) }
  /** @param {n} z */
  set z(z) { this.#z = num(z) }
  get x() { return this.#x }
  get y() { return this.#y }
  get z() { return this.#z }
  copy() { return new Vector3(this.#x, this.#y, this.#z) }
  valueOf() { return `${this.#x};${this.#y};${this.#z}` }
  toString() { return `Vector3 {x: ${this.#x}, y: ${this.#y}, z: ${this.#z}}` }
}
/**
 * @param {n} a
 * @param {n} b
 * @param {n} c
 * @param {n} d
 */
export function calcRatio(a, b, c, d) {
  if (r(a, b, c, d) !== 3) throw new Error("Bad arguments")
  if (e(a, c, d)) return a * d / c; if (e(a, b, d)) return a * d / b
  if (e(a, b, c)) return c * b / a; if (e(b, c, d)) return c * b / d
}