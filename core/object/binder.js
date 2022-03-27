import each from "../each.js"
import is from "../types.js"

/**
 * @param {Object} obj
 * @param {*} [obj.]
 * @param {string[]} paramList
 * @param {obj} self
 */
export default function binder(obj, paramList, self = obj) {
  if (is.empty(obj) || !is.arrayLike(paramList))
    throw new Error("Bad argument")
  each(paramList, name => {
    if (is.str(name) && is.func(obj[name]))
      obj[name] = obj[name].bind(self)
  })
  return obj
}