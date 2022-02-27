const { seal, freeze } = Object
const { sqrt } = Math
const isNum = n => typeof n === "number" || n instanceof Number

const notImp = name => new Error(name + " is not implemented")
const AXIS = Symbol("axis")
const X = 0
const Y = 1
const Z = 2

//#region IVector and AVector
export class IVector {
  constructor(x = 0, y = x, z = x) {
    this[AXIS] = seal([
      x || 0,
      y || 0,
      z || 0])
  }
  get x() { return this[AXIS][X] }
  get y() { return this[AXIS][Y] }
  get z() { return this[AXIS][Z] }
  /**
   * @param {*} vec
   * @returns {vec is {x:number,y:number,z:?number}}
   */
  static isVectorLike(vec) {
    const t = typeof vec
    if (t === "object" || t === "function")
      if (isNum(vec?.x) && isNum(vec?.y)) return true
    return false
  }
  static zero() { return new IVector(0) }
  static one() { return new IVector(1) }
  toJSON() { return { x: this.x, y: this.y, z: this.z } }
  toArray() { return [this.x, this.y, this.z] }
  toString() { return "[" + this.constructor.name + " " + this.x + "," + this.y + "," + this.z + "]" }
  /**
   * @param {*} vec
   * @returns {vec is IVector}
   */
  static isIVector(vec) { return vec instanceof IVector }
}
export class AVector extends IVector {
  constructor(x = 0, y = x, z = x) { super(x, y, z) }
  get x() { return this[AXIS][X] }
  get y() { return this[AXIS][Y] }
  get z() { return this[AXIS][Z] }
  set x(x) { throw notImp("set x()") }
  set y(y) { throw notImp("set y()") }
  set z(z) { throw notImp("set z()") }
  add(x, y, z) { throw notImp("add()") }
  div(x, y, z) { throw notImp("div()") }
  mul(x, y, z) { throw notImp("mul()") }
  set(x, y, z) { throw notImp("set()") }
  setVec(vec) { throw notImp("setVec()") }
  calc(operator, vec) { throw notImp("calc()") }
  negative() { throw notImp("negative()") }
  normalize() { throw notImp("normalize()") }
  clear() { throw notImp("clear()") }
  dist(x, y, z) {
    return sqrt(
      (this.x - x) ** 2 +
      (this.y - y) ** 2 +
      (this.z - z) ** 2)
  }
  distance(vec) {
    return sqrt(
      (this.x - vec.x) ** 2 +
      (this.y - vec.y) ** 2 +
      (this.z - vec.z) ** 2)
  }
  /** @returns {IVector} */
  clone() {
    return new this.constructor(this.x, this.y, this.z)
  }
  len() { return AVector.len4D(this) }
  copy() { this.clone() }
  equals(vec) {
    return this.x === vec.x &&
      this.y === vec.y &&
      this.z === vec.z
  }
  toVector() { return new Vector(this.x, this.y, this.z) }
  static assign(vec, vec_) {
    return new vec
      .constructor(
        vec.x + vec_.x,
        vec.y + vec_.y,
        vec.z + vec_.z)
  }
  /** @returns {IVector} */
  static normalize2D(vec) {
    const len = vec.len2D()
    return new vec.constructor(vec.x / len, vec.y / len, 0)
  }
  /** @returns {IVector} */
  static normalize3D(vec) {
    const len = vec.len3D()
    return new vec
      .constructor(
        vec.x / len,
        vec.y / len,
        vec.z / len)
  }
  /** @returns {IVector} */
  static normalize4D(vec) {
    const len = vec.len4D()
    return new vec
      .constructor(
        vec.x / len,
        vec.y / len,
        vec.z / len)
  }
  static len2D(vec) {
    return sqrt(vec.x ** 2 + vec.y ** 2)
  }
  static len3D(vec) {
    return sqrt(vec.x ** 2 + vec.y ** 2 + vec.z ** 2)
  }
  static dot2D(vec, vec_) {
    return vec.x * vec_.x + vec.y * vec_.y
  }
  static dot3D(vec, vec_) {
    return vec.x * vec_.x + vec.y * vec_.y + vec.z * vec_.z
  }
  /** @returns {vec is AVector} */
  static isAVector(vec) { vec instanceof AVector }
}
//#endregion

//#region Vector
export class Vector extends AVector {
  constructor(x, y, z) { super(x, y, z) }
  get x() { return this[AXIS][X] }
  get y() { return this[AXIS][Y] }
  get z() { return this[AXIS][Z] }
  set x(x) { this[AXIS][X] = x || 0 }
  set y(y) { this[AXIS][Y] = y || 0 }
  set z(z) { this[AXIS][Z] = z || 0 }
  len() { return AVector.len3D(this) }
  add(x = 0, y = x, z = x) {
    this.x += x
    this.y += y
    this.z += z
    return this
  }
  div(x = 1, y = x, z = x) {
    this.x /= x
    this.y /= y
    this.z /= z
    return this
  }
  mul(x = 1, y = x, z = x) {
    this.x *= x
    this.y *= y
    this.z *= z
    return this
  }
  set(x = 0, y = x, z = x) {
    this.x = x
    this.y = y
    this.z = z
    return this
  }
  negative() { return this.mul(-1) }
  setVec(vec) {
    this.x = vec.x
    this.y = vec.y
    this.z = vec.z
    return this
  }
  clear() { return this.set(0) }
  normalize() { return sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2) }
  /** @returns {vec is Vector} */
  static isVector(vec) { return vec instanceof Vector }
}
export class Vector2 extends Vector {
  constructor(x, y) { super(x, y, 0, 0) }
  get x() { return this[AXIS][X] }
  get y() { return this[AXIS][Y] }
  get z() { return 0 }
  set x(x) { this[AXIS][X] = x || 0 }
  set y(y) { this[AXIS][Y] = y || 0 }
  set z(z) { }
  len() { return AVector.len2D(this) }
}
export class Vector3 extends Vector {
  constructor(x, y) { super(x, y, 0, 0) }
  get x() { return this[AXIS][X] }
  get y() { return this[AXIS][Y] }
  get z() { return this[AXIS][Z] }
  set x(x) { this[AXIS][X] = x || 0 }
  set y(y) { this[AXIS][Y] = y || 0 }
  set z(z) { this[AXIS][Z] = z || 0 }
  len() { return AVector.len3D(this) }
}
//#endregion

//#region Vector constants
export const VECTOR_CONSTANTS = freeze({
  ZERO: new AVector(0, 0, 0),
  ONE: new AVector(1, 1, 1),
  LEFT: new AVector(-1, 0, 0),
  RIGHT: new AVector(1, 0, 0),
  FORWARD: new AVector(0, -1, 0),
  BACK: new AVector(0, 1, 0),
  TOP: new AVector(0, 0, -1),
  BOTTOM: new AVector(0, 0, -1)
})
//#endregion

//#region Export functions
export function avec(x = 0, y = x, z = x) { return new AVector(x, y, z) }
avec.one = () => VECTOR_CONSTANTS.ONE
avec.zero = () => VECTOR_CONSTANTS.ZERO
export function vec(x = 0, y = x, z = x) { return new Vector(x, y, z) }
vec.one = Vector.one
vec.zero = Vector.zero
export function v2(x = 0, y = x) { return new Vector2(x, y) }
v2.one = Vector2.one
v2.zero = Vector2.zero
export function v3(x = 0, y = x, z = x) { return new Vector3(x, y, z) }
v3.one = Vector3.one
v3.zero = Vector3.zero
//#endregion