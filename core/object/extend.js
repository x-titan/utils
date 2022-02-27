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
/**
 * @param {Object} obj
 * @param {Object} source
 * @return {obj & source}
 */
extend.pro = (obj, ...source) => {
  if (is.obj(obj)) each(source, s => {
    if (is.obj(s)) each.obj(s, (z, k) =>
      obj[k] = is.func(z) ? z.bind(obj) : z
    )
  }, false)
  return obj
}

extend._ = function extend_(obj) {
  Array.prototype.slice.call(arguments, 1).forEach(source => {
    let descriptor, prop;
    if (source) {
      for (prop in source) {
        descriptor = Object.getOwnPropertyDescriptor(source, prop);
        Object.defineProperty(obj, prop, descriptor);
      }
    }
  });
  return obj;
}