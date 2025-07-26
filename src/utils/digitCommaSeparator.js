export const addCommaToCurrency = currency => {
    const currString = currency?.toString() ?? ''
    const decimalPart = currString.includes('.') ? currString.split('.')[1] : ''
    let integerPart = decimalPart ? currString.split('.')[0] : currString
    const formattedIntegerPart = integerPart
      .split('')
      .reverse()
      .reduce((acc, item, ind, arr) => {
        if (ind % 2 === 0 && ind !== 0 && arr.length - 1 !== ind) {
          acc.push(item)
          acc.push(',')
        } else {
          acc.push(item)
        }
        return acc
      }, [])
      .reverse()
      .join('')
    return decimalPart ? formattedIntegerPart + '.' + decimalPart : formattedIntegerPart
  }
  