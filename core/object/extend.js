import each from "../each.js"
import is from "../types.js"

/**
 * @param {Object} obj
 * @param {Object} source
 * @return {obj & source}
 */
export default function extend(obj, ...source) {
  if (is.obj(obj)) each(source, s => {
    if (is.obj(s)) each.obj(s, (z, k) => obj[k] = z)
  }, false)
  return obj
}

extend.pro = (obj, ...source) => {
  if (is.obj(obj)) each(source, s => {
    if (is.obj(s)) each.obj(s, (z, k) =>
      obj[k] = is.func(z) ? z.bind(obj) : z
    )
  }, false)
  return obj
}