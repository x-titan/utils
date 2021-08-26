/**
 * @param {Object} obj
 * @param {Object} source
 * @returns {obj & source}
 */
export default function extend(obj, source) { return { ...obj, ...source } }