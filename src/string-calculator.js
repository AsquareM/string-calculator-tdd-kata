const add = (stringOfNumbers) => {
  if (stringOfNumbers === '') {
    return 0
  }

  if (stringOfNumbers.length === 1) {
    return parseInt(stringOfNumbers)
  }
}

module.exports = add;