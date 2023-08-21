import { validate } from "../include.js"
import { is } from "../types/index.js"
import { randInt } from "./random.js"

const uuidList = new Set()
const { fromCharCode } = String
const UPPER_A = 65
const UPPER_Z = 90
const LOWER_A = 97
const LOWER_Z = 122
const DIGIT_0 = 48
const DIGIT_9 = 57
const CHAR = [
  { start: 42, end: 47 },
  { start: 60, end: 64 },
  { start: 91, end: 95 }
]
const LETTERS = [
  randSymbolChar,
  randUpperLetter,
  randLowerLetter,
  randDigitChar
]

function randChar_(start, end) {
  return fromCharCode(randInt(start, end))
}

function randUpperLetter() {
  return randChar_(UPPER_A, UPPER_Z)
}

function randLowerLetter() {
  return randChar_(LOWER_A, LOWER_Z)
}

function randDigitChar() {
  return randChar_(DIGIT_0, DIGIT_9)
}

function randSymbolChar() {
  const char = CHAR[randInt(0, 2)]
  return randChar_(char.start, char.end)
}

function randLetter() {
  return LETTERS[randInt(0, 3)]()
}

/** 
 * @param {number} len
 * @return {string}
 */
export default function UUID(len) {
  validate(is.uint, len)

  const _len = len
  let id = ""

  while (len--) {
    id += randLetter()
  }

  if (uuidList.has(id)) {
    return UUID(_len)
  }

  uuidList.add(id)
  return id
}
