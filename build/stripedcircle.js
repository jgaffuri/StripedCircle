(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["gviz"] = factory();
	else
		root["gviz"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! exports provided: correction, makePattern */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "correction", function() { return correction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makePattern", function() { return makePattern; });
//@ts-check

/**
 * A fair approximation of the inverse function of x -> x-sin(x)
 * See: https://math.stackexchange.com/a/3653155/1009
 * 
 * @param {number} v 
 * @returns {number}
 */
const frec = (v) => {
  const t = Math.pow(6 * v, 1 / 3);
  const t2 = t * t;
  const t4 = t2 * t2;
  const t6 = t4 * t2;
  return (
    (t * (1 - (1267 / 9428) * t2 + (31 / 6507) * t4 - (1 / 32473) * t6)) /
    (1 - (2251 / 14902) * t2 + (63 / 9593) * t4 - (1 / 13890) * t6)
  );
}

/**
 * A first approximation.
 * @param {number} perc Percentage value, within [0,1] interval.
 * @returns {number}
 */
const d_ = function(perc) {
  const theta = frec(perc * 2 * Math.PI);
  return 0.5 * (1 - Math.cos(theta / 2));
}


/**
 * A fair approximation of the coefficient to use to compute the circle stripe width from a percentage value.
 * @param {number} perc Percentage value, within [0,1] interval.
 * @returns {number}
 */
 const correction = function(perc) {
  if (perc > 0.5) return 1 - d_(1 - perc);
  return d_(perc);
}


/**
 * 
 * @param {*} svg 
 * @param {*} id 
 * @param {*} width 
 * @param {*} percentages 
 * @param {*} colors 
 * @param {*} orientation 
 * @param {*} centerX 
 * @param {*} centerY 
 * @param {*} withCorrection 
 */
const makePattern = function (
  svg,
  id,
  width,
  percentages,
  colors,
  orientation,
  centerX,
  centerY,
  withCorrection = true
) {
  let defs = svg.select("defs");
  if (defs.size() === 0) defs = svg.append("defs");

  const pattern = defs
    .append("pattern")
    .attr("id", id)
    .attr("patternUnits", "objectBoundingBox")
    .attr("width", 1)
    .attr("height", 1)
    .attr(
      "patternTransform",
      "rotate(" + orientation + "," + centerX + "," + centerY + ")"
    );
  let cumPer = 0;
  for (let i = 0; i < percentages.length; i++) {
    const per = percentages[i] * 0.01;
    pattern
      .append("rect")
      .attr("x", width * (withCorrection ? correction(cumPer) : cumPer))
      .attr("y", 0)
      .attr("width", width * (withCorrection ? correction(per) : per))
      .attr("height", width)
      .attr("fill", colors[i]);
    cumPer += per;
  }
}


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ndml6L3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9ndml6L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2d2aXovLi9zcmMvanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQSxDQUFRO0FBQ1I7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsV0FBVyxFQUFFO0FBQ2IsV0FBVyxFQUFFO0FBQ2IsV0FBVyxFQUFFO0FBQ2IsV0FBVyxFQUFFO0FBQ2IsV0FBVyxFQUFFO0FBQ2IsV0FBVyxFQUFFO0FBQ2IsV0FBVyxFQUFFO0FBQ2IsV0FBVyxFQUFFO0FBQ2IsV0FBVyxFQUFFO0FBQ2I7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLHdCQUF3QjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InN0cmlwZWRjaXJjbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJndml6XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImd2aXpcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiYnVpbGQvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL2luZGV4LmpzXCIpO1xuIiwiLy9AdHMtY2hlY2tcblxuLyoqXG4gKiBBIGZhaXIgYXBwcm94aW1hdGlvbiBvZiB0aGUgaW52ZXJzZSBmdW5jdGlvbiBvZiB4IC0+IHgtc2luKHgpXG4gKiBTZWU6IGh0dHBzOi8vbWF0aC5zdGFja2V4Y2hhbmdlLmNvbS9hLzM2NTMxNTUvMTAwOVxuICogXG4gKiBAcGFyYW0ge251bWJlcn0gdiBcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmNvbnN0IGZyZWMgPSAodikgPT4ge1xuICBjb25zdCB0ID0gTWF0aC5wb3coNiAqIHYsIDEgLyAzKTtcbiAgY29uc3QgdDIgPSB0ICogdDtcbiAgY29uc3QgdDQgPSB0MiAqIHQyO1xuICBjb25zdCB0NiA9IHQ0ICogdDI7XG4gIHJldHVybiAoXG4gICAgKHQgKiAoMSAtICgxMjY3IC8gOTQyOCkgKiB0MiArICgzMSAvIDY1MDcpICogdDQgLSAoMSAvIDMyNDczKSAqIHQ2KSkgL1xuICAgICgxIC0gKDIyNTEgLyAxNDkwMikgKiB0MiArICg2MyAvIDk1OTMpICogdDQgLSAoMSAvIDEzODkwKSAqIHQ2KVxuICApO1xufVxuXG4vKipcbiAqIEEgZmlyc3QgYXBwcm94aW1hdGlvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBwZXJjIFBlcmNlbnRhZ2UgdmFsdWUsIHdpdGhpbiBbMCwxXSBpbnRlcnZhbC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmNvbnN0IGRfID0gZnVuY3Rpb24ocGVyYykge1xuICBjb25zdCB0aGV0YSA9IGZyZWMocGVyYyAqIDIgKiBNYXRoLlBJKTtcbiAgcmV0dXJuIDAuNSAqICgxIC0gTWF0aC5jb3ModGhldGEgLyAyKSk7XG59XG5cblxuLyoqXG4gKiBBIGZhaXIgYXBwcm94aW1hdGlvbiBvZiB0aGUgY29lZmZpY2llbnQgdG8gdXNlIHRvIGNvbXB1dGUgdGhlIGNpcmNsZSBzdHJpcGUgd2lkdGggZnJvbSBhIHBlcmNlbnRhZ2UgdmFsdWUuXG4gKiBAcGFyYW0ge251bWJlcn0gcGVyYyBQZXJjZW50YWdlIHZhbHVlLCB3aXRoaW4gWzAsMV0gaW50ZXJ2YWwuXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG4gZXhwb3J0IGNvbnN0IGNvcnJlY3Rpb24gPSBmdW5jdGlvbihwZXJjKSB7XG4gIGlmIChwZXJjID4gMC41KSByZXR1cm4gMSAtIGRfKDEgLSBwZXJjKTtcbiAgcmV0dXJuIGRfKHBlcmMpO1xufVxuXG5cbi8qKlxuICogXG4gKiBAcGFyYW0geyp9IHN2ZyBcbiAqIEBwYXJhbSB7Kn0gaWQgXG4gKiBAcGFyYW0geyp9IHdpZHRoIFxuICogQHBhcmFtIHsqfSBwZXJjZW50YWdlcyBcbiAqIEBwYXJhbSB7Kn0gY29sb3JzIFxuICogQHBhcmFtIHsqfSBvcmllbnRhdGlvbiBcbiAqIEBwYXJhbSB7Kn0gY2VudGVyWCBcbiAqIEBwYXJhbSB7Kn0gY2VudGVyWSBcbiAqIEBwYXJhbSB7Kn0gd2l0aENvcnJlY3Rpb24gXG4gKi9cbmV4cG9ydCBjb25zdCBtYWtlUGF0dGVybiA9IGZ1bmN0aW9uIChcbiAgc3ZnLFxuICBpZCxcbiAgd2lkdGgsXG4gIHBlcmNlbnRhZ2VzLFxuICBjb2xvcnMsXG4gIG9yaWVudGF0aW9uLFxuICBjZW50ZXJYLFxuICBjZW50ZXJZLFxuICB3aXRoQ29ycmVjdGlvbiA9IHRydWVcbikge1xuICBsZXQgZGVmcyA9IHN2Zy5zZWxlY3QoXCJkZWZzXCIpO1xuICBpZiAoZGVmcy5zaXplKCkgPT09IDApIGRlZnMgPSBzdmcuYXBwZW5kKFwiZGVmc1wiKTtcblxuICBjb25zdCBwYXR0ZXJuID0gZGVmc1xuICAgIC5hcHBlbmQoXCJwYXR0ZXJuXCIpXG4gICAgLmF0dHIoXCJpZFwiLCBpZClcbiAgICAuYXR0cihcInBhdHRlcm5Vbml0c1wiLCBcIm9iamVjdEJvdW5kaW5nQm94XCIpXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCAxKVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIDEpXG4gICAgLmF0dHIoXG4gICAgICBcInBhdHRlcm5UcmFuc2Zvcm1cIixcbiAgICAgIFwicm90YXRlKFwiICsgb3JpZW50YXRpb24gKyBcIixcIiArIGNlbnRlclggKyBcIixcIiArIGNlbnRlclkgKyBcIilcIlxuICAgICk7XG4gIGxldCBjdW1QZXIgPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHBlcmNlbnRhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgcGVyID0gcGVyY2VudGFnZXNbaV0gKiAwLjAxO1xuICAgIHBhdHRlcm5cbiAgICAgIC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgICAuYXR0cihcInhcIiwgd2lkdGggKiAod2l0aENvcnJlY3Rpb24gPyBjb3JyZWN0aW9uKGN1bVBlcikgOiBjdW1QZXIpKVxuICAgICAgLmF0dHIoXCJ5XCIsIDApXG4gICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoICogKHdpdGhDb3JyZWN0aW9uID8gY29ycmVjdGlvbihwZXIpIDogcGVyKSlcbiAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIHdpZHRoKVxuICAgICAgLmF0dHIoXCJmaWxsXCIsIGNvbG9yc1tpXSk7XG4gICAgY3VtUGVyICs9IHBlcjtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==