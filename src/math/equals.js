export default function equals(a, b) {
  if (a === b) {
    return (1 / a === 1 / b)
  }

  return (a !== a) && (b !== b)
}