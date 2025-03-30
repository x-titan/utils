import {
  each,
  isExtensible,
  isFunction,
} from "../include.js"
import { validate } from "../validate.js"

export default function binder(obj, paramList, thisArg = obj) {
  validate(isExtensible, obj)

  each(paramList, (name) => {
    if (typeof name === "string" && isFunction(obj[name])) {
      obj[name] = obj[name].bind(thisArg)
    }
  })

  return obj
}
