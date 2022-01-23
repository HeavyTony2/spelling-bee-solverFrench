let text

async function loadDictionary() {
  res = await fetch("https://raw.githubusercontent.com/dwyl/english-words/master/words.txt")
  text = await res.text()
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadDictionary()
  const form = document.querySelector('form')
  const list = document.querySelector('ul')

  form.addEventListener('submit', event => {
    list.innerHTML = ''
    event.preventDefault()

    const input = new FormData(event.target)
    const { allChars } = Object.fromEntries(input)
    const lookupTable = allChars.toLowerCase().split('').reduce((table, letter) => {
      table[letter] = true
      return table
    }, {})
    const middleChar = allChars[0].toLowerCase()
    text.split('\n').forEach(word => {
      const lowerCaseWord = word.toLowerCase()
      if (
        containsMiddleLetter(middleChar, lowerCaseWord) &&
        allLettersValid(lookupTable, lowerCaseWord) &&
        word.length >= 4
      ) {
        list.insertAdjacentHTML('beforeend', `<li>${word}</li>`)
      }
    })
  })
})

function containsMiddleLetter(middle, word) {
  return word.includes(middle)
}

function allLettersValid(lookupTable, word) {
  return word.split('').every(letter => {
    return lookupTable[letter]
  })
}
