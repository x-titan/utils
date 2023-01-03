import { assign, makeValidator } from "../include.js"

const proxyToUpperCase = String.prototype.toUpperCase
const proxyToLowerCase = String.prototype.toLowerCase
const Characters = /[^\s\d\-\_\=\+\\\/\|\.\,\:\;\"\'\!\?\`\~\^\&\*\№\@\#\$\%\(\)\{\}\[\]\<\>]+/gm

const validateString = makeValidator(
  (value) => (value instanceof String || typeof value === "string")
)

function firstUpper(str = "") {
  if (str === "") { return str }
  return proxyToUpperCase.call(str[0]) + str.slice(1)
}

function onlyFirstUpper(str = "") {
  if (str === "") { return str }
  return proxyToUpperCase.call(str[0]) + proxyToLowerCase.call(str.slice(1))
}

export function toPascalCase(str, join = false) {
  validateString(str)
  let out = ""

  for (const macth of str.matchAll(Characters)) {
    const index = macth.index
    const chunk = onlyFirstUpper(macth[0])

    if (out.length === index || join) {
      out += chunk
    } else {
      out += str.slice(out.length, index) + chunk
    }
  }

  if (out.length < str.length && !join) {
    out += str.slice(out.length)
  }

  return out
}

export function toCamelCase(str, join = false) {
  validateString(str)
  let out = ""
  let pass = true

  for (const macth of str.matchAll(Characters)) {
    const index = macth.index
    let chunk = onlyFirstUpper(macth[0])

    if (pass) {
      chunk = macth[0].toLowerCase()
      pass = false
    }

    if (out.length === index || join) {
      out += chunk
    } else {
      out += str.slice(out.length, index) + chunk
    }
  }

  if (out.length < str.length && !join) {
    console.log("lenght")
    out += str.slice(out.length)
  }

  return out
}

export function toUpperCase(str, join = false, separator = "") {
  validateString(str)
  let res = proxyToUpperCase.call(str)

  if (join) {
    validateString(separator)
    let out = ""
    let pass = true

    for (const macth of res.matchAll(Characters)) {
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

export function toLowerCase(str, join = false, separator = "") {
  validateString(str)
  let res = proxyToLowerCase.call(str)

  if (join) {
    validateString(separator)
    let out = ""
    let pass = true

    for (const macth of res.matchAll(Characters)) {
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

assign(String.prototype, {
  toCamelCase(join = false) {
    return toCamelCase(this, join)
  },
  toPascalCase(join = false) {
    return toPascalCase(this, join)
  },
  toUpperCase(join = false, separator = "") {
    return toUpperCase(this, join, separator)
  },
  toLowerCase(join = false, separator = "") {
    return toLowerCase(this, join, separator)
  },
  proxyToLowerCase,
  proxyToUpperCase,
})
