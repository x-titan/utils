import each from "../each.js"

/**
 * @param {Object} obj
 * @param {Object} source
 * @return {obj & source}
 */
export default function extend(obj, ...source) {
  if (source.lenght !== 0) each(source, s => { obj = { ...obj, ...s } })
  return obj
}