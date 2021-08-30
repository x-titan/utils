import List from "./list.js"

const Stack = Object.freeze(
  class Stack {
    #list
    constructor() { this.#list = new List() }
    set(value) {
      this.#list.push(value)
      return this
    }
    get() { return this.#list.pop() }
    /**
     * @param {Function} fn
     * @param {boolean} [stoppable]
     */
    forEach(fn, stoppable) {
      this.#list.forEach(fn, stoppable || true)
      return this
    }
    clear() {
      this.#list.clear()
      return this
    }
    reverse() {
      this.#list.reverse()
      return this
    }
    toArray() { return this.#list.toArray() }
    /** @param {Array} array */
    fromArray(array) {
      this.#list.fromArray(array)
      return this
    }
    isEmpty() { return this.#list.isEmpty() }
    get length() { return this.#list.length }
  }
)
export default Stack