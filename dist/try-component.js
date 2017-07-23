(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/Users/Giles/codes/react-safety-net/example/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tryComponent", function() { return tryComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tryComponentFactory", function() { return tryComponentFactory; });
function tryComponent(Component, errorHandler) {
  return tryComponentFactory(errorHandler)(Component)
}

function tryComponentFactory(errorHandler) {
  return function (Component) {
    var instance = null

    // Replacement constructor will call the original and store new instance
    function WrappedComponent() {
      Component.apply(this, arguments)

      instance = this
    }

    WrappedComponent.prototype = Object.create(Component.prototype)

    const wrappedErrorHandler = wrapErrorHandler(
      errorHandler,
      function () { return instance }
    )

    // Replace each prototype method with an error handling proxy
    Object.getOwnPropertyNames(Component.prototype).forEach((property) => {
      if (typeof Component.prototype[property] === 'function') {
        Component.prototype[property] = tryMethod(
          Component.prototype[property],
          wrappedErrorHandler
        )
      }
    })

    return WrappedComponent
  }
}

function wrapErrorHandler(errorHandler, getInstance) {
  return function (error, thisArg, args) {
    const instance = getInstance()

    const context = {
      arguments: args,
      state: instance && instance.state,
      props: instance && instance.props
    }

    return errorHandler.apply(this, [error, context])
  }
}

function tryMethod(originalMethod, errorHandler) {
  return function () {
    try {
      return originalMethod.apply(this, arguments)
    } catch (e) {
      return errorHandler(e, this, arguments)
    }
  }
}




/***/ })
/******/ ]);
});