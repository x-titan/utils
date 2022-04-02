const { create, setPrototypeOf, assign, freeze } = Object
export default function Null() {
  if (!new.target)
    return create(null)
}
assign(Null, {
  prototype: setPrototypeOf(Null, create(null)),
  constructor: Null,
  [Symbol.toStringTag]: "Null",
  toString: () => "function Null() { [native code] }"
})
freeze(Null)
