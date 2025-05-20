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

  it('should support other delimiters', () => {
    const result1 = add('//"\n1"5"10\n14')
    expect(result1).toBe(30)

    const result2 = add('//;\n3;4;8\n7\n10;42')
    expect(result2).toBe(74)
  })

  it('should support edge case with string ending/starting with delimiters', () => {
    const result1 = add(',2,3,4,5,6')
    expect(result1).toBe(20)

    const result2 = add('//;\n2;3;4;5;6;')
    expect(result2).toBe(20)
  })

  it('should throw an error for negative numbers', () => {
    const result1 = () => add('-1,2')
    expect(result1).toThrow('Negative numbers not allowed: -1')

    const result2 = () => add('1,-2,3,-4,-8')
    expect(result2).toThrow('Negative numbers not allowed: -2, -4, -8')
  })

  it('should ignore numbers greater than 1000', () => {
    const result1 = add('1001,2')
    expect(result1).toBe(2)

    const result2 = add('2001,2,1000,4,234234234234,6,1233,8,12123,10')
    expect(result2).toBe(1030)
  })

  it(`should support delimiters can be of any length with the following format: “//[delimiter]\n”`, () => {
    const result1 = add('//[***]\n1***2***3')
    expect(result1).toBe(6)

    const result2 = add('//[ab]c]\n1ab]c2ab]c3')
    expect(result2).toBe(6)
  })


  it(`should support multiple delimiters with the following format: “//[delimiter1][delimiter2]\n”`, () => {
    const result1 = add('//[*][%]\n1*2%3')
    expect(result1).toBe(6)

    const result2 = add('//[***][%%%%]\n1***2%%%%3***4%%%%5')
    expect(result2).toBe(15)
  })

  it(`should throw an error when alphabets are written in the string`, () => {
    const result = () => add('1,a,2')
    expect(result).toThrow('Alphabets are not allowed')
  })
})