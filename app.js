const form = document.querySelector('form')

const cleanBoxMessage = boxMessage => {
  form.addEventListener('click', () => {
    boxMessage.textContent = ''
  })
}

const createBoxMessage = result => {
  const boxMessage = document.createElement('div')
  boxMessage.setAttribute('class', 'message')

  form.insertAdjacentElement('afterend', boxMessage)
  boxMessage.textContent = result

  cleanBoxMessage(boxMessage)
}

const verifyConditions = (isFahrenheit, temperature) => {
  const convertedTemperature = isFahrenheit
    ? Number(temperature.toUpperCase().replace('F', '').replace(',', '.'))
    : Number(temperature.toUpperCase().replace('C', '').replace(',', '.'))
  const result = isFahrenheit
    ? `${((convertedTemperature - 32) * (5 / 9)).toFixed(2)}°C`
    : `${(convertedTemperature * (9 / 5) + 32).toFixed(2)}°F`
  return result
}

const convertTemperature = temperature => {
  const isCelsius = temperature.toUpperCase().includes('C')
  const isFahrenheit = temperature.toUpperCase().includes('F')

  try {
    if (!isCelsius && !isFahrenheit) {
      throw new Error('Temperatura não identificada!')
    }

    const result = verifyConditions(isFahrenheit, temperature)

    createBoxMessage(result)
  } catch (error) {
    alert(error.message)
  }
}

const testRegex = inputValue => {
  const pattern = /^[-]?[0-9]{1,5}[,.]?[0-9]?[cfCF]{1}$/
  const result = pattern.test(inputValue)
  console.log(result)

  form.reset()

  if (result) {
    convertTemperature(inputValue)
    return
  }
  alert('Temperatura não identificada!')
}

const insertDegree = () => {
  form.addEventListener('submit', event => {
    event.preventDefault()

    const inputValue = event.target.degreeInput.value
    console.log(inputValue)

    testRegex(inputValue)
  })
}

insertDegree()
