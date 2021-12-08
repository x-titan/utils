import { extend } from "./object/extend.js"

const isNull = value => value === null
const isObj = value => typeof value === 'object';
const isOfType = type => value => typeof value === type
const isEmpty = value => value === undefined || value === null
const toStr = value => Object.prototype.toString.call(value)
const getType = (value) => typeof value
const getObjName = () => {
  const x = toStr(value).slice(8, -1)
  if (x) return x
  return null
}
const getInstance = (value, type) => getObjName(value) === type

function is_(value) {
  if (isNull(value)) return "null"
  return getType(value)
}

const _ = {
  empty: isEmpty,
  null_: value => value === null,
  undefined: isOfType("undefined"),
  str: isOfType("string"),
  num: isOfType("number"),
  bool: value => value === true || value === false,
  func: isOfType("function"),
  class_: value => _.func(value) && toStr(value).startsWith('class '),
  symbol: isOfType('symbol'),
  array: Array.isArray,
  int: value => Number.isInteger(value),
  infinity: value => value === Infinity || value === -Infinity,
  nan: value => "number" === typeof value && isNaN(value),
  arrayLike: value => {
    return !_.empty(value) && !_.func(value) && value.length > -1
  }
}










/** Checks the element type */
const is = Object.freeze({
  /** @param {allTypes} type */
  type(value, type) { return type === typeof value },
  /** @param {new} object */
  instance(value, object) { return value instanceof object },
  /** @return {value is (undefined | null)} */
  empty(value) { return value === undefined || value === null },
  /** @return {value is number} */
  num(value) { return "number" === typeof value || value instanceof Number },
  /** @return {value is string} */
  str(value) { return "string" === typeof value || value instanceof String },
  /**
   * @param {unknown} value
   * @return {value is object}
   */
  obj(value) { return "object" === typeof value && value instanceof Object },
  /** @return {value is boolean} */
  bool(value) { return "boolean" === typeof value || value instanceof Boolean },
  /** @return {value is Function} */
  func(value) { return "function" === typeof value && value instanceof Function },
  /** @return {value is Array} */
  array(value) { return Array.isArray(value) },
  NaN(value) { return "number" === typeof value && isNaN(value) },
  /** Returns "TRUE" if the element being checked is an instance of the class */
  nonZeroValue(value) { return !(value === undefined || value === null || value === 0 || NaN(value)) },
  /** @return {value is (undefined | null | globalThis)} */
  notClass(value) { return value === undefined || value === null || value === globalThis },
  /** 
   * @param {unknown} v alue
   * @return {value is Class<value>}
   */
  class_(value) {
    return isType(value, "function") && value.toString().startsWith('class ')
  }
})
export default is