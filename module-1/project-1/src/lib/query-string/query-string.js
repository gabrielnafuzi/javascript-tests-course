const keyValueToString = ([key, value]) => {
  if (typeof value === 'object' && !Array.isArray(value)) {
    throw new Error('Objects are not allowed as values')
  }

  return `${key}=${value}`
}

export const queryString = obj => {
  return Object.entries(obj).map(keyValueToString).join('&')
}

const keyValueStringToArray = keyValue => {
  const [key, value] = keyValue.split('=')

  if (value.includes(',')) return [key, value.split(',')]

  return [key, value]
}

export const parse = qs => {
  return Object.fromEntries(qs.split('&').map(keyValueStringToArray))
}
