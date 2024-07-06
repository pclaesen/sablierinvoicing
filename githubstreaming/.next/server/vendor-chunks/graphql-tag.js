"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/graphql-tag";
exports.ids = ["vendor-chunks/graphql-tag"];
exports.modules = {

/***/ "(ssr)/./node_modules/graphql-tag/lib/index.js":
/*!***********************************************!*\
  !*** ./node_modules/graphql-tag/lib/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   disableExperimentalFragmentVariables: () => (/* binding */ disableExperimentalFragmentVariables),\n/* harmony export */   disableFragmentWarnings: () => (/* binding */ disableFragmentWarnings),\n/* harmony export */   enableExperimentalFragmentVariables: () => (/* binding */ enableExperimentalFragmentVariables),\n/* harmony export */   gql: () => (/* binding */ gql),\n/* harmony export */   resetCaches: () => (/* binding */ resetCaches)\n/* harmony export */ });\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ \"(ssr)/./node_modules/tslib/tslib.es6.mjs\");\n/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql */ \"(ssr)/./node_modules/graphql/language/parser.mjs\");\n\n\nvar docCache = new Map();\nvar fragmentSourceMap = new Map();\nvar printFragmentWarnings = true;\nvar experimentalFragmentVariables = false;\nfunction normalize(string) {\n    return string.replace(/[\\s,]+/g, ' ').trim();\n}\nfunction cacheKeyFromLoc(loc) {\n    return normalize(loc.source.body.substring(loc.start, loc.end));\n}\nfunction processFragments(ast) {\n    var seenKeys = new Set();\n    var definitions = [];\n    ast.definitions.forEach(function (fragmentDefinition) {\n        if (fragmentDefinition.kind === 'FragmentDefinition') {\n            var fragmentName = fragmentDefinition.name.value;\n            var sourceKey = cacheKeyFromLoc(fragmentDefinition.loc);\n            var sourceKeySet = fragmentSourceMap.get(fragmentName);\n            if (sourceKeySet && !sourceKeySet.has(sourceKey)) {\n                if (printFragmentWarnings) {\n                    console.warn(\"Warning: fragment with name \" + fragmentName + \" already exists.\\n\"\n                        + \"graphql-tag enforces all fragment names across your application to be unique; read more about\\n\"\n                        + \"this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names\");\n                }\n            }\n            else if (!sourceKeySet) {\n                fragmentSourceMap.set(fragmentName, sourceKeySet = new Set);\n            }\n            sourceKeySet.add(sourceKey);\n            if (!seenKeys.has(sourceKey)) {\n                seenKeys.add(sourceKey);\n                definitions.push(fragmentDefinition);\n            }\n        }\n        else {\n            definitions.push(fragmentDefinition);\n        }\n    });\n    return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, ast), { definitions: definitions });\n}\nfunction stripLoc(doc) {\n    var workSet = new Set(doc.definitions);\n    workSet.forEach(function (node) {\n        if (node.loc)\n            delete node.loc;\n        Object.keys(node).forEach(function (key) {\n            var value = node[key];\n            if (value && typeof value === 'object') {\n                workSet.add(value);\n            }\n        });\n    });\n    var loc = doc.loc;\n    if (loc) {\n        delete loc.startToken;\n        delete loc.endToken;\n    }\n    return doc;\n}\nfunction parseDocument(source) {\n    var cacheKey = normalize(source);\n    if (!docCache.has(cacheKey)) {\n        var parsed = (0,graphql__WEBPACK_IMPORTED_MODULE_1__.parse)(source, {\n            experimentalFragmentVariables: experimentalFragmentVariables,\n            allowLegacyFragmentVariables: experimentalFragmentVariables\n        });\n        if (!parsed || parsed.kind !== 'Document') {\n            throw new Error('Not a valid GraphQL document.');\n        }\n        docCache.set(cacheKey, stripLoc(processFragments(parsed)));\n    }\n    return docCache.get(cacheKey);\n}\nfunction gql(literals) {\n    var args = [];\n    for (var _i = 1; _i < arguments.length; _i++) {\n        args[_i - 1] = arguments[_i];\n    }\n    if (typeof literals === 'string') {\n        literals = [literals];\n    }\n    var result = literals[0];\n    args.forEach(function (arg, i) {\n        if (arg && arg.kind === 'Document') {\n            result += arg.loc.source.body;\n        }\n        else {\n            result += arg;\n        }\n        result += literals[i + 1];\n    });\n    return parseDocument(result);\n}\nfunction resetCaches() {\n    docCache.clear();\n    fragmentSourceMap.clear();\n}\nfunction disableFragmentWarnings() {\n    printFragmentWarnings = false;\n}\nfunction enableExperimentalFragmentVariables() {\n    experimentalFragmentVariables = true;\n}\nfunction disableExperimentalFragmentVariables() {\n    experimentalFragmentVariables = false;\n}\nvar extras = {\n    gql: gql,\n    resetCaches: resetCaches,\n    disableFragmentWarnings: disableFragmentWarnings,\n    enableExperimentalFragmentVariables: enableExperimentalFragmentVariables,\n    disableExperimentalFragmentVariables: disableExperimentalFragmentVariables\n};\n(function (gql_1) {\n    gql_1.gql = extras.gql, gql_1.resetCaches = extras.resetCaches, gql_1.disableFragmentWarnings = extras.disableFragmentWarnings, gql_1.enableExperimentalFragmentVariables = extras.enableExperimentalFragmentVariables, gql_1.disableExperimentalFragmentVariables = extras.disableExperimentalFragmentVariables;\n})(gql || (gql = {}));\ngql[\"default\"] = gql;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gql);\n//# sourceMappingURL=index.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZ3JhcGhxbC10YWcvbGliL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQWlDO0FBQ0Q7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUdBQXlHO0FBQ3pHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxXQUFXLCtDQUFRLENBQUMsK0NBQVEsR0FBRyxVQUFVLDBCQUEwQjtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw4Q0FBSztBQUMxQjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLHFCQUFxQix1QkFBdUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGtCQUFrQjtBQUNuQjtBQUNBLGlFQUFlLEdBQUcsRUFBQztBQUNuQiIsInNvdXJjZXMiOlsid2VicGFjazovL2dpdGh1YnN0cmVhbWluZy8uL25vZGVfbW9kdWxlcy9ncmFwaHFsLXRhZy9saWIvaW5kZXguanM/MWMzZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBfX2Fzc2lnbiB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICdncmFwaHFsJztcbnZhciBkb2NDYWNoZSA9IG5ldyBNYXAoKTtcbnZhciBmcmFnbWVudFNvdXJjZU1hcCA9IG5ldyBNYXAoKTtcbnZhciBwcmludEZyYWdtZW50V2FybmluZ3MgPSB0cnVlO1xudmFyIGV4cGVyaW1lbnRhbEZyYWdtZW50VmFyaWFibGVzID0gZmFsc2U7XG5mdW5jdGlvbiBub3JtYWxpemUoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9bXFxzLF0rL2csICcgJykudHJpbSgpO1xufVxuZnVuY3Rpb24gY2FjaGVLZXlGcm9tTG9jKGxvYykge1xuICAgIHJldHVybiBub3JtYWxpemUobG9jLnNvdXJjZS5ib2R5LnN1YnN0cmluZyhsb2Muc3RhcnQsIGxvYy5lbmQpKTtcbn1cbmZ1bmN0aW9uIHByb2Nlc3NGcmFnbWVudHMoYXN0KSB7XG4gICAgdmFyIHNlZW5LZXlzID0gbmV3IFNldCgpO1xuICAgIHZhciBkZWZpbml0aW9ucyA9IFtdO1xuICAgIGFzdC5kZWZpbml0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChmcmFnbWVudERlZmluaXRpb24pIHtcbiAgICAgICAgaWYgKGZyYWdtZW50RGVmaW5pdGlvbi5raW5kID09PSAnRnJhZ21lbnREZWZpbml0aW9uJykge1xuICAgICAgICAgICAgdmFyIGZyYWdtZW50TmFtZSA9IGZyYWdtZW50RGVmaW5pdGlvbi5uYW1lLnZhbHVlO1xuICAgICAgICAgICAgdmFyIHNvdXJjZUtleSA9IGNhY2hlS2V5RnJvbUxvYyhmcmFnbWVudERlZmluaXRpb24ubG9jKTtcbiAgICAgICAgICAgIHZhciBzb3VyY2VLZXlTZXQgPSBmcmFnbWVudFNvdXJjZU1hcC5nZXQoZnJhZ21lbnROYW1lKTtcbiAgICAgICAgICAgIGlmIChzb3VyY2VLZXlTZXQgJiYgIXNvdXJjZUtleVNldC5oYXMoc291cmNlS2V5KSkge1xuICAgICAgICAgICAgICAgIGlmIChwcmludEZyYWdtZW50V2FybmluZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiV2FybmluZzogZnJhZ21lbnQgd2l0aCBuYW1lIFwiICsgZnJhZ21lbnROYW1lICsgXCIgYWxyZWFkeSBleGlzdHMuXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJncmFwaHFsLXRhZyBlbmZvcmNlcyBhbGwgZnJhZ21lbnQgbmFtZXMgYWNyb3NzIHlvdXIgYXBwbGljYXRpb24gdG8gYmUgdW5pcXVlOyByZWFkIG1vcmUgYWJvdXRcXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcInRoaXMgaW4gdGhlIGRvY3M6IGh0dHA6Ly9kZXYuYXBvbGxvZGF0YS5jb20vY29yZS9mcmFnbWVudHMuaHRtbCN1bmlxdWUtbmFtZXNcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXNvdXJjZUtleVNldCkge1xuICAgICAgICAgICAgICAgIGZyYWdtZW50U291cmNlTWFwLnNldChmcmFnbWVudE5hbWUsIHNvdXJjZUtleVNldCA9IG5ldyBTZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc291cmNlS2V5U2V0LmFkZChzb3VyY2VLZXkpO1xuICAgICAgICAgICAgaWYgKCFzZWVuS2V5cy5oYXMoc291cmNlS2V5KSkge1xuICAgICAgICAgICAgICAgIHNlZW5LZXlzLmFkZChzb3VyY2VLZXkpO1xuICAgICAgICAgICAgICAgIGRlZmluaXRpb25zLnB1c2goZnJhZ21lbnREZWZpbml0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRlZmluaXRpb25zLnB1c2goZnJhZ21lbnREZWZpbml0aW9uKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgYXN0KSwgeyBkZWZpbml0aW9uczogZGVmaW5pdGlvbnMgfSk7XG59XG5mdW5jdGlvbiBzdHJpcExvYyhkb2MpIHtcbiAgICB2YXIgd29ya1NldCA9IG5ldyBTZXQoZG9jLmRlZmluaXRpb25zKTtcbiAgICB3b3JrU2V0LmZvckVhY2goZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUubG9jKVxuICAgICAgICAgICAgZGVsZXRlIG5vZGUubG9jO1xuICAgICAgICBPYmplY3Qua2V5cyhub2RlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IG5vZGVba2V5XTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgd29ya1NldC5hZGQodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICB2YXIgbG9jID0gZG9jLmxvYztcbiAgICBpZiAobG9jKSB7XG4gICAgICAgIGRlbGV0ZSBsb2Muc3RhcnRUb2tlbjtcbiAgICAgICAgZGVsZXRlIGxvYy5lbmRUb2tlbjtcbiAgICB9XG4gICAgcmV0dXJuIGRvYztcbn1cbmZ1bmN0aW9uIHBhcnNlRG9jdW1lbnQoc291cmNlKSB7XG4gICAgdmFyIGNhY2hlS2V5ID0gbm9ybWFsaXplKHNvdXJjZSk7XG4gICAgaWYgKCFkb2NDYWNoZS5oYXMoY2FjaGVLZXkpKSB7XG4gICAgICAgIHZhciBwYXJzZWQgPSBwYXJzZShzb3VyY2UsIHtcbiAgICAgICAgICAgIGV4cGVyaW1lbnRhbEZyYWdtZW50VmFyaWFibGVzOiBleHBlcmltZW50YWxGcmFnbWVudFZhcmlhYmxlcyxcbiAgICAgICAgICAgIGFsbG93TGVnYWN5RnJhZ21lbnRWYXJpYWJsZXM6IGV4cGVyaW1lbnRhbEZyYWdtZW50VmFyaWFibGVzXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXBhcnNlZCB8fCBwYXJzZWQua2luZCAhPT0gJ0RvY3VtZW50Jykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgYSB2YWxpZCBHcmFwaFFMIGRvY3VtZW50LicpO1xuICAgICAgICB9XG4gICAgICAgIGRvY0NhY2hlLnNldChjYWNoZUtleSwgc3RyaXBMb2MocHJvY2Vzc0ZyYWdtZW50cyhwYXJzZWQpKSk7XG4gICAgfVxuICAgIHJldHVybiBkb2NDYWNoZS5nZXQoY2FjaGVLZXkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdxbChsaXRlcmFscykge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgYXJnc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBsaXRlcmFscyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgbGl0ZXJhbHMgPSBbbGl0ZXJhbHNdO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0ID0gbGl0ZXJhbHNbMF07XG4gICAgYXJncy5mb3JFYWNoKGZ1bmN0aW9uIChhcmcsIGkpIHtcbiAgICAgICAgaWYgKGFyZyAmJiBhcmcua2luZCA9PT0gJ0RvY3VtZW50Jykge1xuICAgICAgICAgICAgcmVzdWx0ICs9IGFyZy5sb2Muc291cmNlLmJvZHk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gYXJnO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCArPSBsaXRlcmFsc1tpICsgMV07XG4gICAgfSk7XG4gICAgcmV0dXJuIHBhcnNlRG9jdW1lbnQocmVzdWx0KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiByZXNldENhY2hlcygpIHtcbiAgICBkb2NDYWNoZS5jbGVhcigpO1xuICAgIGZyYWdtZW50U291cmNlTWFwLmNsZWFyKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZGlzYWJsZUZyYWdtZW50V2FybmluZ3MoKSB7XG4gICAgcHJpbnRGcmFnbWVudFdhcm5pbmdzID0gZmFsc2U7XG59XG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlRXhwZXJpbWVudGFsRnJhZ21lbnRWYXJpYWJsZXMoKSB7XG4gICAgZXhwZXJpbWVudGFsRnJhZ21lbnRWYXJpYWJsZXMgPSB0cnVlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGVFeHBlcmltZW50YWxGcmFnbWVudFZhcmlhYmxlcygpIHtcbiAgICBleHBlcmltZW50YWxGcmFnbWVudFZhcmlhYmxlcyA9IGZhbHNlO1xufVxudmFyIGV4dHJhcyA9IHtcbiAgICBncWw6IGdxbCxcbiAgICByZXNldENhY2hlczogcmVzZXRDYWNoZXMsXG4gICAgZGlzYWJsZUZyYWdtZW50V2FybmluZ3M6IGRpc2FibGVGcmFnbWVudFdhcm5pbmdzLFxuICAgIGVuYWJsZUV4cGVyaW1lbnRhbEZyYWdtZW50VmFyaWFibGVzOiBlbmFibGVFeHBlcmltZW50YWxGcmFnbWVudFZhcmlhYmxlcyxcbiAgICBkaXNhYmxlRXhwZXJpbWVudGFsRnJhZ21lbnRWYXJpYWJsZXM6IGRpc2FibGVFeHBlcmltZW50YWxGcmFnbWVudFZhcmlhYmxlc1xufTtcbihmdW5jdGlvbiAoZ3FsXzEpIHtcbiAgICBncWxfMS5ncWwgPSBleHRyYXMuZ3FsLCBncWxfMS5yZXNldENhY2hlcyA9IGV4dHJhcy5yZXNldENhY2hlcywgZ3FsXzEuZGlzYWJsZUZyYWdtZW50V2FybmluZ3MgPSBleHRyYXMuZGlzYWJsZUZyYWdtZW50V2FybmluZ3MsIGdxbF8xLmVuYWJsZUV4cGVyaW1lbnRhbEZyYWdtZW50VmFyaWFibGVzID0gZXh0cmFzLmVuYWJsZUV4cGVyaW1lbnRhbEZyYWdtZW50VmFyaWFibGVzLCBncWxfMS5kaXNhYmxlRXhwZXJpbWVudGFsRnJhZ21lbnRWYXJpYWJsZXMgPSBleHRyYXMuZGlzYWJsZUV4cGVyaW1lbnRhbEZyYWdtZW50VmFyaWFibGVzO1xufSkoZ3FsIHx8IChncWwgPSB7fSkpO1xuZ3FsW1wiZGVmYXVsdFwiXSA9IGdxbDtcbmV4cG9ydCBkZWZhdWx0IGdxbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/graphql-tag/lib/index.js\n");

/***/ })

};
;