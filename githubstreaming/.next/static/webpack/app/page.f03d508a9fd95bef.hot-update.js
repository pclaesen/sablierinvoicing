"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/app/components/RequestHandler.js":
/*!**********************************************!*\
  !*** ./src/app/components/RequestHandler.js ***!
  \**********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _requestnetwork_web3_signature__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @requestnetwork/web3-signature */ \"(app-pages-browser)/./node_modules/@requestnetwork/web3-signature/dist/index.js\");\n/* harmony import */ var _requestnetwork_request_client_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @requestnetwork/request-client.js */ \"(app-pages-browser)/./node_modules/@requestnetwork/request-client.js/dist/index.js\");\n/* harmony import */ var _page_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../page.module.css */ \"(app-pages-browser)/./src/app/page.module.css\");\n/* harmony import */ var _page_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_page_module_css__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nconst RequestHandler = (param)=>{\n    let { account } = param;\n    async function handleRequest() {\n        if (typeof window.ethereum !== \"undefined\") {\n            try {\n                // Step 1: Create Request Web3 Provider\n                const web3Provider = new _requestnetwork_web3_signature__WEBPACK_IMPORTED_MODULE_2__.Web3SignatureProvider(window.ethereum);\n                // Step 2: Create Request Client\n                const tempRequestClient = new _requestnetwork_request_client_js__WEBPACK_IMPORTED_MODULE_3__.RequestNetwork({\n                    nodeConnectionConfig: {\n                        baseURL: \"https://sepolia.gateway.request.network/\"\n                    },\n                    signatureProvider: web3Provider\n                });\n                // Step 3: Create Request Parameters\n                const payeeIdentity = \"account\";\n                const payerIdentity = \"0x1B39C76b7bbF7F16795F461Ce5298E882B63a7D6\";\n                const requestCreateParameters = {\n                    requestInfo: {\n                        currency: {\n                            type: _requestnetwork_request_client_js__WEBPACK_IMPORTED_MODULE_3__.Types.RequestLogic.CURRENCY.ERC20,\n                            value: \"0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238\",\n                            network: \"sepolia\"\n                        },\n                        expectedAmount: \"1000000000000000000\",\n                        payee: {\n                            type: _requestnetwork_request_client_js__WEBPACK_IMPORTED_MODULE_3__.Types.Identity.TYPE.ETHEREUM_ADDRESS,\n                            value: payeeIdentity\n                        },\n                        payer: {\n                            type: _requestnetwork_request_client_js__WEBPACK_IMPORTED_MODULE_3__.Types.Identity.TYPE.ETHEREUM_ADDRESS,\n                            value: payerIdentity\n                        },\n                        timestamp: _requestnetwork_request_client_js__WEBPACK_IMPORTED_MODULE_3__.Utils.getCurrentTimestampInSecond()\n                    },\n                    paymentNetwork: {\n                        id: _requestnetwork_request_client_js__WEBPACK_IMPORTED_MODULE_3__.Types.Extension.PAYMENT_NETWORK_ID.ERC20_FEE_PROXY_CONTRACT,\n                        parameters: {\n                            paymentNetworkName: \"sepolia\",\n                            paymentAddress: payeeIdentity,\n                            feeAddress: \"0x0000000000000000000000000000000000000000\",\n                            feeAmount: \"0\"\n                        }\n                    },\n                    contentData: {\n                        reason: \"\\uD83C\\uDF55\",\n                        dueDate: \"2025.06.16\"\n                    },\n                    signer: {\n                        type: _requestnetwork_request_client_js__WEBPACK_IMPORTED_MODULE_3__.Types.Identity.TYPE.ETHEREUM_ADDRESS,\n                        value: payeeIdentity\n                    }\n                };\n                // Step 4: Create New Request with Parameters\n                const request = await tempRequestClient.createRequest(requestCreateParameters);\n                const confirmedRequestData = await request.waitForConfirmation();\n                console.log(confirmedRequestData);\n            } catch (error) {\n                console.error(\"Request handling failed\", error);\n            }\n        } else {\n            console.error(\"No MetaMask connection found, redirecting to connection process...\");\n        }\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n        className: (_page_module_css__WEBPACK_IMPORTED_MODULE_4___default().button),\n        onClick: handleRequest,\n        children: \"Create Request\"\n    }, void 0, false, {\n        fileName: \"/Users/pieterclaesen/blockchain/erc20stream/githubstreaming/src/app/components/RequestHandler.js\",\n        lineNumber: 74,\n        columnNumber: 5\n    }, undefined);\n};\n_c = RequestHandler;\n/* harmony default export */ __webpack_exports__[\"default\"] = (RequestHandler);\nvar _c;\n$RefreshReg$(_c, \"RequestHandler\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvY29tcG9uZW50cy9SZXF1ZXN0SGFuZGxlci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBMEI7QUFDNkM7QUFDVTtBQUN6QztBQUV4QyxNQUFNTSxpQkFBaUI7UUFBQyxFQUFFQyxPQUFPLEVBQUU7SUFDakMsZUFBZUM7UUFDYixJQUFJLE9BQU9DLE9BQU9DLFFBQVEsS0FBSyxhQUFhO1lBQzFDLElBQUk7Z0JBQ0YsdUNBQXVDO2dCQUN2QyxNQUFNQyxlQUFlLElBQUlWLGlGQUFxQkEsQ0FBQ1EsT0FBT0MsUUFBUTtnQkFFOUQsZ0NBQWdDO2dCQUNoQyxNQUFNRSxvQkFBb0IsSUFBSVYsNkVBQWNBLENBQUM7b0JBQzNDVyxzQkFBc0I7d0JBQ3BCQyxTQUFTO29CQUNYO29CQUNBQyxtQkFBbUJKO2dCQUNyQjtnQkFFQSxvQ0FBb0M7Z0JBQ3BDLE1BQU1LLGdCQUFnQjtnQkFDdEIsTUFBTUMsZ0JBQWdCO2dCQUN0QixNQUFNQywwQkFBMEI7b0JBQzlCQyxhQUFhO3dCQUNYQyxVQUFVOzRCQUNSQyxNQUFNbEIsb0VBQUtBLENBQUNtQixZQUFZLENBQUNDLFFBQVEsQ0FBQ0MsS0FBSzs0QkFDdkNDLE9BQU87NEJBQ1BDLFNBQVM7d0JBQ1g7d0JBQ0FDLGdCQUFnQjt3QkFDaEJDLE9BQU87NEJBQ0xQLE1BQU1sQixvRUFBS0EsQ0FBQzBCLFFBQVEsQ0FBQ0MsSUFBSSxDQUFDQyxnQkFBZ0I7NEJBQzFDTixPQUFPVDt3QkFDVDt3QkFDQWdCLE9BQU87NEJBQ0xYLE1BQU1sQixvRUFBS0EsQ0FBQzBCLFFBQVEsQ0FBQ0MsSUFBSSxDQUFDQyxnQkFBZ0I7NEJBQzFDTixPQUFPUjt3QkFDVDt3QkFDQWdCLFdBQVc3QixvRUFBS0EsQ0FBQzhCLDJCQUEyQjtvQkFDOUM7b0JBQ0FDLGdCQUFnQjt3QkFDZEMsSUFBSWpDLG9FQUFLQSxDQUFDa0MsU0FBUyxDQUFDQyxrQkFBa0IsQ0FBQ0Msd0JBQXdCO3dCQUMvREMsWUFBWTs0QkFDVkMsb0JBQW9COzRCQUNwQkMsZ0JBQWdCMUI7NEJBQ2hCMkIsWUFBWTs0QkFDWkMsV0FBVzt3QkFDYjtvQkFDRjtvQkFDQUMsYUFBYTt3QkFDWEMsUUFBUTt3QkFDUkMsU0FBUztvQkFDWDtvQkFDQUMsUUFBUTt3QkFDTjNCLE1BQU1sQixvRUFBS0EsQ0FBQzBCLFFBQVEsQ0FBQ0MsSUFBSSxDQUFDQyxnQkFBZ0I7d0JBQzFDTixPQUFPVDtvQkFDVDtnQkFDRjtnQkFFQSw2Q0FBNkM7Z0JBQzdDLE1BQU1pQyxVQUFVLE1BQU1yQyxrQkFBa0JzQyxhQUFhLENBQUNoQztnQkFDdEQsTUFBTWlDLHVCQUF1QixNQUFNRixRQUFRRyxtQkFBbUI7Z0JBQzlEQyxRQUFRQyxHQUFHLENBQUNIO1lBQ2QsRUFBRSxPQUFPSSxPQUFPO2dCQUNkRixRQUFRRSxLQUFLLENBQUMsMkJBQTJCQTtZQUMzQztRQUNGLE9BQU87WUFDTEYsUUFBUUUsS0FBSyxDQUFDO1FBQ2hCO0lBQ0Y7SUFFQSxxQkFDRSw4REFBQ0M7UUFBT0MsV0FBV3BELGdFQUFhO1FBQUVxRCxTQUFTbEQ7a0JBQWU7Ozs7OztBQUk5RDtLQXhFTUY7QUEwRU4sK0RBQWVBLGNBQWNBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9jb21wb25lbnRzL1JlcXVlc3RIYW5kbGVyLmpzP2ExNDgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFdlYjNTaWduYXR1cmVQcm92aWRlciB9IGZyb20gJ0ByZXF1ZXN0bmV0d29yay93ZWIzLXNpZ25hdHVyZSc7XG5pbXBvcnQgeyBSZXF1ZXN0TmV0d29yaywgVHlwZXMsIFV0aWxzIH0gZnJvbSAnQHJlcXVlc3RuZXR3b3JrL3JlcXVlc3QtY2xpZW50LmpzJztcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi4vcGFnZS5tb2R1bGUuY3NzJztcblxuY29uc3QgUmVxdWVzdEhhbmRsZXIgPSAoeyBhY2NvdW50IH0pID0+IHtcbiAgYXN5bmMgZnVuY3Rpb24gaGFuZGxlUmVxdWVzdCgpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdy5ldGhlcmV1bSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFN0ZXAgMTogQ3JlYXRlIFJlcXVlc3QgV2ViMyBQcm92aWRlclxuICAgICAgICBjb25zdCB3ZWIzUHJvdmlkZXIgPSBuZXcgV2ViM1NpZ25hdHVyZVByb3ZpZGVyKHdpbmRvdy5ldGhlcmV1bSk7XG5cbiAgICAgICAgLy8gU3RlcCAyOiBDcmVhdGUgUmVxdWVzdCBDbGllbnRcbiAgICAgICAgY29uc3QgdGVtcFJlcXVlc3RDbGllbnQgPSBuZXcgUmVxdWVzdE5ldHdvcmsoe1xuICAgICAgICAgIG5vZGVDb25uZWN0aW9uQ29uZmlnOiB7XG4gICAgICAgICAgICBiYXNlVVJMOiAnaHR0cHM6Ly9zZXBvbGlhLmdhdGV3YXkucmVxdWVzdC5uZXR3b3JrLycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzaWduYXR1cmVQcm92aWRlcjogd2ViM1Byb3ZpZGVyLFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTdGVwIDM6IENyZWF0ZSBSZXF1ZXN0IFBhcmFtZXRlcnNcbiAgICAgICAgY29uc3QgcGF5ZWVJZGVudGl0eSA9ICdhY2NvdW50JztcbiAgICAgICAgY29uc3QgcGF5ZXJJZGVudGl0eSA9ICcweDFCMzlDNzZiN2JiRjdGMTY3OTVGNDYxQ2U1Mjk4RTg4MkI2M2E3RDYnO1xuICAgICAgICBjb25zdCByZXF1ZXN0Q3JlYXRlUGFyYW1ldGVycyA9IHtcbiAgICAgICAgICByZXF1ZXN0SW5mbzoge1xuICAgICAgICAgICAgY3VycmVuY3k6IHtcbiAgICAgICAgICAgICAgdHlwZTogVHlwZXMuUmVxdWVzdExvZ2ljLkNVUlJFTkNZLkVSQzIwLFxuICAgICAgICAgICAgICB2YWx1ZTogJzB4MWM3RDRCMTk2Q2IwQzdCMDFkNzQzRmJjNjExNmE5MDIzNzlDNzIzOCcsXG4gICAgICAgICAgICAgIG5ldHdvcms6ICdzZXBvbGlhJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBleHBlY3RlZEFtb3VudDogJzEwMDAwMDAwMDAwMDAwMDAwMDAnLFxuICAgICAgICAgICAgcGF5ZWU6IHtcbiAgICAgICAgICAgICAgdHlwZTogVHlwZXMuSWRlbnRpdHkuVFlQRS5FVEhFUkVVTV9BRERSRVNTLFxuICAgICAgICAgICAgICB2YWx1ZTogcGF5ZWVJZGVudGl0eSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXllcjoge1xuICAgICAgICAgICAgICB0eXBlOiBUeXBlcy5JZGVudGl0eS5UWVBFLkVUSEVSRVVNX0FERFJFU1MsXG4gICAgICAgICAgICAgIHZhbHVlOiBwYXllcklkZW50aXR5LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogVXRpbHMuZ2V0Q3VycmVudFRpbWVzdGFtcEluU2Vjb25kKCksXG4gICAgICAgICAgfSxcbiAgICAgICAgICBwYXltZW50TmV0d29yazoge1xuICAgICAgICAgICAgaWQ6IFR5cGVzLkV4dGVuc2lvbi5QQVlNRU5UX05FVFdPUktfSUQuRVJDMjBfRkVFX1BST1hZX0NPTlRSQUNULFxuICAgICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgICBwYXltZW50TmV0d29ya05hbWU6ICdzZXBvbGlhJyxcbiAgICAgICAgICAgICAgcGF5bWVudEFkZHJlc3M6IHBheWVlSWRlbnRpdHksXG4gICAgICAgICAgICAgIGZlZUFkZHJlc3M6ICcweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAnLFxuICAgICAgICAgICAgICBmZWVBbW91bnQ6ICcwJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb250ZW50RGF0YToge1xuICAgICAgICAgICAgcmVhc29uOiAn8J+NlScsXG4gICAgICAgICAgICBkdWVEYXRlOiAnMjAyNS4wNi4xNicsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzaWduZXI6IHtcbiAgICAgICAgICAgIHR5cGU6IFR5cGVzLklkZW50aXR5LlRZUEUuRVRIRVJFVU1fQUREUkVTUyxcbiAgICAgICAgICAgIHZhbHVlOiBwYXllZUlkZW50aXR5LFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gU3RlcCA0OiBDcmVhdGUgTmV3IFJlcXVlc3Qgd2l0aCBQYXJhbWV0ZXJzXG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSBhd2FpdCB0ZW1wUmVxdWVzdENsaWVudC5jcmVhdGVSZXF1ZXN0KHJlcXVlc3RDcmVhdGVQYXJhbWV0ZXJzKTtcbiAgICAgICAgY29uc3QgY29uZmlybWVkUmVxdWVzdERhdGEgPSBhd2FpdCByZXF1ZXN0LndhaXRGb3JDb25maXJtYXRpb24oKTtcbiAgICAgICAgY29uc29sZS5sb2coY29uZmlybWVkUmVxdWVzdERhdGEpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignUmVxdWVzdCBoYW5kbGluZyBmYWlsZWQnLCBlcnJvcik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIE1ldGFNYXNrIGNvbm5lY3Rpb24gZm91bmQsIHJlZGlyZWN0aW5nIHRvIGNvbm5lY3Rpb24gcHJvY2Vzcy4uLicpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGJ1dHRvbiBjbGFzc05hbWU9e3N0eWxlcy5idXR0b259IG9uQ2xpY2s9e2hhbmRsZVJlcXVlc3R9PlxuICAgICAgQ3JlYXRlIFJlcXVlc3RcbiAgICA8L2J1dHRvbj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJlcXVlc3RIYW5kbGVyO1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwiV2ViM1NpZ25hdHVyZVByb3ZpZGVyIiwiUmVxdWVzdE5ldHdvcmsiLCJUeXBlcyIsIlV0aWxzIiwic3R5bGVzIiwiUmVxdWVzdEhhbmRsZXIiLCJhY2NvdW50IiwiaGFuZGxlUmVxdWVzdCIsIndpbmRvdyIsImV0aGVyZXVtIiwid2ViM1Byb3ZpZGVyIiwidGVtcFJlcXVlc3RDbGllbnQiLCJub2RlQ29ubmVjdGlvbkNvbmZpZyIsImJhc2VVUkwiLCJzaWduYXR1cmVQcm92aWRlciIsInBheWVlSWRlbnRpdHkiLCJwYXllcklkZW50aXR5IiwicmVxdWVzdENyZWF0ZVBhcmFtZXRlcnMiLCJyZXF1ZXN0SW5mbyIsImN1cnJlbmN5IiwidHlwZSIsIlJlcXVlc3RMb2dpYyIsIkNVUlJFTkNZIiwiRVJDMjAiLCJ2YWx1ZSIsIm5ldHdvcmsiLCJleHBlY3RlZEFtb3VudCIsInBheWVlIiwiSWRlbnRpdHkiLCJUWVBFIiwiRVRIRVJFVU1fQUREUkVTUyIsInBheWVyIiwidGltZXN0YW1wIiwiZ2V0Q3VycmVudFRpbWVzdGFtcEluU2Vjb25kIiwicGF5bWVudE5ldHdvcmsiLCJpZCIsIkV4dGVuc2lvbiIsIlBBWU1FTlRfTkVUV09SS19JRCIsIkVSQzIwX0ZFRV9QUk9YWV9DT05UUkFDVCIsInBhcmFtZXRlcnMiLCJwYXltZW50TmV0d29ya05hbWUiLCJwYXltZW50QWRkcmVzcyIsImZlZUFkZHJlc3MiLCJmZWVBbW91bnQiLCJjb250ZW50RGF0YSIsInJlYXNvbiIsImR1ZURhdGUiLCJzaWduZXIiLCJyZXF1ZXN0IiwiY3JlYXRlUmVxdWVzdCIsImNvbmZpcm1lZFJlcXVlc3REYXRhIiwid2FpdEZvckNvbmZpcm1hdGlvbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsImJ1dHRvbiIsImNsYXNzTmFtZSIsIm9uQ2xpY2siXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/components/RequestHandler.js\n"));

/***/ })

});