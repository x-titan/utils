import {
  assign,
  define,
  getDesc,
  has,
  isExt,
  isFunction,
  isObject,
  validateType,
} from "../inherits.js"

export default function extend(obj, ...sources) {
  return assign(obj, ...sources)
}

extend.pro = function (obj, ...sources) {
  validateType(isExt, obj)

  for (const o of sources) {
    if (isObject(o) || isFunction(o)) {
      for (const key in o) {
        if (has.call(o, key)) {
          define(obj, key, getDesc(o, key))
        }
      }
    }
  }

  return obj
}
