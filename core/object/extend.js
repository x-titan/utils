import each from "../each.js"
import is from "../types.js"

const {
  defineProperty: defProp,
  getOwnPropertyDescriptor: getOwn
} = Object
const isObj = value => is.obj(value) || is.func(value)

export default function extend(obj, ...source) {
  if (isObj(obj)) each(source, s => {
    if (is.obj(s)) each.obj(s, (z, k) => obj[k] = z)
  }, false)
  return obj
}
extend.pro = (obj, ...source) => {
  if (isObj(obj)) each(source, s => {
    if (isObj(s)) each.obj(s, (z, k) =>
      obj[k] = is.func(z) ? z.bind(obj) : z
    )
  }, false)
  return obj
}
extend._ = function extend_(obj, ...source) {
  if (isObj(obj))
    each(source, s => {
      if (isObj(s)) for (const prop in s)
        defProp(obj, prop, getOwn(s, prop))
    })
  return obj
}