let text

async function loadDictionary() {
  res = await fetch("https://raw.githubusercontent.com/dwyl/english-words/master/words.txt")
  text = await res.text()
}

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.querySelector('form')
  const list = document.querySelector('ul')

  form.addEventListener('submit', async event => {
    event.preventDefault()
    await loadDictionary()

    const input = new FormData(event.target)
    const { allChars } = Object.fromEntries(input)
    const lookupTable = allChars.split('').reduce((table, letter) => {
      table[letter] = true
      return table
    }, {})
    console.log(lookupTable)
    const middleChar = allChars[0]
    text.split('\n').forEach(word => {
      if (
        containsMiddleLetter(middleChar, word) &&
        allLettersValid(lookupTable, word) &&
        word.length >= 4
      ) {
        console.log(word)
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
