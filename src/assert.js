export default function assert(condition, message) {
  if (!condition) {
    throw new Error(message || "Unexpected assertion error")
  }
}

assert.fail = function (message, base) {
  if (!base) base = Error
  throw new base(message || "Unexpected assertion error")
}
