
export function initAboutBox() {
    const header = document.querySelector('header') as HTMLElement;
    let scrollPosition = window.scrollY;
    const aboutCards = document.querySelectorAll('.about__card');

    function addClassToAboutCards() {
        aboutCards.forEach(card => {
            card.classList.add('about__card--visible')
        });
    }

    const counterAnim = (qSelector, start = 0, end, duration = 1000) => {
        const target = document.querySelector(qSelector);
        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            target.innerText = Math.floor(progress * (end - start) + start);

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    };

    document.addEventListener('scroll', () => {
        scrollPosition = window.scrollY;

        if (scrollPosition >= header.offsetTop + (window.innerHeight / 2)) {
            addClassToAboutCards()
        }

        counterAnim("#number-years", 1, 20, 1500);
        counterAnim("#number-projects", 100, 1000, 1500);
        counterAnim("#number-money", 1, 3, 1000);
    });
}

