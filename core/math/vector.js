const { sqrt } = Math
const checkVec2 = vec => {
  if (!(vec instanceof Vector2) || !(vec instanceof Vector3))
    throw new TypeError("Error, it is expected that the arguments will be vector")
}
const checkVec3 = vec => {
  if (!(vec instanceof Vector3))
    throw new TypeError("Error, it is expected that the arguments will be vector")
}

//#region Vector2
export class Vector2 {
  constructor(x = 0, y = x) {
    this.x = (x || 0)
    this.y = (y || 0)
  }
  set(x = 0, y = x) {
    this.x = x
    this.y = y
    return this
  }
  setVec(vec) {
    checkVec2(vec)
    this.x = vec.x
    this.y = vec.y
    return this
  }
  add(x = 0, y = x) {
    this.x += x
    this.y += y
    return this
  }
  addVec(vec) {
    checkVec2(vec)
    this.x += vec.x
    this.y += vec.y
    return this
  }
  scale(x = 1, y = x) {
    this.x *= x
    this.y *= y
    return this
  }
  copy() { return new Vector2(this.x, this.y) }
  clear() {
    this.x = this.y = 0
    return this
  }
  div(x = 1, y = x) {
    this.x /= x
    this.y /= y
    return this
  }
  len() { return sqrt(this.x ** 2 + this.y ** 2) }
  normalize() {
    const len = this.len()
    if (len !== 0) this.div(len)
    return this
  }
  /** @param {Vector2 | Vector3} vec */
  static toVector2(vec) { return new Vector2(vec.x, vec.y) }
  static one() { return new Vector2(1) }
  static zero() { return new Vector2(0) }
}
//#endregion

//#region Vector3
export class Vector3 {
  constructor(x = 0, y = x, z = x) {
    this.x = (x || 0)
    this.y = (y || 0)
    this.z = (z || 0)
  }
  set(x = 0, y = x, z = x) {
    this.x = x
    this.y = y
    this.y = z
    return this
  }
  setVec(vec) {
    checkVec3(vec)
    this.x = vec.x
    this.y = vec.y
    return this
  }
  add(x = 0, y = x, z = x) {
    this.x += x
    this.y += y
    this.z += z
    return this
  }
  addVec(vec) {
    checkVec3(vec)
    this.x += vec.x
    this.y += vec.y
    return this
  }
  push(vec) {
    if (!(vec instanceof Vector3))
      throw new TypeError("Error, it is expected that the arguments will be vector")
    this.x += vec.x
    this.y += vec.y
    this.z += vec.z
    return this
  }
  scale(x = 1, y = x, z = x) {
    this.x *= x
    this.y *= y
    this.z *= z
    return this
  }
  copy() { return new Vector3(this.x, this.y, this.z) }
  clear() {
    this.x = this.y = this.z = 0
    return this
  }
  div(x = 1, y = x, z = x) {
    this.x /= x
    this.y /= y
    this.z /= z
    return this
  }
  len() { return sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2) }
  normalize() {
    const len = this.len()
    if (len !== 0) this.div(len)
    return this
  }
  /** @param {Vector2 | Vector3} vec */
  static toVector3(vec) { return new Vector3(vec.x, vec.y, vec?.z || 0) }
  static one() { return new Vector3(1) }
  static zero() { return new Vector3(0) }
}
//#endregion

//#region Export functions
export function v2(x = 0, y = x) { return new Vector2(x, y) }
v2.one = Vector2.one
v2.zero = Vector2.zero
export function v3(x = 0, y = x, z = x) { return new Vector3(x, y, z) }
v3.one = Vector3.one
v3.zero = Vector3.zero
//#endregion