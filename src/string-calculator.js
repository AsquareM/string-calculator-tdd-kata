const add = (stringOfNumbers) => {
  // Edge cases
  if (stringOfNumbers === '') {
    return 0
  }

  if (stringOfNumbers.length === 1) {
    return parseInt(stringOfNumbers)
  }

  // Cleanup and conversion to array of numbers
  let delimiter = ','
  if (stringOfNumbers.startsWith('//')) {
    delimiter = stringOfNumbers.charAt(2)
  }
  const multiCharacterDelimiterMatch = stringOfNumbers.match(/\/\/\[(.*)\]\n/)
  if (multiCharacterDelimiterMatch?.length > 0) {
    delimiter = multiCharacterDelimiterMatch[1]
  }

  const listOfStringOfNumbers = stringOfNumbers.replaceAll('\n', delimiter).replace(`//${delimiter}`, '').split(delimiter)

  const negatives = []
  const sum = listOfStringOfNumbers.reduce((sum, number) => {
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

  if (negatives.length > 0) {
    throw new Error(`Negative numbers not allowed: ${negatives.join(', ')}`)
  }

  return sum
}

module.exports = add