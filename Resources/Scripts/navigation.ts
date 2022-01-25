const menuBtn = document.getElementById('nebuBtn')
const nav = document.querySelector('nav')
const menu = document.querySelector('.nav__menu')
const navItems = document.querySelectorAll('.nav__item')
const htmlDoc = document.querySelector('body')
const gallery = document.getElementById('gallery')
const social = document.querySelector('.social')
const halfDisplayHeight = window.innerHeight / 2

function toggleOpenMenuClasses(){
    menuBtn.classList.toggle('burger--open')
    menu.classList.toggle('nav__menu--open')
    htmlDoc.classList.toggle('overflow-hidden')

    if (nav.classList.contains('nav--dark')){
        nav.classList.toggle('nav--menu-open')
        social.classList.toggle('social--menu-open')
    }
}

function toggleNavColors(){
    if(window.pageYOffset >= gallery.offsetTop){
        nav.classList.add('nav--dark')
    }
    else{ 
        nav.classList.remove('nav--dark')
    }
}

function toggleSocialColors(){
    if(window.pageYOffset >= gallery.offsetTop - halfDisplayHeight){
        social.classList.add('social--dark')
    }    
    else{ 
        social.classList.remove('social--dark')
    }

    if (window.pageYOffset >= gallery.offsetTop + halfDisplayHeight){
        social.classList.remove('social--dark')
    }
}

function toggleNavClassesOnScroll(){
    let lastKnownScrollPosition = 0;
    let ticking = false;

    function toggleNavClasses(scrollPosition){
        toggleNavColors()
        toggleSocialColors()
    }
    
    document.addEventListener('scroll', (e)=>{
        lastKnownScrollPosition = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(function() {
                toggleNavClasses(lastKnownScrollPosition);
              ticking = false;
            });
        
            ticking = true;
          }
      })
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

    toggleNavClassesOnScroll()
}