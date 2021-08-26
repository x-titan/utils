/**
 * @param {Object} obj
 * @param {*} [obj.]
 * @param {Object} source
 * @param {*} [source.]
 */
export default function extend(obj, source) { return { ...obj, ...source } }