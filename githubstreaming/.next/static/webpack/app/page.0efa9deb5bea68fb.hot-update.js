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

/***/ "(app-pages-browser)/./src/app/components/WalletConnectButton.js":
/*!***************************************************!*\
  !*** ./src/app/components/WalletConnectButton.js ***!
  \***************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ethers */ \"(app-pages-browser)/./node_modules/@ethersproject/providers/lib.esm/web3-provider.js\");\n/* harmony import */ var _web3_onboard_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @web3-onboard/react */ \"(app-pages-browser)/./node_modules/@web3-onboard/react/dist/index.js\");\n/* harmony import */ var _web3_onboard_injected_wallets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @web3-onboard/injected-wallets */ \"(app-pages-browser)/./node_modules/@web3-onboard/injected-wallets/dist/index.js\");\n/* harmony import */ var _page_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../page.module.css */ \"(app-pages-browser)/./src/app/page.module.css\");\n/* harmony import */ var _page_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_page_module_css__WEBPACK_IMPORTED_MODULE_4__);\n\nvar _s = $RefreshSig$();\n\n\n\n\n\nconst RPC_URL = \"https://sepolia.infura.io/v3/6b75cf9b946b457282df2b8f63107748\";\nconst apiKey = \"1730eff0-9d50-4382-a3fe-89f0d34a2070\";\nconst ethereumSepolia = {\n    id: 11155111,\n    token: \"ETH\",\n    label: \"Sepolia\",\n    rpcUrl: RPC_URL\n};\nconst injected = (0,_web3_onboard_injected_wallets__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\nconst chains = [\n    ethereumSepolia\n];\n(0,_web3_onboard_react__WEBPACK_IMPORTED_MODULE_2__.init)({\n    apiKey,\n    wallets: [\n        injected\n    ],\n    chains,\n    appMetadata: {\n        name: \"sablierStreaming\",\n        icon: \"<svg>App Icon</svg>\",\n        description: \"A demo of Sablier streaming.\"\n    }\n});\nconst WalletConnectButton = (param)=>{\n    let { onAccountChange } = param;\n    _s();\n    const [{ wallet, connecting }, connect, disconnect] = (0,_web3_onboard_react__WEBPACK_IMPORTED_MODULE_2__.useConnectWallet)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (wallet) {\n            const ethersProvider = new ethers__WEBPACK_IMPORTED_MODULE_5__.Web3Provider(wallet.provider, \"any\");\n            const account = wallet.accounts[0];\n            onAccountChange(account);\n        }\n    }, [\n        wallet,\n        onAccountChange\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n        className: (_page_module_css__WEBPACK_IMPORTED_MODULE_4___default().button),\n        disabled: connecting,\n        onClick: ()=>wallet ? disconnect(wallet) : connect(),\n        children: connecting ? \"Connecting...\" : wallet ? \"Disconnect\" : \"Connect Wallet\"\n    }, void 0, false, {\n        fileName: \"/Users/pieterclaesen/blockchain/erc20stream/githubstreaming/src/app/components/WalletConnectButton.js\",\n        lineNumber: 42,\n        columnNumber: 5\n    }, undefined);\n};\n_s(WalletConnectButton, \"Yf378n0wYyhK1aVC8UXnlmJV+WE=\", false, function() {\n    return [\n        _web3_onboard_react__WEBPACK_IMPORTED_MODULE_2__.useConnectWallet\n    ];\n});\n_c = WalletConnectButton;\n/* harmony default export */ __webpack_exports__[\"default\"] = (WalletConnectButton);\nvar _c;\n$RefreshReg$(_c, \"WalletConnectButton\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvY29tcG9uZW50cy9XYWxsZXRDb25uZWN0QnV0dG9uLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQXlDO0FBQ1Q7QUFDNkI7QUFDRDtBQUNwQjtBQUV4QyxNQUFNTyxVQUFVQywrREFBMkM7QUFDM0QsTUFBTUcsU0FBUztBQUNmLE1BQU1DLGtCQUFrQjtJQUN0QkMsSUFBSTtJQUNKQyxPQUFPO0lBQ1BDLE9BQU87SUFDUEMsUUFBUVQ7QUFDVjtBQUVBLE1BQU1VLFdBQVdaLDBFQUFjQTtBQUMvQixNQUFNYSxTQUFTO0lBQUNOO0NBQWdCO0FBRWhDVCx5REFBSUEsQ0FBQztJQUNIUTtJQUNBUSxTQUFTO1FBQUNGO0tBQVM7SUFDbkJDO0lBQ0FFLGFBQWE7UUFDWEMsTUFBTTtRQUNOQyxNQUFNO1FBQ05DLGFBQWE7SUFDZjtBQUNGO0FBRUEsTUFBTUMsc0JBQXNCO1FBQUMsRUFBRUMsZUFBZSxFQUFFOztJQUM5QyxNQUFNLENBQUMsRUFBRUMsTUFBTSxFQUFFQyxVQUFVLEVBQUUsRUFBRUMsU0FBU0MsV0FBVyxHQUFHekIscUVBQWdCQTtJQUV0RUgsZ0RBQVNBLENBQUM7UUFDUixJQUFJeUIsUUFBUTtZQUNWLE1BQU1JLGlCQUFpQixJQUFJNUIsZ0RBQTZCLENBQUN3QixPQUFPTyxRQUFRLEVBQUU7WUFDMUUsTUFBTUMsVUFBVVIsT0FBT1MsUUFBUSxDQUFDLEVBQUU7WUFDbENWLGdCQUFnQlM7UUFDbEI7SUFDRixHQUFHO1FBQUNSO1FBQVFEO0tBQWdCO0lBRTVCLHFCQUNFLDhEQUFDVztRQUNDQyxXQUFXL0IsZ0VBQWE7UUFDeEJnQyxVQUFVWDtRQUNWWSxTQUFTLElBQU9iLFNBQVNHLFdBQVdILFVBQVVFO2tCQUU3Q0QsYUFBYSxrQkFBa0JELFNBQVMsZUFBZTs7Ozs7O0FBRzlEO0dBcEJNRjs7UUFDa0RwQixpRUFBZ0JBOzs7S0FEbEVvQjtBQXNCTiwrREFBZUEsbUJBQW1CQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvY29tcG9uZW50cy9XYWxsZXRDb25uZWN0QnV0dG9uLmpzPzYwZjIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGV0aGVycyB9IGZyb20gJ2V0aGVycyc7XG5pbXBvcnQgeyBpbml0LCB1c2VDb25uZWN0V2FsbGV0IH0gZnJvbSAnQHdlYjMtb25ib2FyZC9yZWFjdCc7XG5pbXBvcnQgaW5qZWN0ZWRNb2R1bGUgZnJvbSAnQHdlYjMtb25ib2FyZC9pbmplY3RlZC13YWxsZXRzJztcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi4vcGFnZS5tb2R1bGUuY3NzJztcblxuY29uc3QgUlBDX1VSTCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NFUE9MSUFfQUxDSEVNWV9VUkw7XG5jb25zdCBhcGlLZXkgPSAnMTczMGVmZjAtOWQ1MC00MzgyLWEzZmUtODlmMGQzNGEyMDcwJztcbmNvbnN0IGV0aGVyZXVtU2Vwb2xpYSA9IHtcbiAgaWQ6IDExMTU1MTExLFxuICB0b2tlbjogJ0VUSCcsXG4gIGxhYmVsOiAnU2Vwb2xpYScsXG4gIHJwY1VybDogUlBDX1VSTCxcbn07XG5cbmNvbnN0IGluamVjdGVkID0gaW5qZWN0ZWRNb2R1bGUoKTtcbmNvbnN0IGNoYWlucyA9IFtldGhlcmV1bVNlcG9saWFdO1xuXG5pbml0KHtcbiAgYXBpS2V5LFxuICB3YWxsZXRzOiBbaW5qZWN0ZWRdLFxuICBjaGFpbnMsXG4gIGFwcE1ldGFkYXRhOiB7XG4gICAgbmFtZTogJ3NhYmxpZXJTdHJlYW1pbmcnLFxuICAgIGljb246ICc8c3ZnPkFwcCBJY29uPC9zdmc+JyxcbiAgICBkZXNjcmlwdGlvbjogJ0EgZGVtbyBvZiBTYWJsaWVyIHN0cmVhbWluZy4nLFxuICB9LFxufSk7XG5cbmNvbnN0IFdhbGxldENvbm5lY3RCdXR0b24gPSAoeyBvbkFjY291bnRDaGFuZ2UgfSkgPT4ge1xuICBjb25zdCBbeyB3YWxsZXQsIGNvbm5lY3RpbmcgfSwgY29ubmVjdCwgZGlzY29ubmVjdF0gPSB1c2VDb25uZWN0V2FsbGV0KCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAod2FsbGV0KSB7XG4gICAgICBjb25zdCBldGhlcnNQcm92aWRlciA9IG5ldyBldGhlcnMucHJvdmlkZXJzLldlYjNQcm92aWRlcih3YWxsZXQucHJvdmlkZXIsICdhbnknKTtcbiAgICAgIGNvbnN0IGFjY291bnQgPSB3YWxsZXQuYWNjb3VudHNbMF07XG4gICAgICBvbkFjY291bnRDaGFuZ2UoYWNjb3VudCk7XG4gICAgfVxuICB9LCBbd2FsbGV0LCBvbkFjY291bnRDaGFuZ2VdKTtcblxuICByZXR1cm4gKFxuICAgIDxidXR0b25cbiAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmJ1dHRvbn1cbiAgICAgIGRpc2FibGVkPXtjb25uZWN0aW5nfVxuICAgICAgb25DbGljaz17KCkgPT4gKHdhbGxldCA/IGRpc2Nvbm5lY3Qod2FsbGV0KSA6IGNvbm5lY3QoKSl9XG4gICAgPlxuICAgICAge2Nvbm5lY3RpbmcgPyAnQ29ubmVjdGluZy4uLicgOiB3YWxsZXQgPyAnRGlzY29ubmVjdCcgOiAnQ29ubmVjdCBXYWxsZXQnfVxuICAgIDwvYnV0dG9uPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgV2FsbGV0Q29ubmVjdEJ1dHRvbjtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsImV0aGVycyIsImluaXQiLCJ1c2VDb25uZWN0V2FsbGV0IiwiaW5qZWN0ZWRNb2R1bGUiLCJzdHlsZXMiLCJSUENfVVJMIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX1NFUE9MSUFfQUxDSEVNWV9VUkwiLCJhcGlLZXkiLCJldGhlcmV1bVNlcG9saWEiLCJpZCIsInRva2VuIiwibGFiZWwiLCJycGNVcmwiLCJpbmplY3RlZCIsImNoYWlucyIsIndhbGxldHMiLCJhcHBNZXRhZGF0YSIsIm5hbWUiLCJpY29uIiwiZGVzY3JpcHRpb24iLCJXYWxsZXRDb25uZWN0QnV0dG9uIiwib25BY2NvdW50Q2hhbmdlIiwid2FsbGV0IiwiY29ubmVjdGluZyIsImNvbm5lY3QiLCJkaXNjb25uZWN0IiwiZXRoZXJzUHJvdmlkZXIiLCJwcm92aWRlcnMiLCJXZWIzUHJvdmlkZXIiLCJwcm92aWRlciIsImFjY291bnQiLCJhY2NvdW50cyIsImJ1dHRvbiIsImNsYXNzTmFtZSIsImRpc2FibGVkIiwib25DbGljayJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/components/WalletConnectButton.js\n"));

/***/ })

});