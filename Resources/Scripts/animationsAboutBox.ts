export function initAboutBox() {
  const header = document.querySelector("header") as HTMLElement;
  let scrollPosition = window.scrollY;
  const aboutCards = document.querySelectorAll(".about__card");

  function addClassToAboutCards() {
    aboutCards.forEach((card) => {
      card.classList.add("about__card--visible");
    });
  }

  document.addEventListener("scroll", () => {
    scrollPosition = window.scrollY;

    if (scrollPosition >= header.offsetTop + window.innerHeight / 2) {
      addClassToAboutCards();
    }
  });
}
