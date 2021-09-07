import each from "../each.js"
import is from "../types.js"

/**
 * @param {Object} obj
 * @param {Object} source
 * @return {obj & source}
 */
export default function mixin(obj, ...source) {
  if (is.obj(obj) && source.lenght !== 0)
    each(source, s => {
      if (is.obj(s)) each.obj(s, (z, k) => {
        obj[k] = is.func(z) ? z.bind(obj) : z
      })
    })
  return obj
}