/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./Resources/Scripts/map.ts":
/*!**********************************!*\
  !*** ./Resources/Scripts/map.ts ***!
  \**********************************/
/***/ (() => {

throw new Error("Module build failed (from ./node_modules/ts-loader/index.js):\nError: TypeScript emitted no output for C:\\RigantiProjects\\DLC_group\\cts-corp\\Resources\\Scripts\\map.ts.\n    at makeSourceMapAndFinish (C:\\RigantiProjects\\DLC_group\\cts-corp\\node_modules\\ts-loader\\dist\\index.js:52:18)\n    at successLoader (C:\\RigantiProjects\\DLC_group\\cts-corp\\node_modules\\ts-loader\\dist\\index.js:39:5)\n    at Object.loader (C:\\RigantiProjects\\DLC_group\\cts-corp\\node_modules\\ts-loader\\dist\\index.js:22:5)");

/***/ }),

/***/ "./Resources/Scripts/navigation.ts":
/*!*****************************************!*\
  !*** ./Resources/Scripts/navigation.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initNav = void 0;
const menuBtn = document.getElementById('menuBtn');
const menu = document.querySelector('.nav__menu');
const nav = document.querySelector('nav');
const navItems = document.querySelectorAll('.nav__item');
const htmlDoc = document.querySelector('body');
function toggleOpenMenuClasses() {
    menuBtn.classList.toggle('burger--open');
    menu.classList.toggle('nav__menu--open');
    nav.classList.toggle('nav--open');
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
/*!***********************************!*\
  !*** ./Resources/Scripts/init.ts ***!
  \***********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const navigation_1 = __webpack_require__(/*! ./navigation */ "./Resources/Scripts/navigation.ts");
const map_1 = __webpack_require__(/*! ./map */ "./Resources/Scripts/map.ts");
document.addEventListener("DOMContentLoaded", function () {
    (0, navigation_1.initNav)();
    (0, map_1.initMap)();
});

})();

/******/ })()
;
//# sourceMappingURL=init.js.map