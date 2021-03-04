const resultOutput = document.getElementById('result')
const lengthInput = document.getElementById('length');
const uppercaseToggle = document.getElementById('uppercase');
const lowercaseToggle = document.getElementById('lowercase');
const numbersToggle = document.getElementById('numbers');
const symbolsToggle = document.getElementById('symbols');
const generateButton = document.getElementById('generate');
const copyButton = document.getElementById('clipboard');

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
}

copyButton.addEventListener('click', () => {
  const textarea = document.createElement('textarea')
  const password = resultOutput.innerText

  if(!password) {return}

  textarea.value = password
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
  alert('Copied to clipboard')
})

function generatePassword(lower, upper, number, symbol, length) {
  let outputPassword = ''
  const typesCount = lower + upper + number + symbol
  const typesArray = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item) [0])

  if(typesCount === 0) {
    return '';
  }
 
  for(let i = 0; i < length; i += typesCount) {
    typesArray.forEach(type => {
      const funcName = Object.keys(type)[0]
      outputPassword += randomFunc[funcName]()      
    })
  }

  const finalPassword = outputPassword.slice(0, length)
  return finalPassword;    
}

generateButton.addEventListener('click', () => {
  const length = +lengthInput.value;
  const includeLower = lowercaseToggle.checked;
  const includeUpper = uppercaseToggle.checked;
  const includeNumber = numbersToggle.checked;
  const includeSymbol = symbolsToggle.checked;
  
  resultOutput.innerText = generatePassword(includeLower, includeUpper, includeNumber, includeSymbol, length)
    
})


// Random character generating functions

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 19) + 48)
}

function getRandomSymbol() {
  const symbols = '!@#$%^&*()_-+=<>/,.'
  return symbols[Math.floor(Math.random() * symbols.length)]
}

// TEST FUNCTIONS
// console.log(getRandomLower())
// console.log(getRandomUpper())
// console.log(getRandomNumber())
// console.log(getRandomSymbol())
