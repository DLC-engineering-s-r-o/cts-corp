export function initAboutBox() {
  const header = document.querySelector("header") as HTMLElement;
  let lastKnownScrollPosition = 0
  let ticking = false

  const aboutCards = document.querySelectorAll(".about__card")

  function addClassToAboutCards(scrollPos) {
    aboutCards.forEach((card) => {
      if (lastKnownScrollPosition >= header.offsetTop + window.innerHeight / 2) {
        card.classList.add("about__card--visible")
      } 
    });
  }

  document.addEventListener("scroll", () => {
    lastKnownScrollPosition = window.scrollY

    if (!ticking){
      window.requestAnimationFrame(function() {
        addClassToAboutCards(lastKnownScrollPosition)
        ticking = false
      })

      ticking = true
    }  
  })
}
