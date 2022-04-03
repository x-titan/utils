import binder from "./binder.js"
import extend from "./extend.js"
import mixin from "./mixin.js"
import Mono from "./mono.js"
import Null from "./null.js"

extend(Object, {
  binder,
  extend,
  mixin,
  Mono,
  Null
})

export { binder, extend, mixin, Mono, Null }