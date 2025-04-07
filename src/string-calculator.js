const add = (stringOfNumbers) => {
  // Edge cases
  if (stringOfNumbers === '') {
    return 0
  }

  if (stringOfNumbers.length === 1) {
    return parseInt(stringOfNumbers)
  }

  // Cleanup and conversion to array of numbers
  const delimiter = stringOfNumbers.startsWith('//') ? stringOfNumbers.charAt(2) : ','
  const listOfStringOfNumbers = stringOfNumbers.replaceAll('\n', delimiter).replace(`//${delimiter}`, '').split(delimiter)

  const negatives = []
  const sum = listOfStringOfNumbers.reduce((sum, number) => {
    number = parseInt(number)
    if (number < 0) {
      negatives.push(number)
    }
    if (!isNaN(number)) {
      sum += number
    }
    return sum
  }, 0)

  if (negatives.length > 0) {
    throw new Error(`Negative numbers not allowed: ${negatives.join(', ')}`)
  }

  return sum
}

module.exports = add