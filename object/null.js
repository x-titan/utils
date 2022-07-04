const {
  create: c,
  setPrototypeOf: s,
  assign: a,
  freeze: f,
} = Object

const { toStringTag } = Symbol

/** @return {{}} */
export default function Null() {
  if (!new.target) return c(null)
}

a(Null, {
  constructor: Null,
  [toStringTag]: "Null",
  toString: () => (
    `function ${this[toStringTag]
    || "Unknown"}() { [native code] }`
  )
})

f(s(Null, Null.prototype = c(null)))
Null.prototype.constructor = Null
