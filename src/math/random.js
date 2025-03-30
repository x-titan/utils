import { isNumber } from "../types.js"
import minmax from "./minmax.js"

export default class Random {
  /**
   * @param {number} [seed]
   */
  constructor(seed) {
    if (!isNumber(seed)) seed = Math.random()

    /** @private */
    this._seed = seed
    /** @private */
    this._tick = seed
    this._random()
  }

  get seed() { return this._seed }
  get tick() { return this._tick }

  /** @private */
  _random() {
    return ((this._tick = (this._tick * 9301 + 49297) % 233280) / 233280)
  }

  /**
   * @param {number} min
   * @param {number} max
   * @return {number}
   */
  next(min = 0, max = 1) {
    var { min, max } = minmax(min, max)
    return (min + (this._random() * (max - min)))
  }

  /**
   * @param {number} min
   * @param {number} max
   * @return {number}
   */
  nextInt(min = 0, max = 1) {
    var { min, max } = minmax(min, max)
    return Math.round(min + (this._random() * (max - min)))
  }
}
