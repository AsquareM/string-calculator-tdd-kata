const add = (stringOfNumbers) => {
  if (stringOfNumbers === '') {
    return 0
  }

  if (stringOfNumbers.length === 1) {
    return parseInt(stringOfNumbers)
  }

  const listOfStringOfNumbers = stringOfNumbers.split(',')
  const sum = listOfStringOfNumbers.reduce((acc, curr) => acc + parseInt(curr), 0)
  return sum
}

module.exports = add