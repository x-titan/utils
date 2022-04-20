const has = Object.prototype.hasOwnProperty
const {
  isExtensible: isExt,
  getOwnPropertyDescriptor: getOwn,
  defineProperty: define,
} = Reflect

const isObj = value => {
  const t = typeof value
  return value !== null && (t === "function" || t === "object")
}

export default function extend(obj, ...source) {
  if (!isExt(obj))
    throw new TypeError("First argument not extensible")
  for (const o of source)
    if (isObj(o))
      for (const key in o)
        if (has.call(o, key))
          obj[key] = o[key]
  return obj
}
extend.pro = function extend_(obj, ...source) {
  if (!isExt(obj))
    throw new TypeError("First argument not extensible")
  for (const o of source)
    if (isObj(o))
      for (const key in o)
        if (has.call(o, key))
          define(obj, key, getOwn(o, key))

  return obj
}