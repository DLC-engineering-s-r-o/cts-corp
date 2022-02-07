const menuBtn = document.getElementById('menuBtn') as HTMLButtonElement
const menu = document.querySelector('.nav__menu') as HTMLDivElement
const nav = document.querySelector('nav')
const navItems = document.querySelectorAll('.nav__item')
const htmlDoc = document.querySelector('body')

function toggleOpenMenuClasses(){
    menuBtn.classList.toggle('burger--open')
    menu.classList.toggle('nav__menu--open')
    nav.classList.toggle('nav--open')
    htmlDoc.classList.toggle('overflow-hidden')
}

export function initNav(){
    menuBtn.addEventListener('click', () => {
        toggleOpenMenuClasses()
    })

    navItems.forEach(navItems => {
        navItems.addEventListener('click', () => {
            toggleOpenMenuClasses()
        })
    })
}