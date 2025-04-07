const add = (stringOfNumbers) => {
  if (stringOfNumbers === '') {
    return 0
  }

  if (stringOfNumbers.length === 1) {
    return parseInt(stringOfNumbers)
  }

  const listOfStringOfNumbers = stringOfNumbers.replaceAll('\n', ',').split(',')
  const sum = listOfStringOfNumbers.reduce((accumulator, current) => current === '' ? accumulator : accumulator + parseInt(current), 0)
  return sum
}

module.exports = add