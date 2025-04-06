import validate from "../validate.js"
import {
  isNumber,
  isInt,
} from "../types.js"

export const validateNumber = validate.clone(
  isNumber,
  "Unexpected type. Require number"
)

export const validateInteger = validate.clone(
  isInt,
  "Unexpected type. Require integer number"
)
