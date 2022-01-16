const keyValueToString = ([key, value]) => {
  if (typeof value === 'object' && !Array.isArray(value)) {
    throw new Error('Objects are not allowed as values')
  }

  return `${key}=${value}`
}

const queryString = obj => {
  return Object.entries(obj).map(keyValueToString).join('&')
}

module.exports = {
  queryString
}
