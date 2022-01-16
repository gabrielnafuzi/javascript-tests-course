const { queryString } = require('./query-string')

describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'John',
      profession: 'Developer'
    }

    expect(queryString(obj)).toBe('name=John&profession=Developer')
  })
})

describe('Query string to object', () => {})
