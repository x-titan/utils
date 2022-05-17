import { assign } from '../inherits.js'

export default function mixin(obj, ...sources) {
  return assign({}, obj, ...sources)
}