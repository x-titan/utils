import {
  assign,
  define,
  getDesc,
  has,
  isExt,
  validateType,
} from "../include.js"

export default function extend(obj, ...sources) {
  return assign(obj, ...sources)
}

extend.pro = function (obj, ...sources) {
  validateType(isExt, obj)

  for (const o of sources) {
    for (const key in o) {
      if (has.call(o, key)) {
        define(obj, key, getDesc(o, key))
      }
    }
  }

  return obj
}
