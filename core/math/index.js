import constants from "./constants.js"
import { AVector } from "./vector.js"
export * from "./vector.js"
export * from "./matrix.js"

const { assign } = Object

export const CONSTANTS = assign(constants, {
  ZERO: new AVector(0, 0, 0),
  ONE: new AVector(1, 1, 1),
  LEFT: new AVector(-1, 0, 0),
  RIGHT: new AVector(1, 0, 0),
  FORWARD: new AVector(0, -1, 0),
  BACK: new AVector(0, 1, 0),
  TOP: new AVector(0, 0, -1),
  BOTTOM: new AVector(0, 0, -1)
})