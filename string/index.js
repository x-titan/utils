import { assign, makeValidator } from '../inherits.js'

const proxytoUpperCase = String.prototype.toUpperCase
const proxytoLowerCase = String.prototype.toLowerCase
const validateString = makeValidator(
  (value) => (value instanceof String)
)

function firstUpper(str = '') {
  return str[0].toUpperCase() + str.slice(1)
}

function onlyFirstUpper(str = '') {
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

const _ = {
  toPascalCase(join = false) {
    validateString(this)
    let out = ''
    for (const macth of this.matchAll(/[a-zA-Z]+/gm)) {
      const index = macth.index
      const str = firstUpper(macth[0])
      if (out.length === index || join)
        out += str
      else
        out += this.slice(out.length, index) + str
    }
    return out
  },

  toCamelCase(join = false) {
    validateString(this)
    let out = ''
    let pass = true
    for (const macth of this.matchAll(/[a-zA-Z]+/gm)) {
      const index = macth.index
      let str = firstUpper(macth[0])
      if (pass) {
        str = macth[0]
        pass = false
      }
      if (out.length === index || join)
        out += str
      else
        out += this.slice(out.length, index) + str
    }
    return out
  },

  toUpperCase(join = false, separator = '') {
    validateString(this)
    let res = proxytoUpperCase.call(this)
    if (join) {
      validateString(separator)
      let out = ''
      for (const macth of res.matchAll(/[A-Z]+/gm)) {
        if (pass) {
          out += macth
          pass = false
          continue
        }
        out += separator + macth[0]
      }
      res = out
    }
    return res
  },

  toLowerCase(join = false, separator = '') {
    validateString(this)
    let res = proxytoLowerCase.call(this)
    if (join) {
      validateString(separator)
      let out = ''
      let pass = true
      for (const macth of res.matchAll(/[a-z]+/gm)) {
        if (pass) {
          out += macth
          pass = false
          continue
        }
        out += separator + macth[0]
      }
      res = out
    }
    return res
  }
}

assign(String.prototype, _)
