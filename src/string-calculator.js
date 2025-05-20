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
  let delimiter = ','
  const customDelimiterMatch = stringOfNumbers.match(/\/\/(.*)\n/)

  if (customDelimiterMatch?.length > 0) {
    // for single character delimiters
    delimiter = customDelimiterMatch[1]

    const multiCharacterDelimiterMatch = delimiter.match(/\[(.*)\]/)
    // for multi-character delimiters
    if (multiCharacterDelimiterMatch?.length > 0) {
      delimiter = multiCharacterDelimiterMatch[1]
    }

    // for multiple delimiters with arbitrary length
    if (delimiter.includes('][')) {
      delimiter = delimiter.split('][')
    }

    stringOfNumbers = stringOfNumbers.substring(stringOfNumbers.indexOf('\n') + 1)
  }

  // normalize delimiters (`\n` to `,`)
  stringOfNumbers = stringOfNumbers.replaceAll('\n', ',')

  // normalize other delimiter(s) and then split
  let listOfStringOfNumbers;
  if (typeof delimiter === 'string') {
    listOfStringOfNumbers = stringOfNumbers.replaceAll(delimiter, ',').split(',')
  } else {
    delimiter.forEach(d => stringOfNumbers = stringOfNumbers.replaceAll(d, ','))
    listOfStringOfNumbers = stringOfNumbers.split(',')
  }


  // calculating sum while handling edge cases
  const negatives = []
  const sum = listOfStringOfNumbers.reduce((sum, number) => {
    if (/[a-zA-Z]/.test(number))
      throw new Error(`Alphabets are not allowed`)

    number = parseInt(number)
    if (number < 0) {
      negatives.push(number)
      return sum
    }

    if (isNaN(number) || number > 1000) {
      return sum
    }
    
    return sum + number
  }, 0)

  // throwing an error if there are negative numbers
  if (negatives.length > 0) {
    throw new Error(`Negative numbers not allowed: ${negatives.join(', ')}`)
  }

  return sum
}

module.exports = add