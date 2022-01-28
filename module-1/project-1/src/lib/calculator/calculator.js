export const sum = (a, b) => {
  const parsedA = parseInt(a, 10)
  const parsedB = parseInt(b, 10)

  if (isNaN(parsedA) || isNaN(parsedB)) {
    throw new Error('Cannot sum non-numbers')
  }

  return parsedA + parsedB
}
