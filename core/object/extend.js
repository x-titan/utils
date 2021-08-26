/**
 * @param {Object} obj
 * @param {Object} source
 * @return {obj & source}
 */
export default function extend(obj, source) { return { ...obj, ...source } }