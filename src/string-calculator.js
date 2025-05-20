/**
 * Adds numbers from a string with specified delimiter formats
 * @param {string} stringOfNumbers - String containing numbers separated by delimiters, optionally specifying custom delimiters in the format: //[delimiters]\n[numbers], or //[delimiter1][delimiter2]\n[numbers] for multiple delimiters
 * @returns {number} Sum of the numbers
 * @throws {Error} When input contains negative numbers or alphabets
 */
const add = (stringOfNumbers) => {
  // In case of empty string return 0
  if (stringOfNumbers === '') {
    return 0
  }

  // In case of a single number, return the number itself
  if (stringOfNumbers.length === 1) {
    return parseInt(stringOfNumbers)
  }

  // handling custom delimiters (string is in the format: //[delimiter]\n[numbers])
  let { delimiter, stringWithoutInitialDelimiter } = _parseDelimiter(stringOfNumbers)
  const listOfNumbers = _splitStringToNumbers(stringWithoutInitialDelimiter, delimiter)
  const sum = _calculateResult(listOfNumbers, delimiter)

  return sum
}

const _parseDelimiter = (stringOfNumbers) => {
  let delimiter = ','

  const CUSTOM_DELIMITER_CHECK_REGEX = /\/\/(.*)\n/
  const customDelimiters = stringOfNumbers.match(CUSTOM_DELIMITER_CHECK_REGEX)

  const customDelimiterExists = customDelimiters?.length > 0
  if (!customDelimiterExists)
    return { delimiter, stringWithoutInitialDelimiter: stringOfNumbers }

  // for single character custom delimiters
  delimiter = customDelimiters[1]

  // for multi-character custom delimiters
  const MULTI_CHARACTER_DELIMITER_CHECK_REGEX = /\[(.*)\]/
  const multiCharacterDelimiterMatch = delimiter.match(MULTI_CHARACTER_DELIMITER_CHECK_REGEX)
  if (multiCharacterDelimiterMatch?.length > 0) {
    delimiter = multiCharacterDelimiterMatch[1]
  }

  // for multiple delimiters with arbitrary length
  const multipleDelimiterSplitter = '][';
  if (delimiter.includes(multipleDelimiterSplitter)) {
    delimiter = delimiter.split(multipleDelimiterSplitter)
  }

  const stringWithoutInitialDelimiter = stringOfNumbers.substring(stringOfNumbers.indexOf('\n') + 1)
  return { delimiter, stringWithoutInitialDelimiter }
}

const _splitStringToNumbers = (stringOfNumbers, delimiter) => {
  // normalize delimiters (`\n` to `,`)
  stringOfNumbers = stringOfNumbers.replaceAll('\n', ',')

  // normalize other delimiter(s) and then split
  const singleDelimiterCheck = typeof delimiter === 'string'
  let listOfStringOfNumbers;
  if (singleDelimiterCheck) {
    listOfStringOfNumbers = stringOfNumbers.replaceAll(delimiter, ',').split(',')
  } else {
    delimiter.forEach(d => stringOfNumbers = stringOfNumbers.replaceAll(d, ','))
    listOfStringOfNumbers = stringOfNumbers.split(',')
  }

  return listOfStringOfNumbers
}

// calculating sum while handling edge cases
const _calculateResult = (listOfNumbers, delimiter) => {
  const MAX_ALLOWED_NUMBER = 1000
  let initial, operator;
  const listOfNegativeNumbers = []

  if (typeof delimiter == 'string' && delimiter == '*') {
    operator = 'multiply'
    initial = 1
  } else {
    operator = 'add'
    initial = 0
  }

  const sum = listOfNumbers.reduce((sum, number) => {
    const ALPHABET_REGEX = /[a-zA-Z]/
    if (ALPHABET_REGEX.test(number))
      throw new Error(`Alphabets are not allowed`)

    number = parseInt(number)
    if (number < 0) {
      listOfNegativeNumbers.push(number)
      return sum
    }

    if (isNaN(number) || number > MAX_ALLOWED_NUMBER) {
      return sum
    }
    
    if (operator == 'multiply')
      return sum * number
    else
      return sum + number
  }, initial)

  // throwing an error if there are negative numbers
  if (listOfNegativeNumbers.length > 0) {
    throw new Error(`Negative numbers not allowed: ${listOfNegativeNumbers.join(', ')}`)
  }

  return sum
}

module.exports = add