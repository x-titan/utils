import extend from "./extend.js"

/**
 * @param {Object} obj
 * @param {Object} source
 * @return {obj & source}
 */
export default function mixin(obj, ...source) {
  extend(obj, ...source)
  return obj
}