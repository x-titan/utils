import validate from "../validate.js"
import {
  isNumber,
  isInt,
} from "../types.js"

export const validateNumber = validate.clone(isNumber)
export const validateInteger = validate.clone(isInt)
