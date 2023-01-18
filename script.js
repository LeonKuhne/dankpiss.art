const words = ["dank", "piss", "art"]
const artDelay = 1
const scrollSpeed = 0.1
const scrollDelay = 1

window.onload = () => {
  const artElem = document.querySelector(".art")
  const frameElem = document.querySelector(".frame")
  const bannerTextElem = document.querySelector(".banner-text") 

  // piss dank art
  const piss = () => addWords(artElem, words, artDelay, () => 
    artElem.offsetHeight > frameElem.offsetHeight + 100)
  piss()

  // scroll banner
  scrollBanner(bannerTextElem, scrollSpeed, scrollDelay)

  // piss on resize
  let requests = 0
  window.onresize = () => {
    // rerequest art drawing
    requests += 1
    setTimeout(() => {
      requests -= 1
      if (requests == 0) {
        piss()
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
// SCROLL BANNER

let indent = 0
const scrollBanner = (elem, speed=.1, delay=100) => {
  indent += speed
  if (indent > elem.offsetWidth / 2) {
    indent = 0
  }
  elem.style.textIndent = `-${indent}px`
  setTimeout(() => scrollBanner(elem, speed, delay), delay)
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
