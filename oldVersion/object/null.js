const {
  create,
} = Object

export default function createNullObject() {
  return create(null)
}

createNullObject.prototype = create(null)
