import List from "./index.js"

const Stack = Object.freeze(class Stack {
  #list
  constructor() { this.#list = new List() }
  set(value) {
    this.#list.push(value)
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

export default Stack