import each from "../each.js"
import is from "../types.js"

const Item = Object.freeze(class Item {
  /**
   * @param {*} value
   * @param {Item} next
   * @param {Item} prev
   */
  constructor(value, next = null, prev = null) {
    this.value = value
    this.next = next
    this.prev = prev
  }
})

const List = Object.freeze(class List {
  /** @type {Item} */ #head
  /** @type {Item} */ #last
  constructor() { this.#head = this.#last = null }
  unshift(value) {
    let x = new Item(value, this.#head)
    if (this.#head) this.#head.prev = x
    this.#head = x
    if (!this.#last) this.#last = x
    return this
  }
  push(value) {
    let x = new Item(value)

    if (!this.#head) this.#head = this.#last = x
    else {
      x.prev = this.#last
      this.#last = this.#last.next = x
    }
    return this
  }
  pop() {
    let x = this.#last
    if (this.#last.prev) {
      this.#last = this.#last.prev
      this.#last.next = null
    }
    else this.#head = this.#last = null
    return x.value
  }
  shift() {
    let x = this.#head
    if (this.#head.next) {
      this.#head = this.#head.next
      this.#head.prev = null
    } else this.#head = this.#last = null
    return x.value
  }
  /**
   * @param {Function} fn
   * @param {boolean} [stoppable]
   */
  forEach(fn, stoppable = true) {
    if (this.isEmpty() || !is.func(fn)) return this
    let i = 0, h = this.#head
    while (h) {
      if (fn(h.value, i++, this) === false && stoppable) break
      h = h.next
    }
    return this
  }
  has(value) {
    let has = false
    this.forEach(v => {
      if (has = (v === value)) return false
    })
    return has
  }
  clear() {
    this.#head = this.#last = null
    return this
  }
  reverse() {
    if (this.isEmpty()) return
    let t, h = this.#head, x = h;
    while (h) {
      t = h.prev;
      h.prev = h.next;
      h.next = t;
      h = h.prev;
    }
    this.#head = this.#last
    this.#last = x
    return this
  }
  toArray() {
    let x = []
    this.forEach(value => x.push(value))
    return x
  }
  /** @param {Array} array */
  fromArray(array) {
    if (!is.array(array)) return this
    this.clear()
    each(array, this.push.bind(this), false)
    return this
  }
  isEmpty() { return is.empty(this.#head) }
  get length() {
    if (this.isEmpty()) return 0
    let i = 1, h = this.#head
    while (h.next && ++i) h = h.next
    return i
  }
})

export default List