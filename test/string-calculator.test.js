const add = require('../src/string-calculator.js')

describe('String Calculator', () => { 
  it('should return 0 for an emtpy string', () => {
    const result = add('')
    expect(result).toBe(0)
  })
})