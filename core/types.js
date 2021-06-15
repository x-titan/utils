//#region Types
/** @typedef {"string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"} allTypes */
//#endregion

/** Checks the element type */
export default Object.freeze({
  /** @param {allTypes} type */
  type(value, type) { return type === typeof value },
  /** @param {new} object */
  instance(value, object) { return value instanceof object },
  empty(value) { return value === undefined || value === null },
  num(value) { return "number" === typeof value || value instanceof Number },
  str(value) { return "string" === typeof value || value instanceof String },
  obj(value) { return "object" === typeof value && value instanceof Object },
  bool(value) { return "boolean" === typeof value || value instanceof Boolean },
  func(value) { return "function" === typeof value && value instanceof Function },
  array(value) { return Array.isArray(value) },
  NaN(value) { return "number" === typeof value && isNaN(value) },
  /** Returns "TRUE" if the element being checked is an instance of the class */
  nonZeroValue(value) { return !(value === undefined || value === null || value === 0 || NaN(value)) },
  notClass(value) { return value === undefined || value === null || value === globalThis }
})
