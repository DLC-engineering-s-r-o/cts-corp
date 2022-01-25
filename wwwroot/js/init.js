/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./Resources/Scripts/navigation.ts":
/*!*****************************************!*\
  !*** ./Resources/Scripts/navigation.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initNav = void 0;
const menuBtn = document.getElementById('nebuBtn');
const nav = document.querySelector('nav');
const menu = document.querySelector('.nav__menu');
const navItems = document.querySelectorAll('.nav__item');
const htmlDoc = document.querySelector('body');
const gallery = document.getElementById('gallery');
const social = document.querySelector('.social');
const halfDisplayHeight = window.innerHeight / 2;
function toggleOpenMenuClasses() {
    menuBtn.classList.toggle('burger--open');
    menu.classList.toggle('nav__menu--open');
    htmlDoc.classList.toggle('overflow-hidden');
    if (nav.classList.contains('nav--dark')) {
        nav.classList.toggle('nav--menu-open');
        social.classList.toggle('social--menu-open');
    }
}
function toggleNavColors() {
    if (window.pageYOffset >= gallery.offsetTop) {
        nav.classList.add('nav--dark');
    }
    else {
        nav.classList.remove('nav--dark');
    }
}
function toggleSocialColors() {
    if (window.pageYOffset >= gallery.offsetTop - halfDisplayHeight) {
        social.classList.add('social--dark');
    }
    else {
        social.classList.remove('social--dark');
    }
    if (window.pageYOffset >= gallery.offsetTop + halfDisplayHeight) {
        social.classList.remove('social--dark');
    }
}
function toggleNavClassesOnScroll() {
    let lastKnownScrollPosition = 0;
    let ticking = false;
    function toggleNavClasses(scrollPosition) {
        toggleNavColors();
        toggleSocialColors();
    }
    document.addEventListener('scroll', (e) => {
        lastKnownScrollPosition = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(function () {
                toggleNavClasses(lastKnownScrollPosition);
                ticking = false;
            });
            ticking = true;
        }
    });
}
function initNav() {
    menuBtn.addEventListener('click', () => {
        toggleOpenMenuClasses();
    });
    navItems.forEach(navItems => {
        navItems.addEventListener('click', () => {
            toggleOpenMenuClasses();
        });
    });
    toggleNavClassesOnScroll();
}
exports.initNav = initNav;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!***********************************!*\
  !*** ./Resources/Scripts/init.ts ***!
  \***********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const navigation_1 = __webpack_require__(/*! ./navigation */ "./Resources/Scripts/navigation.ts");
document.addEventListener("DOMContentLoaded", function () {
    (0, navigation_1.initNav)();
});

})();

/******/ })()
;
//# sourceMappingURL=init.js.map