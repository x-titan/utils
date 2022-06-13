import {
  each,
  isExt,
  isFunction,
  validateType,
} from '../inherits.js'

export default function binder(obj, paramList, thisArg = obj) {
  validateType(isExt, obj, () => (
    new TypeError('First argument is not a extensible')
  ))

  each(paramList, (name) => {
    if (typeof name === 'string' && isFunction(obj[name])) {
      obj[name] = obj[name].bind(thisArg)
    }
  })

  return obj
}
