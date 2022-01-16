const { queryString } = require('./query-string')

describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'John',
      profession: 'Developer'
    }

    expect(queryString(obj)).toBe('name=John&profession=Developer')
  })

  it('should create a valid query string even when an array is passed', () => {
    const obj = {
      name: 'John',
      profession: 'Developer',
      skills: ['HTML', 'CSS', 'JavaScript']
    }

    expect(queryString(obj)).toBe(
      'name=John&profession=Developer&skills=HTML,CSS,JavaScript'
    )
  })

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'John',
      profession: 'Developer',
      skills: {
        first: 'HTML',
        second: 'CSS'
      }
    }

    expect(() => {
      queryString(obj)
    }).toThrowError()
  })
})

describe('Query string to object', () => {})
