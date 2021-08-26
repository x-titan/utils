import is from "../types.js"

/**
 * @param {Object} obj
 * @param {Object} source
 * @returns {obj & source}
 */
export default function mixin(obj, source) {
  if (is.obj(obj) && is.obj(source))
    each.obj(source, (z, k) => { obj[k] = is.func(z) ? z.bind(obj) : z })
  return obj
}