export function initAnim() {
  const aboutCards = document.querySelectorAll(".card")
  const cardsText = document.querySelectorAll(".card__number")

  let lastKnownScrollPosition = 0 
  let ticking = false 
  const animLength = 1000

  function incrementNumbers(element, step, timeInterval) {
    let maxNumber = element.getAttribute('data-number')
    let cardNumber = 0

    if (maxNumber) {
      let interval = setInterval(() => {
        element.innerText = cardNumber
        if (cardNumber >= maxNumber) clearInterval(interval)

        cardNumber = cardNumber + step

      }, timeInterval) 
    }
    element.removeAttribute('data-number')
  }

  function addClassToCards(scrollPos) {
    for (let i = 0;  i < aboutCards.length;  i++) {
      let card = aboutCards[i] as HTMLElement
      let cardText = cardsText[i] as HTMLSpanElement
      let step = 1
      let interval = animLength / 20

      if (i == 1) {
        step = 100
        interval = animLength / 10
      }

      else if (i == 2) interval = animLength / 3

      if (scrollPos >= card.offsetTop + window.innerHeight / 3) {
        card.classList.add("card--visible")
        incrementNumbers(cardText, step, interval)
      }
    }
  }

  document.addEventListener("scroll", () => {
    lastKnownScrollPosition = window.scrollY

    if (!ticking) {
      window.requestAnimationFrame(() => {
        addClassToCards(lastKnownScrollPosition)
        ticking
      }) 

      !ticking
    }
  }) 
}
