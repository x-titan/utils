import each from "../array/each.js"
import is from "../types/types.js"

const isExt = Reflect.isExtensible
/**
 * @param {object} obj
 * @param {*} [obj.]
 * @param {string[]} paramList
 * @param {obj} thisArg
 */
export default function binder(obj, paramList, thisArg = obj) {
  if (!isExt.call(obj))
    throw new Error("First argument is not a extensible")
  each(paramList, name => {
    if (is.str(name) && is.func(obj[name]))
      obj[name] = obj[name].bind(thisArg)
  })
  return obj
}