import { validateNumber } from "./validateNumber.js"

export default function clamp(value, min, max) {
  validateNumber.every(value, min, max)

  if (min > max) {
    min = min + max
    max = min - max
    min = min - max
  }

  if (value < min) { value = min }
  if (value > max) { value = max }

  return value
}