import each from "../each.js"

/**
 * @param {Object} obj
 * @param {Object} source
 * @return {obj & source}
 */
export default function mixin(obj, ...source) {
  each(source, s => obj = { ...obj, ...s }, false)
  return obj
}