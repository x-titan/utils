import each from "../each.js"
import is from "../types.js"

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
extend._ = function extend_(obj, ...source) {
  each(source, s => {
    let descriptor, prop
    if (s) {
      for (prop in s) {
        descriptor = Object.getOwnPropertyDescriptor(s, prop)
        Object.defineProperty(obj, prop, descriptor)
      }
    }
  })
  return obj
}