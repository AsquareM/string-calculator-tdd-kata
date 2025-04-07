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

  it('should return the sum of two or more numbers', () => {
    const result1 = add('1,5')
    expect(result1).toBe(6)

    const result2 = add('3,4,8,7,10,42')
    expect(result2).toBe(74)
  })

  it('should support newline characters', () => {
    const result1 = add('1\n5\n10,14,18')
    expect(result1).toBe(48)
  })
})