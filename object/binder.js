import {
  each,
  isExt,
  isFunction,
  validate,
} from "../include.js"

export default function binder(obj, paramList, thisArg = obj) {
  validate(isExt, obj)

  each(paramList, (name) => {
    if (typeof name === "string" && isFunction(obj[name])) {
      obj[name] = obj[name].bind(thisArg)
    }
  })

  return obj
}
