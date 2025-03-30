import {
  assign,
  define,
  getDesc,
  has,
  isExtensible,
  
} from "../include.js"
import { validate } from "../validate.js"

export default function extend(obj, ...sources) {
  return assign(obj, ...sources)
}

extend.pro = function (obj, ...sources) {
  validate(isExtensible, obj)

  for (const o of sources) {
    for (const key in o) {
      if (has.call(o, key)) {
        define(obj, key, getDesc(o, key))
      }
    }
  }

  return obj
}
