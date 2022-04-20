const { create: c, setPrototypeOf: s, assign: a, freeze: f } = Object
export default function Null() { if (!new.target) return c(null) }
a(Null, {
  constructor: Null,
  [Symbol.toStringTag]: "Null",
  toString: () => "function Null() { [native code] }"
})
f(s(Null, Null.prototype = c(null)))