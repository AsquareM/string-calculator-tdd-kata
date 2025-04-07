const add = (stringOfNumbers, delimiter = ',') => {
  if (stringOfNumbers === '') {
    return 0
  }

  if (stringOfNumbers.length === 1) {
    return parseInt(stringOfNumbers)
  }

  const listOfStringOfNumbers = stringOfNumbers.split(delimiter)
  const sum = listOfStringOfNumbers.reduce((acc, curr) => acc + parseInt(curr), 0)
  return sum
}

module.exports = add