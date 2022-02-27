import Matrix from "./matrix.js"
import { AVector, IVector, v2, v3, vec, Vector, Vector2, Vector3, VECTOR_CONSTANTS } from "./vector.js"

const { PI } = Math
const PI2 = PI * 2
const TAU = PI2
const DEG_TO_RAD = PI / 180
const RAD_TO_DEG = 180 / PI

export const PI_CONSTANTS = Object.freeze({ PI, PI2, TAU })
export function radians(degree) { return degree * DEG_TO_RAD }
export function degrees(radian) { return radian * RAD_TO_DEG }
export {
  Matrix, AVector, IVector,
  v2, v3, vec, Vector, Vector2, Vector3,
  VECTOR_CONSTANTS
}