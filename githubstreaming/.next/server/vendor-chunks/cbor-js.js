/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/cbor-js";
exports.ids = ["vendor-chunks/cbor-js"];
exports.modules = {

/***/ "(ssr)/./node_modules/cbor-js/cbor.js":
/*!**************************************!*\
  !*** ./node_modules/cbor-js/cbor.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*\r\n * The MIT License (MIT)\r\n *\r\n * Copyright (c) 2014 Patrick Gansterer <paroga@paroga.com>\r\n *\r\n * Permission is hereby granted, free of charge, to any person obtaining a copy\r\n * of this software and associated documentation files (the \"Software\"), to deal\r\n * in the Software without restriction, including without limitation the rights\r\n * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r\n * copies of the Software, and to permit persons to whom the Software is\r\n * furnished to do so, subject to the following conditions:\r\n *\r\n * The above copyright notice and this permission notice shall be included in all\r\n * copies or substantial portions of the Software.\r\n *\r\n * THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r\n * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r\n * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r\n * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r\n * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r\n * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r\n * SOFTWARE.\r\n */\r\n\r\n(function(global, undefined) { \"use strict\";\r\nvar POW_2_24 = Math.pow(2, -24),\r\n    POW_2_32 = Math.pow(2, 32),\r\n    POW_2_53 = Math.pow(2, 53);\r\n\r\nfunction encode(value) {\r\n  var data = new ArrayBuffer(256);\r\n  var dataView = new DataView(data);\r\n  var lastLength;\r\n  var offset = 0;\r\n\r\n  function ensureSpace(length) {\r\n    var newByteLength = data.byteLength;\r\n    var requiredLength = offset + length;\r\n    while (newByteLength < requiredLength)\r\n      newByteLength *= 2;\r\n    if (newByteLength !== data.byteLength) {\r\n      var oldDataView = dataView;\r\n      data = new ArrayBuffer(newByteLength);\r\n      dataView = new DataView(data);\r\n      var uint32count = (offset + 3) >> 2;\r\n      for (var i = 0; i < uint32count; ++i)\r\n        dataView.setUint32(i * 4, oldDataView.getUint32(i * 4));\r\n    }\r\n\r\n    lastLength = length;\r\n    return dataView;\r\n  }\r\n  function write() {\r\n    offset += lastLength;\r\n  }\r\n  function writeFloat64(value) {\r\n    write(ensureSpace(8).setFloat64(offset, value));\r\n  }\r\n  function writeUint8(value) {\r\n    write(ensureSpace(1).setUint8(offset, value));\r\n  }\r\n  function writeUint8Array(value) {\r\n    var dataView = ensureSpace(value.length);\r\n    for (var i = 0; i < value.length; ++i)\r\n      dataView.setUint8(offset + i, value[i]);\r\n    write();\r\n  }\r\n  function writeUint16(value) {\r\n    write(ensureSpace(2).setUint16(offset, value));\r\n  }\r\n  function writeUint32(value) {\r\n    write(ensureSpace(4).setUint32(offset, value));\r\n  }\r\n  function writeUint64(value) {\r\n    var low = value % POW_2_32;\r\n    var high = (value - low) / POW_2_32;\r\n    var dataView = ensureSpace(8);\r\n    dataView.setUint32(offset, high);\r\n    dataView.setUint32(offset + 4, low);\r\n    write();\r\n  }\r\n  function writeTypeAndLength(type, length) {\r\n    if (length < 24) {\r\n      writeUint8(type << 5 | length);\r\n    } else if (length < 0x100) {\r\n      writeUint8(type << 5 | 24);\r\n      writeUint8(length);\r\n    } else if (length < 0x10000) {\r\n      writeUint8(type << 5 | 25);\r\n      writeUint16(length);\r\n    } else if (length < 0x100000000) {\r\n      writeUint8(type << 5 | 26);\r\n      writeUint32(length);\r\n    } else {\r\n      writeUint8(type << 5 | 27);\r\n      writeUint64(length);\r\n    }\r\n  }\r\n  \r\n  function encodeItem(value) {\r\n    var i;\r\n\r\n    if (value === false)\r\n      return writeUint8(0xf4);\r\n    if (value === true)\r\n      return writeUint8(0xf5);\r\n    if (value === null)\r\n      return writeUint8(0xf6);\r\n    if (value === undefined)\r\n      return writeUint8(0xf7);\r\n  \r\n    switch (typeof value) {\r\n      case \"number\":\r\n        if (Math.floor(value) === value) {\r\n          if (0 <= value && value <= POW_2_53)\r\n            return writeTypeAndLength(0, value);\r\n          if (-POW_2_53 <= value && value < 0)\r\n            return writeTypeAndLength(1, -(value + 1));\r\n        }\r\n        writeUint8(0xfb);\r\n        return writeFloat64(value);\r\n\r\n      case \"string\":\r\n        var utf8data = [];\r\n        for (i = 0; i < value.length; ++i) {\r\n          var charCode = value.charCodeAt(i);\r\n          if (charCode < 0x80) {\r\n            utf8data.push(charCode);\r\n          } else if (charCode < 0x800) {\r\n            utf8data.push(0xc0 | charCode >> 6);\r\n            utf8data.push(0x80 | charCode & 0x3f);\r\n          } else if (charCode < 0xd800) {\r\n            utf8data.push(0xe0 | charCode >> 12);\r\n            utf8data.push(0x80 | (charCode >> 6)  & 0x3f);\r\n            utf8data.push(0x80 | charCode & 0x3f);\r\n          } else {\r\n            charCode = (charCode & 0x3ff) << 10;\r\n            charCode |= value.charCodeAt(++i) & 0x3ff;\r\n            charCode += 0x10000;\r\n\r\n            utf8data.push(0xf0 | charCode >> 18);\r\n            utf8data.push(0x80 | (charCode >> 12)  & 0x3f);\r\n            utf8data.push(0x80 | (charCode >> 6)  & 0x3f);\r\n            utf8data.push(0x80 | charCode & 0x3f);\r\n          }\r\n        }\r\n\r\n        writeTypeAndLength(3, utf8data.length);\r\n        return writeUint8Array(utf8data);\r\n\r\n      default:\r\n        var length;\r\n        if (Array.isArray(value)) {\r\n          length = value.length;\r\n          writeTypeAndLength(4, length);\r\n          for (i = 0; i < length; ++i)\r\n            encodeItem(value[i]);\r\n        } else if (value instanceof Uint8Array) {\r\n          writeTypeAndLength(2, value.length);\r\n          writeUint8Array(value);\r\n        } else {\r\n          var keys = Object.keys(value);\r\n          length = keys.length;\r\n          writeTypeAndLength(5, length);\r\n          for (i = 0; i < length; ++i) {\r\n            var key = keys[i];\r\n            encodeItem(key);\r\n            encodeItem(value[key]);\r\n          }\r\n        }\r\n    }\r\n  }\r\n  \r\n  encodeItem(value);\r\n\r\n  if (\"slice\" in data)\r\n    return data.slice(0, offset);\r\n  \r\n  var ret = new ArrayBuffer(offset);\r\n  var retView = new DataView(ret);\r\n  for (var i = 0; i < offset; ++i)\r\n    retView.setUint8(i, dataView.getUint8(i));\r\n  return ret;\r\n}\r\n\r\nfunction decode(data, tagger, simpleValue) {\r\n  var dataView = new DataView(data);\r\n  var offset = 0;\r\n  \r\n  if (typeof tagger !== \"function\")\r\n    tagger = function(value) { return value; };\r\n  if (typeof simpleValue !== \"function\")\r\n    simpleValue = function() { return undefined; };\r\n\r\n  function read(value, length) {\r\n    offset += length;\r\n    return value;\r\n  }\r\n  function readArrayBuffer(length) {\r\n    return read(new Uint8Array(data, offset, length), length);\r\n  }\r\n  function readFloat16() {\r\n    var tempArrayBuffer = new ArrayBuffer(4);\r\n    var tempDataView = new DataView(tempArrayBuffer);\r\n    var value = readUint16();\r\n\r\n    var sign = value & 0x8000;\r\n    var exponent = value & 0x7c00;\r\n    var fraction = value & 0x03ff;\r\n    \r\n    if (exponent === 0x7c00)\r\n      exponent = 0xff << 10;\r\n    else if (exponent !== 0)\r\n      exponent += (127 - 15) << 10;\r\n    else if (fraction !== 0)\r\n      return fraction * POW_2_24;\r\n    \r\n    tempDataView.setUint32(0, sign << 16 | exponent << 13 | fraction << 13);\r\n    return tempDataView.getFloat32(0);\r\n  }\r\n  function readFloat32() {\r\n    return read(dataView.getFloat32(offset), 4);\r\n  }\r\n  function readFloat64() {\r\n    return read(dataView.getFloat64(offset), 8);\r\n  }\r\n  function readUint8() {\r\n    return read(dataView.getUint8(offset), 1);\r\n  }\r\n  function readUint16() {\r\n    return read(dataView.getUint16(offset), 2);\r\n  }\r\n  function readUint32() {\r\n    return read(dataView.getUint32(offset), 4);\r\n  }\r\n  function readUint64() {\r\n    return readUint32() * POW_2_32 + readUint32();\r\n  }\r\n  function readBreak() {\r\n    if (dataView.getUint8(offset) !== 0xff)\r\n      return false;\r\n    offset += 1;\r\n    return true;\r\n  }\r\n  function readLength(additionalInformation) {\r\n    if (additionalInformation < 24)\r\n      return additionalInformation;\r\n    if (additionalInformation === 24)\r\n      return readUint8();\r\n    if (additionalInformation === 25)\r\n      return readUint16();\r\n    if (additionalInformation === 26)\r\n      return readUint32();\r\n    if (additionalInformation === 27)\r\n      return readUint64();\r\n    if (additionalInformation === 31)\r\n      return -1;\r\n    throw \"Invalid length encoding\";\r\n  }\r\n  function readIndefiniteStringLength(majorType) {\r\n    var initialByte = readUint8();\r\n    if (initialByte === 0xff)\r\n      return -1;\r\n    var length = readLength(initialByte & 0x1f);\r\n    if (length < 0 || (initialByte >> 5) !== majorType)\r\n      throw \"Invalid indefinite length element\";\r\n    return length;\r\n  }\r\n\r\n  function appendUtf16data(utf16data, length) {\r\n    for (var i = 0; i < length; ++i) {\r\n      var value = readUint8();\r\n      if (value & 0x80) {\r\n        if (value < 0xe0) {\r\n          value = (value & 0x1f) <<  6\r\n                | (readUint8() & 0x3f);\r\n          length -= 1;\r\n        } else if (value < 0xf0) {\r\n          value = (value & 0x0f) << 12\r\n                | (readUint8() & 0x3f) << 6\r\n                | (readUint8() & 0x3f);\r\n          length -= 2;\r\n        } else {\r\n          value = (value & 0x0f) << 18\r\n                | (readUint8() & 0x3f) << 12\r\n                | (readUint8() & 0x3f) << 6\r\n                | (readUint8() & 0x3f);\r\n          length -= 3;\r\n        }\r\n      }\r\n\r\n      if (value < 0x10000) {\r\n        utf16data.push(value);\r\n      } else {\r\n        value -= 0x10000;\r\n        utf16data.push(0xd800 | (value >> 10));\r\n        utf16data.push(0xdc00 | (value & 0x3ff));\r\n      }\r\n    }\r\n  }\r\n\r\n  function decodeItem() {\r\n    var initialByte = readUint8();\r\n    var majorType = initialByte >> 5;\r\n    var additionalInformation = initialByte & 0x1f;\r\n    var i;\r\n    var length;\r\n\r\n    if (majorType === 7) {\r\n      switch (additionalInformation) {\r\n        case 25:\r\n          return readFloat16();\r\n        case 26:\r\n          return readFloat32();\r\n        case 27:\r\n          return readFloat64();\r\n      }\r\n    }\r\n\r\n    length = readLength(additionalInformation);\r\n    if (length < 0 && (majorType < 2 || 6 < majorType))\r\n      throw \"Invalid length\";\r\n\r\n    switch (majorType) {\r\n      case 0:\r\n        return length;\r\n      case 1:\r\n        return -1 - length;\r\n      case 2:\r\n        if (length < 0) {\r\n          var elements = [];\r\n          var fullArrayLength = 0;\r\n          while ((length = readIndefiniteStringLength(majorType)) >= 0) {\r\n            fullArrayLength += length;\r\n            elements.push(readArrayBuffer(length));\r\n          }\r\n          var fullArray = new Uint8Array(fullArrayLength);\r\n          var fullArrayOffset = 0;\r\n          for (i = 0; i < elements.length; ++i) {\r\n            fullArray.set(elements[i], fullArrayOffset);\r\n            fullArrayOffset += elements[i].length;\r\n          }\r\n          return fullArray;\r\n        }\r\n        return readArrayBuffer(length);\r\n      case 3:\r\n        var utf16data = [];\r\n        if (length < 0) {\r\n          while ((length = readIndefiniteStringLength(majorType)) >= 0)\r\n            appendUtf16data(utf16data, length);\r\n        } else\r\n          appendUtf16data(utf16data, length);\r\n        return String.fromCharCode.apply(null, utf16data);\r\n      case 4:\r\n        var retArray;\r\n        if (length < 0) {\r\n          retArray = [];\r\n          while (!readBreak())\r\n            retArray.push(decodeItem());\r\n        } else {\r\n          retArray = new Array(length);\r\n          for (i = 0; i < length; ++i)\r\n            retArray[i] = decodeItem();\r\n        }\r\n        return retArray;\r\n      case 5:\r\n        var retObject = {};\r\n        for (i = 0; i < length || length < 0 && !readBreak(); ++i) {\r\n          var key = decodeItem();\r\n          retObject[key] = decodeItem();\r\n        }\r\n        return retObject;\r\n      case 6:\r\n        return tagger(decodeItem(), length);\r\n      case 7:\r\n        switch (length) {\r\n          case 20:\r\n            return false;\r\n          case 21:\r\n            return true;\r\n          case 22:\r\n            return null;\r\n          case 23:\r\n            return undefined;\r\n          default:\r\n            return simpleValue(length);\r\n        }\r\n    }\r\n  }\r\n\r\n  var ret = decodeItem();\r\n  if (offset !== data.byteLength)\r\n    throw \"Remaining bytes\";\r\n  return ret;\r\n}\r\n\r\nvar obj = { encode: encode, decode: decode };\r\n\r\nif (true)\r\n  !(__WEBPACK_AMD_DEFINE_FACTORY__ = (obj),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :\n\t\t__WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\r\nelse {}\r\n\r\n})(this);\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHFCQUFxQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxzQkFBc0IsWUFBWTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDBDQUEwQztBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBLElBQUksSUFBMEM7QUFDOUMsRUFBRSxvQ0FBb0IsR0FBRztBQUFBO0FBQUE7QUFBQTtBQUFBLGtHQUFDO0FBQzFCLEtBQUssRUFHZTtBQUNwQjtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9naXRodWJzdHJlYW1pbmcvLi9ub2RlX21vZHVsZXMvY2Jvci1qcy9jYm9yLmpzP2E3NGUiXSwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXHJcbiAqXHJcbiAqIENvcHlyaWdodCAoYykgMjAxNCBQYXRyaWNrIEdhbnN0ZXJlciA8cGFyb2dhQHBhcm9nYS5jb20+XHJcbiAqXHJcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcbiAqXHJcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxyXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG4gKlxyXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxyXG4gKiBTT0ZUV0FSRS5cclxuICovXHJcblxyXG4oZnVuY3Rpb24oZ2xvYmFsLCB1bmRlZmluZWQpIHsgXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBQT1dfMl8yNCA9IE1hdGgucG93KDIsIC0yNCksXHJcbiAgICBQT1dfMl8zMiA9IE1hdGgucG93KDIsIDMyKSxcclxuICAgIFBPV18yXzUzID0gTWF0aC5wb3coMiwgNTMpO1xyXG5cclxuZnVuY3Rpb24gZW5jb2RlKHZhbHVlKSB7XHJcbiAgdmFyIGRhdGEgPSBuZXcgQXJyYXlCdWZmZXIoMjU2KTtcclxuICB2YXIgZGF0YVZpZXcgPSBuZXcgRGF0YVZpZXcoZGF0YSk7XHJcbiAgdmFyIGxhc3RMZW5ndGg7XHJcbiAgdmFyIG9mZnNldCA9IDA7XHJcblxyXG4gIGZ1bmN0aW9uIGVuc3VyZVNwYWNlKGxlbmd0aCkge1xyXG4gICAgdmFyIG5ld0J5dGVMZW5ndGggPSBkYXRhLmJ5dGVMZW5ndGg7XHJcbiAgICB2YXIgcmVxdWlyZWRMZW5ndGggPSBvZmZzZXQgKyBsZW5ndGg7XHJcbiAgICB3aGlsZSAobmV3Qnl0ZUxlbmd0aCA8IHJlcXVpcmVkTGVuZ3RoKVxyXG4gICAgICBuZXdCeXRlTGVuZ3RoICo9IDI7XHJcbiAgICBpZiAobmV3Qnl0ZUxlbmd0aCAhPT0gZGF0YS5ieXRlTGVuZ3RoKSB7XHJcbiAgICAgIHZhciBvbGREYXRhVmlldyA9IGRhdGFWaWV3O1xyXG4gICAgICBkYXRhID0gbmV3IEFycmF5QnVmZmVyKG5ld0J5dGVMZW5ndGgpO1xyXG4gICAgICBkYXRhVmlldyA9IG5ldyBEYXRhVmlldyhkYXRhKTtcclxuICAgICAgdmFyIHVpbnQzMmNvdW50ID0gKG9mZnNldCArIDMpID4+IDI7XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdWludDMyY291bnQ7ICsraSlcclxuICAgICAgICBkYXRhVmlldy5zZXRVaW50MzIoaSAqIDQsIG9sZERhdGFWaWV3LmdldFVpbnQzMihpICogNCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGxhc3RMZW5ndGggPSBsZW5ndGg7XHJcbiAgICByZXR1cm4gZGF0YVZpZXc7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHdyaXRlKCkge1xyXG4gICAgb2Zmc2V0ICs9IGxhc3RMZW5ndGg7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHdyaXRlRmxvYXQ2NCh2YWx1ZSkge1xyXG4gICAgd3JpdGUoZW5zdXJlU3BhY2UoOCkuc2V0RmxvYXQ2NChvZmZzZXQsIHZhbHVlKSk7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHdyaXRlVWludDgodmFsdWUpIHtcclxuICAgIHdyaXRlKGVuc3VyZVNwYWNlKDEpLnNldFVpbnQ4KG9mZnNldCwgdmFsdWUpKTtcclxuICB9XHJcbiAgZnVuY3Rpb24gd3JpdGVVaW50OEFycmF5KHZhbHVlKSB7XHJcbiAgICB2YXIgZGF0YVZpZXcgPSBlbnN1cmVTcGFjZSh2YWx1ZS5sZW5ndGgpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7ICsraSlcclxuICAgICAgZGF0YVZpZXcuc2V0VWludDgob2Zmc2V0ICsgaSwgdmFsdWVbaV0pO1xyXG4gICAgd3JpdGUoKTtcclxuICB9XHJcbiAgZnVuY3Rpb24gd3JpdGVVaW50MTYodmFsdWUpIHtcclxuICAgIHdyaXRlKGVuc3VyZVNwYWNlKDIpLnNldFVpbnQxNihvZmZzZXQsIHZhbHVlKSk7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHdyaXRlVWludDMyKHZhbHVlKSB7XHJcbiAgICB3cml0ZShlbnN1cmVTcGFjZSg0KS5zZXRVaW50MzIob2Zmc2V0LCB2YWx1ZSkpO1xyXG4gIH1cclxuICBmdW5jdGlvbiB3cml0ZVVpbnQ2NCh2YWx1ZSkge1xyXG4gICAgdmFyIGxvdyA9IHZhbHVlICUgUE9XXzJfMzI7XHJcbiAgICB2YXIgaGlnaCA9ICh2YWx1ZSAtIGxvdykgLyBQT1dfMl8zMjtcclxuICAgIHZhciBkYXRhVmlldyA9IGVuc3VyZVNwYWNlKDgpO1xyXG4gICAgZGF0YVZpZXcuc2V0VWludDMyKG9mZnNldCwgaGlnaCk7XHJcbiAgICBkYXRhVmlldy5zZXRVaW50MzIob2Zmc2V0ICsgNCwgbG93KTtcclxuICAgIHdyaXRlKCk7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHdyaXRlVHlwZUFuZExlbmd0aCh0eXBlLCBsZW5ndGgpIHtcclxuICAgIGlmIChsZW5ndGggPCAyNCkge1xyXG4gICAgICB3cml0ZVVpbnQ4KHR5cGUgPDwgNSB8IGxlbmd0aCk7XHJcbiAgICB9IGVsc2UgaWYgKGxlbmd0aCA8IDB4MTAwKSB7XHJcbiAgICAgIHdyaXRlVWludDgodHlwZSA8PCA1IHwgMjQpO1xyXG4gICAgICB3cml0ZVVpbnQ4KGxlbmd0aCk7XHJcbiAgICB9IGVsc2UgaWYgKGxlbmd0aCA8IDB4MTAwMDApIHtcclxuICAgICAgd3JpdGVVaW50OCh0eXBlIDw8IDUgfCAyNSk7XHJcbiAgICAgIHdyaXRlVWludDE2KGxlbmd0aCk7XHJcbiAgICB9IGVsc2UgaWYgKGxlbmd0aCA8IDB4MTAwMDAwMDAwKSB7XHJcbiAgICAgIHdyaXRlVWludDgodHlwZSA8PCA1IHwgMjYpO1xyXG4gICAgICB3cml0ZVVpbnQzMihsZW5ndGgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd3JpdGVVaW50OCh0eXBlIDw8IDUgfCAyNyk7XHJcbiAgICAgIHdyaXRlVWludDY0KGxlbmd0aCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIGZ1bmN0aW9uIGVuY29kZUl0ZW0odmFsdWUpIHtcclxuICAgIHZhciBpO1xyXG5cclxuICAgIGlmICh2YWx1ZSA9PT0gZmFsc2UpXHJcbiAgICAgIHJldHVybiB3cml0ZVVpbnQ4KDB4ZjQpO1xyXG4gICAgaWYgKHZhbHVlID09PSB0cnVlKVxyXG4gICAgICByZXR1cm4gd3JpdGVVaW50OCgweGY1KTtcclxuICAgIGlmICh2YWx1ZSA9PT0gbnVsbClcclxuICAgICAgcmV0dXJuIHdyaXRlVWludDgoMHhmNik7XHJcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZClcclxuICAgICAgcmV0dXJuIHdyaXRlVWludDgoMHhmNyk7XHJcbiAgXHJcbiAgICBzd2l0Y2ggKHR5cGVvZiB2YWx1ZSkge1xyXG4gICAgICBjYXNlIFwibnVtYmVyXCI6XHJcbiAgICAgICAgaWYgKE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZSkge1xyXG4gICAgICAgICAgaWYgKDAgPD0gdmFsdWUgJiYgdmFsdWUgPD0gUE9XXzJfNTMpXHJcbiAgICAgICAgICAgIHJldHVybiB3cml0ZVR5cGVBbmRMZW5ndGgoMCwgdmFsdWUpO1xyXG4gICAgICAgICAgaWYgKC1QT1dfMl81MyA8PSB2YWx1ZSAmJiB2YWx1ZSA8IDApXHJcbiAgICAgICAgICAgIHJldHVybiB3cml0ZVR5cGVBbmRMZW5ndGgoMSwgLSh2YWx1ZSArIDEpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgd3JpdGVVaW50OCgweGZiKTtcclxuICAgICAgICByZXR1cm4gd3JpdGVGbG9hdDY0KHZhbHVlKTtcclxuXHJcbiAgICAgIGNhc2UgXCJzdHJpbmdcIjpcclxuICAgICAgICB2YXIgdXRmOGRhdGEgPSBbXTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgIHZhciBjaGFyQ29kZSA9IHZhbHVlLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgICBpZiAoY2hhckNvZGUgPCAweDgwKSB7XHJcbiAgICAgICAgICAgIHV0ZjhkYXRhLnB1c2goY2hhckNvZGUpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChjaGFyQ29kZSA8IDB4ODAwKSB7XHJcbiAgICAgICAgICAgIHV0ZjhkYXRhLnB1c2goMHhjMCB8IGNoYXJDb2RlID4+IDYpO1xyXG4gICAgICAgICAgICB1dGY4ZGF0YS5wdXNoKDB4ODAgfCBjaGFyQ29kZSAmIDB4M2YpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChjaGFyQ29kZSA8IDB4ZDgwMCkge1xyXG4gICAgICAgICAgICB1dGY4ZGF0YS5wdXNoKDB4ZTAgfCBjaGFyQ29kZSA+PiAxMik7XHJcbiAgICAgICAgICAgIHV0ZjhkYXRhLnB1c2goMHg4MCB8IChjaGFyQ29kZSA+PiA2KSAgJiAweDNmKTtcclxuICAgICAgICAgICAgdXRmOGRhdGEucHVzaCgweDgwIHwgY2hhckNvZGUgJiAweDNmKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNoYXJDb2RlID0gKGNoYXJDb2RlICYgMHgzZmYpIDw8IDEwO1xyXG4gICAgICAgICAgICBjaGFyQ29kZSB8PSB2YWx1ZS5jaGFyQ29kZUF0KCsraSkgJiAweDNmZjtcclxuICAgICAgICAgICAgY2hhckNvZGUgKz0gMHgxMDAwMDtcclxuXHJcbiAgICAgICAgICAgIHV0ZjhkYXRhLnB1c2goMHhmMCB8IGNoYXJDb2RlID4+IDE4KTtcclxuICAgICAgICAgICAgdXRmOGRhdGEucHVzaCgweDgwIHwgKGNoYXJDb2RlID4+IDEyKSAgJiAweDNmKTtcclxuICAgICAgICAgICAgdXRmOGRhdGEucHVzaCgweDgwIHwgKGNoYXJDb2RlID4+IDYpICAmIDB4M2YpO1xyXG4gICAgICAgICAgICB1dGY4ZGF0YS5wdXNoKDB4ODAgfCBjaGFyQ29kZSAmIDB4M2YpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd3JpdGVUeXBlQW5kTGVuZ3RoKDMsIHV0ZjhkYXRhLmxlbmd0aCk7XHJcbiAgICAgICAgcmV0dXJuIHdyaXRlVWludDhBcnJheSh1dGY4ZGF0YSk7XHJcblxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHZhciBsZW5ndGg7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICBsZW5ndGggPSB2YWx1ZS5sZW5ndGg7XHJcbiAgICAgICAgICB3cml0ZVR5cGVBbmRMZW5ndGgoNCwgbGVuZ3RoKTtcclxuICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7ICsraSlcclxuICAgICAgICAgICAgZW5jb2RlSXRlbSh2YWx1ZVtpXSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcclxuICAgICAgICAgIHdyaXRlVHlwZUFuZExlbmd0aCgyLCB2YWx1ZS5sZW5ndGgpO1xyXG4gICAgICAgICAgd3JpdGVVaW50OEFycmF5KHZhbHVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZSk7XHJcbiAgICAgICAgICBsZW5ndGggPSBrZXlzLmxlbmd0aDtcclxuICAgICAgICAgIHdyaXRlVHlwZUFuZExlbmd0aCg1LCBsZW5ndGgpO1xyXG4gICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xyXG4gICAgICAgICAgICBlbmNvZGVJdGVtKGtleSk7XHJcbiAgICAgICAgICAgIGVuY29kZUl0ZW0odmFsdWVba2V5XSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICBlbmNvZGVJdGVtKHZhbHVlKTtcclxuXHJcbiAgaWYgKFwic2xpY2VcIiBpbiBkYXRhKVxyXG4gICAgcmV0dXJuIGRhdGEuc2xpY2UoMCwgb2Zmc2V0KTtcclxuICBcclxuICB2YXIgcmV0ID0gbmV3IEFycmF5QnVmZmVyKG9mZnNldCk7XHJcbiAgdmFyIHJldFZpZXcgPSBuZXcgRGF0YVZpZXcocmV0KTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IG9mZnNldDsgKytpKVxyXG4gICAgcmV0Vmlldy5zZXRVaW50OChpLCBkYXRhVmlldy5nZXRVaW50OChpKSk7XHJcbiAgcmV0dXJuIHJldDtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVjb2RlKGRhdGEsIHRhZ2dlciwgc2ltcGxlVmFsdWUpIHtcclxuICB2YXIgZGF0YVZpZXcgPSBuZXcgRGF0YVZpZXcoZGF0YSk7XHJcbiAgdmFyIG9mZnNldCA9IDA7XHJcbiAgXHJcbiAgaWYgKHR5cGVvZiB0YWdnZXIgIT09IFwiZnVuY3Rpb25cIilcclxuICAgIHRhZ2dlciA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcclxuICBpZiAodHlwZW9mIHNpbXBsZVZhbHVlICE9PSBcImZ1bmN0aW9uXCIpXHJcbiAgICBzaW1wbGVWYWx1ZSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9O1xyXG5cclxuICBmdW5jdGlvbiByZWFkKHZhbHVlLCBsZW5ndGgpIHtcclxuICAgIG9mZnNldCArPSBsZW5ndGg7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHJlYWRBcnJheUJ1ZmZlcihsZW5ndGgpIHtcclxuICAgIHJldHVybiByZWFkKG5ldyBVaW50OEFycmF5KGRhdGEsIG9mZnNldCwgbGVuZ3RoKSwgbGVuZ3RoKTtcclxuICB9XHJcbiAgZnVuY3Rpb24gcmVhZEZsb2F0MTYoKSB7XHJcbiAgICB2YXIgdGVtcEFycmF5QnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKDQpO1xyXG4gICAgdmFyIHRlbXBEYXRhVmlldyA9IG5ldyBEYXRhVmlldyh0ZW1wQXJyYXlCdWZmZXIpO1xyXG4gICAgdmFyIHZhbHVlID0gcmVhZFVpbnQxNigpO1xyXG5cclxuICAgIHZhciBzaWduID0gdmFsdWUgJiAweDgwMDA7XHJcbiAgICB2YXIgZXhwb25lbnQgPSB2YWx1ZSAmIDB4N2MwMDtcclxuICAgIHZhciBmcmFjdGlvbiA9IHZhbHVlICYgMHgwM2ZmO1xyXG4gICAgXHJcbiAgICBpZiAoZXhwb25lbnQgPT09IDB4N2MwMClcclxuICAgICAgZXhwb25lbnQgPSAweGZmIDw8IDEwO1xyXG4gICAgZWxzZSBpZiAoZXhwb25lbnQgIT09IDApXHJcbiAgICAgIGV4cG9uZW50ICs9ICgxMjcgLSAxNSkgPDwgMTA7XHJcbiAgICBlbHNlIGlmIChmcmFjdGlvbiAhPT0gMClcclxuICAgICAgcmV0dXJuIGZyYWN0aW9uICogUE9XXzJfMjQ7XHJcbiAgICBcclxuICAgIHRlbXBEYXRhVmlldy5zZXRVaW50MzIoMCwgc2lnbiA8PCAxNiB8IGV4cG9uZW50IDw8IDEzIHwgZnJhY3Rpb24gPDwgMTMpO1xyXG4gICAgcmV0dXJuIHRlbXBEYXRhVmlldy5nZXRGbG9hdDMyKDApO1xyXG4gIH1cclxuICBmdW5jdGlvbiByZWFkRmxvYXQzMigpIHtcclxuICAgIHJldHVybiByZWFkKGRhdGFWaWV3LmdldEZsb2F0MzIob2Zmc2V0KSwgNCk7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHJlYWRGbG9hdDY0KCkge1xyXG4gICAgcmV0dXJuIHJlYWQoZGF0YVZpZXcuZ2V0RmxvYXQ2NChvZmZzZXQpLCA4KTtcclxuICB9XHJcbiAgZnVuY3Rpb24gcmVhZFVpbnQ4KCkge1xyXG4gICAgcmV0dXJuIHJlYWQoZGF0YVZpZXcuZ2V0VWludDgob2Zmc2V0KSwgMSk7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHJlYWRVaW50MTYoKSB7XHJcbiAgICByZXR1cm4gcmVhZChkYXRhVmlldy5nZXRVaW50MTYob2Zmc2V0KSwgMik7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHJlYWRVaW50MzIoKSB7XHJcbiAgICByZXR1cm4gcmVhZChkYXRhVmlldy5nZXRVaW50MzIob2Zmc2V0KSwgNCk7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHJlYWRVaW50NjQoKSB7XHJcbiAgICByZXR1cm4gcmVhZFVpbnQzMigpICogUE9XXzJfMzIgKyByZWFkVWludDMyKCk7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHJlYWRCcmVhaygpIHtcclxuICAgIGlmIChkYXRhVmlldy5nZXRVaW50OChvZmZzZXQpICE9PSAweGZmKVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICBvZmZzZXQgKz0gMTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuICBmdW5jdGlvbiByZWFkTGVuZ3RoKGFkZGl0aW9uYWxJbmZvcm1hdGlvbikge1xyXG4gICAgaWYgKGFkZGl0aW9uYWxJbmZvcm1hdGlvbiA8IDI0KVxyXG4gICAgICByZXR1cm4gYWRkaXRpb25hbEluZm9ybWF0aW9uO1xyXG4gICAgaWYgKGFkZGl0aW9uYWxJbmZvcm1hdGlvbiA9PT0gMjQpXHJcbiAgICAgIHJldHVybiByZWFkVWludDgoKTtcclxuICAgIGlmIChhZGRpdGlvbmFsSW5mb3JtYXRpb24gPT09IDI1KVxyXG4gICAgICByZXR1cm4gcmVhZFVpbnQxNigpO1xyXG4gICAgaWYgKGFkZGl0aW9uYWxJbmZvcm1hdGlvbiA9PT0gMjYpXHJcbiAgICAgIHJldHVybiByZWFkVWludDMyKCk7XHJcbiAgICBpZiAoYWRkaXRpb25hbEluZm9ybWF0aW9uID09PSAyNylcclxuICAgICAgcmV0dXJuIHJlYWRVaW50NjQoKTtcclxuICAgIGlmIChhZGRpdGlvbmFsSW5mb3JtYXRpb24gPT09IDMxKVxyXG4gICAgICByZXR1cm4gLTE7XHJcbiAgICB0aHJvdyBcIkludmFsaWQgbGVuZ3RoIGVuY29kaW5nXCI7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHJlYWRJbmRlZmluaXRlU3RyaW5nTGVuZ3RoKG1ham9yVHlwZSkge1xyXG4gICAgdmFyIGluaXRpYWxCeXRlID0gcmVhZFVpbnQ4KCk7XHJcbiAgICBpZiAoaW5pdGlhbEJ5dGUgPT09IDB4ZmYpXHJcbiAgICAgIHJldHVybiAtMTtcclxuICAgIHZhciBsZW5ndGggPSByZWFkTGVuZ3RoKGluaXRpYWxCeXRlICYgMHgxZik7XHJcbiAgICBpZiAobGVuZ3RoIDwgMCB8fCAoaW5pdGlhbEJ5dGUgPj4gNSkgIT09IG1ham9yVHlwZSlcclxuICAgICAgdGhyb3cgXCJJbnZhbGlkIGluZGVmaW5pdGUgbGVuZ3RoIGVsZW1lbnRcIjtcclxuICAgIHJldHVybiBsZW5ndGg7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhcHBlbmRVdGYxNmRhdGEodXRmMTZkYXRhLCBsZW5ndGgpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcclxuICAgICAgdmFyIHZhbHVlID0gcmVhZFVpbnQ4KCk7XHJcbiAgICAgIGlmICh2YWx1ZSAmIDB4ODApIHtcclxuICAgICAgICBpZiAodmFsdWUgPCAweGUwKSB7XHJcbiAgICAgICAgICB2YWx1ZSA9ICh2YWx1ZSAmIDB4MWYpIDw8ICA2XHJcbiAgICAgICAgICAgICAgICB8IChyZWFkVWludDgoKSAmIDB4M2YpO1xyXG4gICAgICAgICAgbGVuZ3RoIC09IDE7XHJcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA8IDB4ZjApIHtcclxuICAgICAgICAgIHZhbHVlID0gKHZhbHVlICYgMHgwZikgPDwgMTJcclxuICAgICAgICAgICAgICAgIHwgKHJlYWRVaW50OCgpICYgMHgzZikgPDwgNlxyXG4gICAgICAgICAgICAgICAgfCAocmVhZFVpbnQ4KCkgJiAweDNmKTtcclxuICAgICAgICAgIGxlbmd0aCAtPSAyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB2YWx1ZSA9ICh2YWx1ZSAmIDB4MGYpIDw8IDE4XHJcbiAgICAgICAgICAgICAgICB8IChyZWFkVWludDgoKSAmIDB4M2YpIDw8IDEyXHJcbiAgICAgICAgICAgICAgICB8IChyZWFkVWludDgoKSAmIDB4M2YpIDw8IDZcclxuICAgICAgICAgICAgICAgIHwgKHJlYWRVaW50OCgpICYgMHgzZik7XHJcbiAgICAgICAgICBsZW5ndGggLT0gMztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh2YWx1ZSA8IDB4MTAwMDApIHtcclxuICAgICAgICB1dGYxNmRhdGEucHVzaCh2YWx1ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFsdWUgLT0gMHgxMDAwMDtcclxuICAgICAgICB1dGYxNmRhdGEucHVzaCgweGQ4MDAgfCAodmFsdWUgPj4gMTApKTtcclxuICAgICAgICB1dGYxNmRhdGEucHVzaCgweGRjMDAgfCAodmFsdWUgJiAweDNmZikpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkZWNvZGVJdGVtKCkge1xyXG4gICAgdmFyIGluaXRpYWxCeXRlID0gcmVhZFVpbnQ4KCk7XHJcbiAgICB2YXIgbWFqb3JUeXBlID0gaW5pdGlhbEJ5dGUgPj4gNTtcclxuICAgIHZhciBhZGRpdGlvbmFsSW5mb3JtYXRpb24gPSBpbml0aWFsQnl0ZSAmIDB4MWY7XHJcbiAgICB2YXIgaTtcclxuICAgIHZhciBsZW5ndGg7XHJcblxyXG4gICAgaWYgKG1ham9yVHlwZSA9PT0gNykge1xyXG4gICAgICBzd2l0Y2ggKGFkZGl0aW9uYWxJbmZvcm1hdGlvbikge1xyXG4gICAgICAgIGNhc2UgMjU6XHJcbiAgICAgICAgICByZXR1cm4gcmVhZEZsb2F0MTYoKTtcclxuICAgICAgICBjYXNlIDI2OlxyXG4gICAgICAgICAgcmV0dXJuIHJlYWRGbG9hdDMyKCk7XHJcbiAgICAgICAgY2FzZSAyNzpcclxuICAgICAgICAgIHJldHVybiByZWFkRmxvYXQ2NCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGVuZ3RoID0gcmVhZExlbmd0aChhZGRpdGlvbmFsSW5mb3JtYXRpb24pO1xyXG4gICAgaWYgKGxlbmd0aCA8IDAgJiYgKG1ham9yVHlwZSA8IDIgfHwgNiA8IG1ham9yVHlwZSkpXHJcbiAgICAgIHRocm93IFwiSW52YWxpZCBsZW5ndGhcIjtcclxuXHJcbiAgICBzd2l0Y2ggKG1ham9yVHlwZSkge1xyXG4gICAgICBjYXNlIDA6XHJcbiAgICAgICAgcmV0dXJuIGxlbmd0aDtcclxuICAgICAgY2FzZSAxOlxyXG4gICAgICAgIHJldHVybiAtMSAtIGxlbmd0aDtcclxuICAgICAgY2FzZSAyOlxyXG4gICAgICAgIGlmIChsZW5ndGggPCAwKSB7XHJcbiAgICAgICAgICB2YXIgZWxlbWVudHMgPSBbXTtcclxuICAgICAgICAgIHZhciBmdWxsQXJyYXlMZW5ndGggPSAwO1xyXG4gICAgICAgICAgd2hpbGUgKChsZW5ndGggPSByZWFkSW5kZWZpbml0ZVN0cmluZ0xlbmd0aChtYWpvclR5cGUpKSA+PSAwKSB7XHJcbiAgICAgICAgICAgIGZ1bGxBcnJheUxlbmd0aCArPSBsZW5ndGg7XHJcbiAgICAgICAgICAgIGVsZW1lbnRzLnB1c2gocmVhZEFycmF5QnVmZmVyKGxlbmd0aCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdmFyIGZ1bGxBcnJheSA9IG5ldyBVaW50OEFycmF5KGZ1bGxBcnJheUxlbmd0aCk7XHJcbiAgICAgICAgICB2YXIgZnVsbEFycmF5T2Zmc2V0ID0gMDtcclxuICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBmdWxsQXJyYXkuc2V0KGVsZW1lbnRzW2ldLCBmdWxsQXJyYXlPZmZzZXQpO1xyXG4gICAgICAgICAgICBmdWxsQXJyYXlPZmZzZXQgKz0gZWxlbWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGZ1bGxBcnJheTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlYWRBcnJheUJ1ZmZlcihsZW5ndGgpO1xyXG4gICAgICBjYXNlIDM6XHJcbiAgICAgICAgdmFyIHV0ZjE2ZGF0YSA9IFtdO1xyXG4gICAgICAgIGlmIChsZW5ndGggPCAwKSB7XHJcbiAgICAgICAgICB3aGlsZSAoKGxlbmd0aCA9IHJlYWRJbmRlZmluaXRlU3RyaW5nTGVuZ3RoKG1ham9yVHlwZSkpID49IDApXHJcbiAgICAgICAgICAgIGFwcGVuZFV0ZjE2ZGF0YSh1dGYxNmRhdGEsIGxlbmd0aCk7XHJcbiAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICBhcHBlbmRVdGYxNmRhdGEodXRmMTZkYXRhLCBsZW5ndGgpO1xyXG4gICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIHV0ZjE2ZGF0YSk7XHJcbiAgICAgIGNhc2UgNDpcclxuICAgICAgICB2YXIgcmV0QXJyYXk7XHJcbiAgICAgICAgaWYgKGxlbmd0aCA8IDApIHtcclxuICAgICAgICAgIHJldEFycmF5ID0gW107XHJcbiAgICAgICAgICB3aGlsZSAoIXJlYWRCcmVhaygpKVxyXG4gICAgICAgICAgICByZXRBcnJheS5wdXNoKGRlY29kZUl0ZW0oKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldEFycmF5ID0gbmV3IEFycmF5KGxlbmd0aCk7XHJcbiAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICAgIHJldEFycmF5W2ldID0gZGVjb2RlSXRlbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0QXJyYXk7XHJcbiAgICAgIGNhc2UgNTpcclxuICAgICAgICB2YXIgcmV0T2JqZWN0ID0ge307XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aCB8fCBsZW5ndGggPCAwICYmICFyZWFkQnJlYWsoKTsgKytpKSB7XHJcbiAgICAgICAgICB2YXIga2V5ID0gZGVjb2RlSXRlbSgpO1xyXG4gICAgICAgICAgcmV0T2JqZWN0W2tleV0gPSBkZWNvZGVJdGVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXRPYmplY3Q7XHJcbiAgICAgIGNhc2UgNjpcclxuICAgICAgICByZXR1cm4gdGFnZ2VyKGRlY29kZUl0ZW0oKSwgbGVuZ3RoKTtcclxuICAgICAgY2FzZSA3OlxyXG4gICAgICAgIHN3aXRjaCAobGVuZ3RoKSB7XHJcbiAgICAgICAgICBjYXNlIDIwOlxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICBjYXNlIDIxOlxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgIGNhc2UgMjI6XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgY2FzZSAyMzpcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBzaW1wbGVWYWx1ZShsZW5ndGgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZhciByZXQgPSBkZWNvZGVJdGVtKCk7XHJcbiAgaWYgKG9mZnNldCAhPT0gZGF0YS5ieXRlTGVuZ3RoKVxyXG4gICAgdGhyb3cgXCJSZW1haW5pbmcgYnl0ZXNcIjtcclxuICByZXR1cm4gcmV0O1xyXG59XHJcblxyXG52YXIgb2JqID0geyBlbmNvZGU6IGVuY29kZSwgZGVjb2RlOiBkZWNvZGUgfTtcclxuXHJcbmlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZClcclxuICBkZWZpbmUoXCJjYm9yL2Nib3JcIiwgb2JqKTtcclxuZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpXHJcbiAgbW9kdWxlLmV4cG9ydHMgPSBvYmo7XHJcbmVsc2UgaWYgKCFnbG9iYWwuQ0JPUilcclxuICBnbG9iYWwuQ0JPUiA9IG9iajtcclxuXHJcbn0pKHRoaXMpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/cbor-js/cbor.js\n");

/***/ })

};
;