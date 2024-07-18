/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/satoshi-bitcoin";
exports.ids = ["vendor-chunks/satoshi-bitcoin"];
exports.modules = {

/***/ "(ssr)/./node_modules/satoshi-bitcoin/index.js":
/*!***********************************************!*\
  !*** ./node_modules/satoshi-bitcoin/index.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/**\n * @module satoshi-bitcoin\n */\n\nvar Big = __webpack_require__(/*! big.js */ \"(ssr)/./node_modules/big.js/big.js\");\n\n// @private\nvar conversion = 100000000;\n\n// es6 polyfill\nif (!Number.isInteger) {\n  Number.isInteger = function(num) {\n    return typeof num === 'number' && num % 1 === 0;\n  }\n}\n\n// @private\nfunction toNumber(notNum) {\n  return Number(notNum);\n}\n\nmodule.exports = {\n\n  /**\n   * Convert Satoshi to Bitcoin\n   * @param {number|string} satoshi Amount of Satoshi to convert. Must be a whole number\n   * @throws {TypeError} Thrown if input is not a number or string\n   * @throws {TypeError} Thrown if input is not a whole number or string format whole number\n   * @returns {number}\n   */\n  toBitcoin: function(satoshi) {\n    //validate arg\n    var satoshiType = typeof satoshi;\n    if (satoshiType === 'string') {\n      satoshi = toNumber(satoshi);\n      satoshiType = 'number';\n    }\n    if (satoshiType !== 'number'){\n      throw new TypeError('toBitcoin must be called on a number or string, got ' + satoshiType);\n    }\n    if (!Number.isInteger(satoshi)) {\n      throw new TypeError('toBitcoin must be called on a whole number or string format whole number');\n    }\n\n    var bigSatoshi = new Big(satoshi);\n    return Number(bigSatoshi.div(conversion));\n  },\n\n  /**\n   * Convert Bitcoin to Satoshi\n   * @param {number|string} bitcoin Amount of Bitcoin to convert\n   * @throws {TypeError} Thrown if input is not a number or string\n   * @returns {number}\n   */\n  toSatoshi: function(bitcoin) {\n    //validate arg\n    var bitcoinType = typeof bitcoin;\n    if (bitcoinType === 'string') {\n      bitcoin = toNumber(bitcoin);\n      bitcoinType = 'number';\n    }\n    if (bitcoinType !== 'number'){\n      throw new TypeError('toSatoshi must be called on a number or string, got ' + bitcoinType);\n    }\n\n    var bigBitcoin = new Big(bitcoin);\n    return Number(bigBitcoin.times(conversion));\n  }\n\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc2F0b3NoaS1iaXRjb2luL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVLG1CQUFPLENBQUMsa0RBQVE7O0FBRTFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLGVBQWU7QUFDNUIsY0FBYyxXQUFXO0FBQ3pCLGNBQWMsV0FBVztBQUN6QixlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsYUFBYSxlQUFlO0FBQzVCLGNBQWMsV0FBVztBQUN6QixlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9naXRodWJzdHJlYW1pbmcvLi9ub2RlX21vZHVsZXMvc2F0b3NoaS1iaXRjb2luL2luZGV4LmpzPzY0ZDQiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbW9kdWxlIHNhdG9zaGktYml0Y29pblxuICovXG5cbnZhciBCaWcgPSByZXF1aXJlKCdiaWcuanMnKTtcblxuLy8gQHByaXZhdGVcbnZhciBjb252ZXJzaW9uID0gMTAwMDAwMDAwO1xuXG4vLyBlczYgcG9seWZpbGxcbmlmICghTnVtYmVyLmlzSW50ZWdlcikge1xuICBOdW1iZXIuaXNJbnRlZ2VyID0gZnVuY3Rpb24obnVtKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBudW0gPT09ICdudW1iZXInICYmIG51bSAlIDEgPT09IDA7XG4gIH1cbn1cblxuLy8gQHByaXZhdGVcbmZ1bmN0aW9uIHRvTnVtYmVyKG5vdE51bSkge1xuICByZXR1cm4gTnVtYmVyKG5vdE51bSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIC8qKlxuICAgKiBDb252ZXJ0IFNhdG9zaGkgdG8gQml0Y29pblxuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IHNhdG9zaGkgQW1vdW50IG9mIFNhdG9zaGkgdG8gY29udmVydC4gTXVzdCBiZSBhIHdob2xlIG51bWJlclxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IFRocm93biBpZiBpbnB1dCBpcyBub3QgYSBudW1iZXIgb3Igc3RyaW5nXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gVGhyb3duIGlmIGlucHV0IGlzIG5vdCBhIHdob2xlIG51bWJlciBvciBzdHJpbmcgZm9ybWF0IHdob2xlIG51bWJlclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKi9cbiAgdG9CaXRjb2luOiBmdW5jdGlvbihzYXRvc2hpKSB7XG4gICAgLy92YWxpZGF0ZSBhcmdcbiAgICB2YXIgc2F0b3NoaVR5cGUgPSB0eXBlb2Ygc2F0b3NoaTtcbiAgICBpZiAoc2F0b3NoaVR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBzYXRvc2hpID0gdG9OdW1iZXIoc2F0b3NoaSk7XG4gICAgICBzYXRvc2hpVHlwZSA9ICdudW1iZXInO1xuICAgIH1cbiAgICBpZiAoc2F0b3NoaVR5cGUgIT09ICdudW1iZXInKXtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RvQml0Y29pbiBtdXN0IGJlIGNhbGxlZCBvbiBhIG51bWJlciBvciBzdHJpbmcsIGdvdCAnICsgc2F0b3NoaVR5cGUpO1xuICAgIH1cbiAgICBpZiAoIU51bWJlci5pc0ludGVnZXIoc2F0b3NoaSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RvQml0Y29pbiBtdXN0IGJlIGNhbGxlZCBvbiBhIHdob2xlIG51bWJlciBvciBzdHJpbmcgZm9ybWF0IHdob2xlIG51bWJlcicpO1xuICAgIH1cblxuICAgIHZhciBiaWdTYXRvc2hpID0gbmV3IEJpZyhzYXRvc2hpKTtcbiAgICByZXR1cm4gTnVtYmVyKGJpZ1NhdG9zaGkuZGl2KGNvbnZlcnNpb24pKTtcbiAgfSxcblxuICAvKipcbiAgICogQ29udmVydCBCaXRjb2luIHRvIFNhdG9zaGlcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBiaXRjb2luIEFtb3VudCBvZiBCaXRjb2luIHRvIGNvbnZlcnRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBUaHJvd24gaWYgaW5wdXQgaXMgbm90IGEgbnVtYmVyIG9yIHN0cmluZ1xuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKi9cbiAgdG9TYXRvc2hpOiBmdW5jdGlvbihiaXRjb2luKSB7XG4gICAgLy92YWxpZGF0ZSBhcmdcbiAgICB2YXIgYml0Y29pblR5cGUgPSB0eXBlb2YgYml0Y29pbjtcbiAgICBpZiAoYml0Y29pblR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBiaXRjb2luID0gdG9OdW1iZXIoYml0Y29pbik7XG4gICAgICBiaXRjb2luVHlwZSA9ICdudW1iZXInO1xuICAgIH1cbiAgICBpZiAoYml0Y29pblR5cGUgIT09ICdudW1iZXInKXtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RvU2F0b3NoaSBtdXN0IGJlIGNhbGxlZCBvbiBhIG51bWJlciBvciBzdHJpbmcsIGdvdCAnICsgYml0Y29pblR5cGUpO1xuICAgIH1cblxuICAgIHZhciBiaWdCaXRjb2luID0gbmV3IEJpZyhiaXRjb2luKTtcbiAgICByZXR1cm4gTnVtYmVyKGJpZ0JpdGNvaW4udGltZXMoY29udmVyc2lvbikpO1xuICB9XG5cbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/satoshi-bitcoin/index.js\n");

/***/ })

};
;