const {
  create,
  setPrototypeOf,
} = Object

const { toStringTag } = Symbol

/** @return {Null} */
export default function Null() {
  return create(null)
}

setPrototypeOf(Null, Null.prototype = create(null))
