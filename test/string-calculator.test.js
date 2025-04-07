const add = require('../src/string-calculator.js')

describe('String Calculator', () => {
  it('should return 0 for an empty string', () => {
    const result = add('')
    expect(result).toBe(0)
  })

  it('should return the same number for a string with one number', () => {
    const result = add('1')
    expect(result).toBe(1)
  })
})