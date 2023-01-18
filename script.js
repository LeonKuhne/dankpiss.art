const words = ["dank", "piss", "art"]
const delay = 0

window.onload = () => {
  const artElem = document.querySelector(".art")
  const frameElem = document.querySelector(".frame")
  const done = () => { 
    return artElem.offsetHeight > frameElem.offsetHeight + 100;
  }
  // piss dank art
  addWords(artElem, words, delay, done)

  // piss on resize
  let requests = 0
  window.onresize = () => {
    console.log("resizing the window")
    // request art drawing
    requests += 1
    setTimeout(() => {
      requests -= 1
      if (requests == 0) {
        addWords(artElem, words, delay, done)
      }
    }, 40)
  }
}
//
// COPY IP

let clicks = 0
const copyIP = (ev) => {
  // copy IP to clipboard
  navigator.clipboard.writeText("dankpiss.art")
  // notify that it was copied
  const alertElem = document.querySelector(".notification")
  alertElem.classList.remove("hidden")
  alertElem.style.left = `${ev.clientX}px`
  alertElem.style.top = `${ev.clientY}px`
  // hide notification
  clicks += 1
  setTimeout(() => {
    clicks -= 1
    if (clicks === 0) {
      alertElem.classList.add("hidden")
    }
  }, 1000)
}

//
// DRAW ART

const addWord = (elem, chars, delay, done=()=>{}) => {
  if (chars.length == 0) { done(); return }
  // add letter
  const letter = chars.shift()
  elem.innerHTML += letter
  // recurse
  setTimeout(() => addWord(elem, chars, delay, done), delay)
}

const addWords = (elem, words, delay, done=()=>{}) => {
  if (!done()) {
    const word = words[Math.floor(Math.random() * words.length)]
    addWord(elem, [...word, " "], delay, 
      () => addWords(elem, words, delay, done))
  }
}
