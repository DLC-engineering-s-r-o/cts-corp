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
const menuBtn = document.getElementById('menuBtn');
const menu = document.querySelector('.nav__menu');
const navItems = document.querySelectorAll('.nav__item');
const htmlDoc = document.querySelector('body');
function toggleOpenMenuClasses() {
    menuBtn.classList.toggle('burger--open');
    menu.classList.toggle('nav__menu--open');
    htmlDoc.classList.toggle('overflow-hidden');
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