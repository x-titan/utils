import { randInt } from "./random.js"

function randChar_(start, end) {
  return String.fromCharCode(randInt(start, end))
}
function randUpperLetter() {
  const UPPER_A = 65
  const UPPER_Z = 90
  return randChar_(UPPER_A, UPPER_Z)
}
function randLowerLetter() {
  const LOWER_A = 97
  const LOWER_Z = 122
  return randChar_(LOWER_A, LOWER_Z)
}
function randDigitChar() {
  const DIGIT_0 = 48
  const DIGIT_9 = 57
  return randChar_(DIGIT_0, DIGIT_9)
}
function randSymbolChar() {
  const char = [
    { start: 42, end: 47 },
    { start: 60, end: 64 },
    { start: 91, end: 95 }][randInt(0, 2)]
  return randChar_(char.start, char.end)
}
function randLetter() {
  return [
    randSymbolChar,
    randUpperLetter,
    randLowerLetter,
    randDigitChar
  ][randInt(0, 3)]()
}
const uuidList = new Set()
/** 
 * @param {number} len
 * @return {string}
 */
export default function UUID(len) {
  if (len <= 0)
    throw new Error("Len not be equal a positive value")
  const _len = len
  let id = ""
  while (len--)
    id += randLetter()
  if (uuidList.has(id))
    return UUID(_len)
  uuidList.add(id)
  return id
}