import List from "./list.js"

const Queue = Object.freeze(class Queue {
  #list
  constructor() { this.#list = new List() }
  set(value) {
    this.#list.unshift(value)
    return this
  }
  get() { return this.#list.pop() }
  forEach(fn) {
    this.#list.forEach(fn)
    return this
  }
  reverse() { this.#list.reverse() }
  isEmpty() { return this.#list.isEmpty() }
})

export default Queue