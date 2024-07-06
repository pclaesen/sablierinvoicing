/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/dotenv";
exports.ids = ["vendor-chunks/dotenv"];
exports.modules = {

/***/ "(ssr)/./node_modules/dotenv/lib/main.js":
/*!*****************************************!*\
  !*** ./node_modules/dotenv/lib/main.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const fs = __webpack_require__(/*! fs */ \"fs\")\nconst path = __webpack_require__(/*! path */ \"path\")\nconst os = __webpack_require__(/*! os */ \"os\")\nconst crypto = __webpack_require__(/*! crypto */ \"crypto\")\nconst packageJson = __webpack_require__(/*! ../package.json */ \"(ssr)/./node_modules/dotenv/package.json\")\n\nconst version = packageJson.version\n\nconst LINE = /(?:^|^)\\s*(?:export\\s+)?([\\w.-]+)(?:\\s*=\\s*?|:\\s+?)(\\s*'(?:\\\\'|[^'])*'|\\s*\"(?:\\\\\"|[^\"])*\"|\\s*`(?:\\\\`|[^`])*`|[^#\\r\\n]+)?\\s*(?:#.*)?(?:$|$)/mg\n\n// Parse src into an Object\nfunction parse (src) {\n  const obj = {}\n\n  // Convert buffer to string\n  let lines = src.toString()\n\n  // Convert line breaks to same format\n  lines = lines.replace(/\\r\\n?/mg, '\\n')\n\n  let match\n  while ((match = LINE.exec(lines)) != null) {\n    const key = match[1]\n\n    // Default undefined or null to empty string\n    let value = (match[2] || '')\n\n    // Remove whitespace\n    value = value.trim()\n\n    // Check if double quoted\n    const maybeQuote = value[0]\n\n    // Remove surrounding quotes\n    value = value.replace(/^(['\"`])([\\s\\S]*)\\1$/mg, '$2')\n\n    // Expand newlines if double quoted\n    if (maybeQuote === '\"') {\n      value = value.replace(/\\\\n/g, '\\n')\n      value = value.replace(/\\\\r/g, '\\r')\n    }\n\n    // Add to object\n    obj[key] = value\n  }\n\n  return obj\n}\n\nfunction _parseVault (options) {\n  const vaultPath = _vaultPath(options)\n\n  // Parse .env.vault\n  const result = DotenvModule.configDotenv({ path: vaultPath })\n  if (!result.parsed) {\n    const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`)\n    err.code = 'MISSING_DATA'\n    throw err\n  }\n\n  // handle scenario for comma separated keys - for use with key rotation\n  // example: DOTENV_KEY=\"dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=prod,dotenv://:key_7890@dotenvx.com/vault/.env.vault?environment=prod\"\n  const keys = _dotenvKey(options).split(',')\n  const length = keys.length\n\n  let decrypted\n  for (let i = 0; i < length; i++) {\n    try {\n      // Get full key\n      const key = keys[i].trim()\n\n      // Get instructions for decrypt\n      const attrs = _instructions(result, key)\n\n      // Decrypt\n      decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key)\n\n      break\n    } catch (error) {\n      // last key\n      if (i + 1 >= length) {\n        throw error\n      }\n      // try next key\n    }\n  }\n\n  // Parse decrypted .env string\n  return DotenvModule.parse(decrypted)\n}\n\nfunction _log (message) {\n  console.log(`[dotenv@${version}][INFO] ${message}`)\n}\n\nfunction _warn (message) {\n  console.log(`[dotenv@${version}][WARN] ${message}`)\n}\n\nfunction _debug (message) {\n  console.log(`[dotenv@${version}][DEBUG] ${message}`)\n}\n\nfunction _dotenvKey (options) {\n  // prioritize developer directly setting options.DOTENV_KEY\n  if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {\n    return options.DOTENV_KEY\n  }\n\n  // secondary infra already contains a DOTENV_KEY environment variable\n  if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {\n    return process.env.DOTENV_KEY\n  }\n\n  // fallback to empty string\n  return ''\n}\n\nfunction _instructions (result, dotenvKey) {\n  // Parse DOTENV_KEY. Format is a URI\n  let uri\n  try {\n    uri = new URL(dotenvKey)\n  } catch (error) {\n    if (error.code === 'ERR_INVALID_URL') {\n      const err = new Error('INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development')\n      err.code = 'INVALID_DOTENV_KEY'\n      throw err\n    }\n\n    throw error\n  }\n\n  // Get decrypt key\n  const key = uri.password\n  if (!key) {\n    const err = new Error('INVALID_DOTENV_KEY: Missing key part')\n    err.code = 'INVALID_DOTENV_KEY'\n    throw err\n  }\n\n  // Get environment\n  const environment = uri.searchParams.get('environment')\n  if (!environment) {\n    const err = new Error('INVALID_DOTENV_KEY: Missing environment part')\n    err.code = 'INVALID_DOTENV_KEY'\n    throw err\n  }\n\n  // Get ciphertext payload\n  const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`\n  const ciphertext = result.parsed[environmentKey] // DOTENV_VAULT_PRODUCTION\n  if (!ciphertext) {\n    const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`)\n    err.code = 'NOT_FOUND_DOTENV_ENVIRONMENT'\n    throw err\n  }\n\n  return { ciphertext, key }\n}\n\nfunction _vaultPath (options) {\n  let possibleVaultPath = null\n\n  if (options && options.path && options.path.length > 0) {\n    if (Array.isArray(options.path)) {\n      for (const filepath of options.path) {\n        if (fs.existsSync(filepath)) {\n          possibleVaultPath = filepath.endsWith('.vault') ? filepath : `${filepath}.vault`\n        }\n      }\n    } else {\n      possibleVaultPath = options.path.endsWith('.vault') ? options.path : `${options.path}.vault`\n    }\n  } else {\n    possibleVaultPath = path.resolve(process.cwd(), '.env.vault')\n  }\n\n  if (fs.existsSync(possibleVaultPath)) {\n    return possibleVaultPath\n  }\n\n  return null\n}\n\nfunction _resolveHome (envPath) {\n  return envPath[0] === '~' ? path.join(os.homedir(), envPath.slice(1)) : envPath\n}\n\nfunction _configVault (options) {\n  _log('Loading env from encrypted .env.vault')\n\n  const parsed = DotenvModule._parseVault(options)\n\n  let processEnv = process.env\n  if (options && options.processEnv != null) {\n    processEnv = options.processEnv\n  }\n\n  DotenvModule.populate(processEnv, parsed, options)\n\n  return { parsed }\n}\n\nfunction configDotenv (options) {\n  const dotenvPath = path.resolve(process.cwd(), '.env')\n  let encoding = 'utf8'\n  const debug = Boolean(options && options.debug)\n\n  if (options && options.encoding) {\n    encoding = options.encoding\n  } else {\n    if (debug) {\n      _debug('No encoding is specified. UTF-8 is used by default')\n    }\n  }\n\n  let optionPaths = [dotenvPath] // default, look for .env\n  if (options && options.path) {\n    if (!Array.isArray(options.path)) {\n      optionPaths = [_resolveHome(options.path)]\n    } else {\n      optionPaths = [] // reset default\n      for (const filepath of options.path) {\n        optionPaths.push(_resolveHome(filepath))\n      }\n    }\n  }\n\n  // Build the parsed data in a temporary object (because we need to return it).  Once we have the final\n  // parsed data, we will combine it with process.env (or options.processEnv if provided).\n  let lastError\n  const parsedAll = {}\n  for (const path of optionPaths) {\n    try {\n      // Specifying an encoding returns a string instead of a buffer\n      const parsed = DotenvModule.parse(fs.readFileSync(path, { encoding }))\n\n      DotenvModule.populate(parsedAll, parsed, options)\n    } catch (e) {\n      if (debug) {\n        _debug(`Failed to load ${path} ${e.message}`)\n      }\n      lastError = e\n    }\n  }\n\n  let processEnv = process.env\n  if (options && options.processEnv != null) {\n    processEnv = options.processEnv\n  }\n\n  DotenvModule.populate(processEnv, parsedAll, options)\n\n  if (lastError) {\n    return { parsed: parsedAll, error: lastError }\n  } else {\n    return { parsed: parsedAll }\n  }\n}\n\n// Populates process.env from .env file\nfunction config (options) {\n  // fallback to original dotenv if DOTENV_KEY is not set\n  if (_dotenvKey(options).length === 0) {\n    return DotenvModule.configDotenv(options)\n  }\n\n  const vaultPath = _vaultPath(options)\n\n  // dotenvKey exists but .env.vault file does not exist\n  if (!vaultPath) {\n    _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`)\n\n    return DotenvModule.configDotenv(options)\n  }\n\n  return DotenvModule._configVault(options)\n}\n\nfunction decrypt (encrypted, keyStr) {\n  const key = Buffer.from(keyStr.slice(-64), 'hex')\n  let ciphertext = Buffer.from(encrypted, 'base64')\n\n  const nonce = ciphertext.subarray(0, 12)\n  const authTag = ciphertext.subarray(-16)\n  ciphertext = ciphertext.subarray(12, -16)\n\n  try {\n    const aesgcm = crypto.createDecipheriv('aes-256-gcm', key, nonce)\n    aesgcm.setAuthTag(authTag)\n    return `${aesgcm.update(ciphertext)}${aesgcm.final()}`\n  } catch (error) {\n    const isRange = error instanceof RangeError\n    const invalidKeyLength = error.message === 'Invalid key length'\n    const decryptionFailed = error.message === 'Unsupported state or unable to authenticate data'\n\n    if (isRange || invalidKeyLength) {\n      const err = new Error('INVALID_DOTENV_KEY: It must be 64 characters long (or more)')\n      err.code = 'INVALID_DOTENV_KEY'\n      throw err\n    } else if (decryptionFailed) {\n      const err = new Error('DECRYPTION_FAILED: Please check your DOTENV_KEY')\n      err.code = 'DECRYPTION_FAILED'\n      throw err\n    } else {\n      throw error\n    }\n  }\n}\n\n// Populate process.env with parsed values\nfunction populate (processEnv, parsed, options = {}) {\n  const debug = Boolean(options && options.debug)\n  const override = Boolean(options && options.override)\n\n  if (typeof parsed !== 'object') {\n    const err = new Error('OBJECT_REQUIRED: Please check the processEnv argument being passed to populate')\n    err.code = 'OBJECT_REQUIRED'\n    throw err\n  }\n\n  // Set process.env\n  for (const key of Object.keys(parsed)) {\n    if (Object.prototype.hasOwnProperty.call(processEnv, key)) {\n      if (override === true) {\n        processEnv[key] = parsed[key]\n      }\n\n      if (debug) {\n        if (override === true) {\n          _debug(`\"${key}\" is already defined and WAS overwritten`)\n        } else {\n          _debug(`\"${key}\" is already defined and was NOT overwritten`)\n        }\n      }\n    } else {\n      processEnv[key] = parsed[key]\n    }\n  }\n}\n\nconst DotenvModule = {\n  configDotenv,\n  _configVault,\n  _parseVault,\n  config,\n  decrypt,\n  parse,\n  populate\n}\n\nmodule.exports.configDotenv = DotenvModule.configDotenv\nmodule.exports._configVault = DotenvModule._configVault\nmodule.exports._parseVault = DotenvModule._parseVault\nmodule.exports.config = DotenvModule.config\nmodule.exports.decrypt = DotenvModule.decrypt\nmodule.exports.parse = DotenvModule.parse\nmodule.exports.populate = DotenvModule.populate\n\nmodule.exports = DotenvModule\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZG90ZW52L2xpYi9tYWluLmpzIiwibWFwcGluZ3MiOiJBQUFBLFdBQVcsbUJBQU8sQ0FBQyxjQUFJO0FBQ3ZCLGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixXQUFXLG1CQUFPLENBQUMsY0FBSTtBQUN2QixlQUFlLG1CQUFPLENBQUMsc0JBQVE7QUFDL0Isb0JBQW9CLG1CQUFPLENBQUMsaUVBQWlCOztBQUU3Qzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QyxpQkFBaUI7QUFDOUQ7QUFDQSx3REFBd0QsV0FBVztBQUNuRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IsWUFBWTtBQUM5QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlCQUF5QixRQUFRLFVBQVUsUUFBUTtBQUNuRDs7QUFFQTtBQUNBLHlCQUF5QixRQUFRLFVBQVUsUUFBUTtBQUNuRDs7QUFFQTtBQUNBLHlCQUF5QixRQUFRLFdBQVcsUUFBUTtBQUNwRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlDQUF5QywwQkFBMEI7QUFDbkU7QUFDQTtBQUNBLHFGQUFxRixnQkFBZ0I7QUFDckc7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEVBQTBFLFNBQVM7QUFDbkY7QUFDQTtBQUNBLE1BQU07QUFDTiw4RUFBOEUsYUFBYTtBQUMzRjtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdFQUFnRSxVQUFVOztBQUUxRTtBQUNBLE1BQU07QUFDTjtBQUNBLGlDQUFpQyxNQUFNLEVBQUUsVUFBVTtBQUNuRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGFBQWE7QUFDYixJQUFJO0FBQ0osYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSx5RUFBeUUsVUFBVTs7QUFFbkY7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYywwQkFBMEIsRUFBRSxlQUFlO0FBQ3pELElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQixJQUFJO0FBQ3pCLFVBQVU7QUFDVixxQkFBcUIsSUFBSTtBQUN6QjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0IsMkJBQTJCO0FBQzNCLDBCQUEwQjtBQUMxQixxQkFBcUI7QUFDckIsc0JBQXNCO0FBQ3RCLG9CQUFvQjtBQUNwQix1QkFBdUI7O0FBRXZCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2l0aHVic3RyZWFtaW5nLy4vbm9kZV9tb2R1bGVzL2RvdGVudi9saWIvbWFpbi5qcz9hZmI0Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKVxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3Qgb3MgPSByZXF1aXJlKCdvcycpXG5jb25zdCBjcnlwdG8gPSByZXF1aXJlKCdjcnlwdG8nKVxuY29uc3QgcGFja2FnZUpzb24gPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKVxuXG5jb25zdCB2ZXJzaW9uID0gcGFja2FnZUpzb24udmVyc2lvblxuXG5jb25zdCBMSU5FID0gLyg/Ol58XilcXHMqKD86ZXhwb3J0XFxzKyk/KFtcXHcuLV0rKSg/Olxccyo9XFxzKj98Olxccys/KShcXHMqJyg/OlxcXFwnfFteJ10pKid8XFxzKlwiKD86XFxcXFwifFteXCJdKSpcInxcXHMqYCg/OlxcXFxgfFteYF0pKmB8W14jXFxyXFxuXSspP1xccyooPzojLiopPyg/OiR8JCkvbWdcblxuLy8gUGFyc2Ugc3JjIGludG8gYW4gT2JqZWN0XG5mdW5jdGlvbiBwYXJzZSAoc3JjKSB7XG4gIGNvbnN0IG9iaiA9IHt9XG5cbiAgLy8gQ29udmVydCBidWZmZXIgdG8gc3RyaW5nXG4gIGxldCBsaW5lcyA9IHNyYy50b1N0cmluZygpXG5cbiAgLy8gQ29udmVydCBsaW5lIGJyZWFrcyB0byBzYW1lIGZvcm1hdFxuICBsaW5lcyA9IGxpbmVzLnJlcGxhY2UoL1xcclxcbj8vbWcsICdcXG4nKVxuXG4gIGxldCBtYXRjaFxuICB3aGlsZSAoKG1hdGNoID0gTElORS5leGVjKGxpbmVzKSkgIT0gbnVsbCkge1xuICAgIGNvbnN0IGtleSA9IG1hdGNoWzFdXG5cbiAgICAvLyBEZWZhdWx0IHVuZGVmaW5lZCBvciBudWxsIHRvIGVtcHR5IHN0cmluZ1xuICAgIGxldCB2YWx1ZSA9IChtYXRjaFsyXSB8fCAnJylcblxuICAgIC8vIFJlbW92ZSB3aGl0ZXNwYWNlXG4gICAgdmFsdWUgPSB2YWx1ZS50cmltKClcblxuICAgIC8vIENoZWNrIGlmIGRvdWJsZSBxdW90ZWRcbiAgICBjb25zdCBtYXliZVF1b3RlID0gdmFsdWVbMF1cblxuICAgIC8vIFJlbW92ZSBzdXJyb3VuZGluZyBxdW90ZXNcbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL14oWydcImBdKShbXFxzXFxTXSopXFwxJC9tZywgJyQyJylcblxuICAgIC8vIEV4cGFuZCBuZXdsaW5lcyBpZiBkb3VibGUgcXVvdGVkXG4gICAgaWYgKG1heWJlUXVvdGUgPT09ICdcIicpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxcXG4vZywgJ1xcbicpXG4gICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcXFxyL2csICdcXHInKVxuICAgIH1cblxuICAgIC8vIEFkZCB0byBvYmplY3RcbiAgICBvYmpba2V5XSA9IHZhbHVlXG4gIH1cblxuICByZXR1cm4gb2JqXG59XG5cbmZ1bmN0aW9uIF9wYXJzZVZhdWx0IChvcHRpb25zKSB7XG4gIGNvbnN0IHZhdWx0UGF0aCA9IF92YXVsdFBhdGgob3B0aW9ucylcblxuICAvLyBQYXJzZSAuZW52LnZhdWx0XG4gIGNvbnN0IHJlc3VsdCA9IERvdGVudk1vZHVsZS5jb25maWdEb3RlbnYoeyBwYXRoOiB2YXVsdFBhdGggfSlcbiAgaWYgKCFyZXN1bHQucGFyc2VkKSB7XG4gICAgY29uc3QgZXJyID0gbmV3IEVycm9yKGBNSVNTSU5HX0RBVEE6IENhbm5vdCBwYXJzZSAke3ZhdWx0UGF0aH0gZm9yIGFuIHVua25vd24gcmVhc29uYClcbiAgICBlcnIuY29kZSA9ICdNSVNTSU5HX0RBVEEnXG4gICAgdGhyb3cgZXJyXG4gIH1cblxuICAvLyBoYW5kbGUgc2NlbmFyaW8gZm9yIGNvbW1hIHNlcGFyYXRlZCBrZXlzIC0gZm9yIHVzZSB3aXRoIGtleSByb3RhdGlvblxuICAvLyBleGFtcGxlOiBET1RFTlZfS0VZPVwiZG90ZW52Oi8vOmtleV8xMjM0QGRvdGVudnguY29tL3ZhdWx0Ly5lbnYudmF1bHQ/ZW52aXJvbm1lbnQ9cHJvZCxkb3RlbnY6Ly86a2V5Xzc4OTBAZG90ZW52eC5jb20vdmF1bHQvLmVudi52YXVsdD9lbnZpcm9ubWVudD1wcm9kXCJcbiAgY29uc3Qga2V5cyA9IF9kb3RlbnZLZXkob3B0aW9ucykuc3BsaXQoJywnKVxuICBjb25zdCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuXG4gIGxldCBkZWNyeXB0ZWRcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHRyeSB7XG4gICAgICAvLyBHZXQgZnVsbCBrZXlcbiAgICAgIGNvbnN0IGtleSA9IGtleXNbaV0udHJpbSgpXG5cbiAgICAgIC8vIEdldCBpbnN0cnVjdGlvbnMgZm9yIGRlY3J5cHRcbiAgICAgIGNvbnN0IGF0dHJzID0gX2luc3RydWN0aW9ucyhyZXN1bHQsIGtleSlcblxuICAgICAgLy8gRGVjcnlwdFxuICAgICAgZGVjcnlwdGVkID0gRG90ZW52TW9kdWxlLmRlY3J5cHQoYXR0cnMuY2lwaGVydGV4dCwgYXR0cnMua2V5KVxuXG4gICAgICBicmVha1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBsYXN0IGtleVxuICAgICAgaWYgKGkgKyAxID49IGxlbmd0aCkge1xuICAgICAgICB0aHJvdyBlcnJvclxuICAgICAgfVxuICAgICAgLy8gdHJ5IG5leHQga2V5XG4gICAgfVxuICB9XG5cbiAgLy8gUGFyc2UgZGVjcnlwdGVkIC5lbnYgc3RyaW5nXG4gIHJldHVybiBEb3RlbnZNb2R1bGUucGFyc2UoZGVjcnlwdGVkKVxufVxuXG5mdW5jdGlvbiBfbG9nIChtZXNzYWdlKSB7XG4gIGNvbnNvbGUubG9nKGBbZG90ZW52QCR7dmVyc2lvbn1dW0lORk9dICR7bWVzc2FnZX1gKVxufVxuXG5mdW5jdGlvbiBfd2FybiAobWVzc2FnZSkge1xuICBjb25zb2xlLmxvZyhgW2RvdGVudkAke3ZlcnNpb259XVtXQVJOXSAke21lc3NhZ2V9YClcbn1cblxuZnVuY3Rpb24gX2RlYnVnIChtZXNzYWdlKSB7XG4gIGNvbnNvbGUubG9nKGBbZG90ZW52QCR7dmVyc2lvbn1dW0RFQlVHXSAke21lc3NhZ2V9YClcbn1cblxuZnVuY3Rpb24gX2RvdGVudktleSAob3B0aW9ucykge1xuICAvLyBwcmlvcml0aXplIGRldmVsb3BlciBkaXJlY3RseSBzZXR0aW5nIG9wdGlvbnMuRE9URU5WX0tFWVxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLkRPVEVOVl9LRVkgJiYgb3B0aW9ucy5ET1RFTlZfS0VZLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gb3B0aW9ucy5ET1RFTlZfS0VZXG4gIH1cblxuICAvLyBzZWNvbmRhcnkgaW5mcmEgYWxyZWFkeSBjb250YWlucyBhIERPVEVOVl9LRVkgZW52aXJvbm1lbnQgdmFyaWFibGVcbiAgaWYgKHByb2Nlc3MuZW52LkRPVEVOVl9LRVkgJiYgcHJvY2Vzcy5lbnYuRE9URU5WX0tFWS5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIHByb2Nlc3MuZW52LkRPVEVOVl9LRVlcbiAgfVxuXG4gIC8vIGZhbGxiYWNrIHRvIGVtcHR5IHN0cmluZ1xuICByZXR1cm4gJydcbn1cblxuZnVuY3Rpb24gX2luc3RydWN0aW9ucyAocmVzdWx0LCBkb3RlbnZLZXkpIHtcbiAgLy8gUGFyc2UgRE9URU5WX0tFWS4gRm9ybWF0IGlzIGEgVVJJXG4gIGxldCB1cmlcbiAgdHJ5IHtcbiAgICB1cmkgPSBuZXcgVVJMKGRvdGVudktleSlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAoZXJyb3IuY29kZSA9PT0gJ0VSUl9JTlZBTElEX1VSTCcpIHtcbiAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcignSU5WQUxJRF9ET1RFTlZfS0VZOiBXcm9uZyBmb3JtYXQuIE11c3QgYmUgaW4gdmFsaWQgdXJpIGZvcm1hdCBsaWtlIGRvdGVudjovLzprZXlfMTIzNEBkb3RlbnZ4LmNvbS92YXVsdC8uZW52LnZhdWx0P2Vudmlyb25tZW50PWRldmVsb3BtZW50JylcbiAgICAgIGVyci5jb2RlID0gJ0lOVkFMSURfRE9URU5WX0tFWSdcbiAgICAgIHRocm93IGVyclxuICAgIH1cblxuICAgIHRocm93IGVycm9yXG4gIH1cblxuICAvLyBHZXQgZGVjcnlwdCBrZXlcbiAgY29uc3Qga2V5ID0gdXJpLnBhc3N3b3JkXG4gIGlmICgha2V5KSB7XG4gICAgY29uc3QgZXJyID0gbmV3IEVycm9yKCdJTlZBTElEX0RPVEVOVl9LRVk6IE1pc3Npbmcga2V5IHBhcnQnKVxuICAgIGVyci5jb2RlID0gJ0lOVkFMSURfRE9URU5WX0tFWSdcbiAgICB0aHJvdyBlcnJcbiAgfVxuXG4gIC8vIEdldCBlbnZpcm9ubWVudFxuICBjb25zdCBlbnZpcm9ubWVudCA9IHVyaS5zZWFyY2hQYXJhbXMuZ2V0KCdlbnZpcm9ubWVudCcpXG4gIGlmICghZW52aXJvbm1lbnQpIHtcbiAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoJ0lOVkFMSURfRE9URU5WX0tFWTogTWlzc2luZyBlbnZpcm9ubWVudCBwYXJ0JylcbiAgICBlcnIuY29kZSA9ICdJTlZBTElEX0RPVEVOVl9LRVknXG4gICAgdGhyb3cgZXJyXG4gIH1cblxuICAvLyBHZXQgY2lwaGVydGV4dCBwYXlsb2FkXG4gIGNvbnN0IGVudmlyb25tZW50S2V5ID0gYERPVEVOVl9WQVVMVF8ke2Vudmlyb25tZW50LnRvVXBwZXJDYXNlKCl9YFxuICBjb25zdCBjaXBoZXJ0ZXh0ID0gcmVzdWx0LnBhcnNlZFtlbnZpcm9ubWVudEtleV0gLy8gRE9URU5WX1ZBVUxUX1BST0RVQ1RJT05cbiAgaWYgKCFjaXBoZXJ0ZXh0KSB7XG4gICAgY29uc3QgZXJyID0gbmV3IEVycm9yKGBOT1RfRk9VTkRfRE9URU5WX0VOVklST05NRU5UOiBDYW5ub3QgbG9jYXRlIGVudmlyb25tZW50ICR7ZW52aXJvbm1lbnRLZXl9IGluIHlvdXIgLmVudi52YXVsdCBmaWxlLmApXG4gICAgZXJyLmNvZGUgPSAnTk9UX0ZPVU5EX0RPVEVOVl9FTlZJUk9OTUVOVCdcbiAgICB0aHJvdyBlcnJcbiAgfVxuXG4gIHJldHVybiB7IGNpcGhlcnRleHQsIGtleSB9XG59XG5cbmZ1bmN0aW9uIF92YXVsdFBhdGggKG9wdGlvbnMpIHtcbiAgbGV0IHBvc3NpYmxlVmF1bHRQYXRoID0gbnVsbFxuXG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMucGF0aCAmJiBvcHRpb25zLnBhdGgubGVuZ3RoID4gMCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMucGF0aCkpIHtcbiAgICAgIGZvciAoY29uc3QgZmlsZXBhdGggb2Ygb3B0aW9ucy5wYXRoKSB7XG4gICAgICAgIGlmIChmcy5leGlzdHNTeW5jKGZpbGVwYXRoKSkge1xuICAgICAgICAgIHBvc3NpYmxlVmF1bHRQYXRoID0gZmlsZXBhdGguZW5kc1dpdGgoJy52YXVsdCcpID8gZmlsZXBhdGggOiBgJHtmaWxlcGF0aH0udmF1bHRgXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcG9zc2libGVWYXVsdFBhdGggPSBvcHRpb25zLnBhdGguZW5kc1dpdGgoJy52YXVsdCcpID8gb3B0aW9ucy5wYXRoIDogYCR7b3B0aW9ucy5wYXRofS52YXVsdGBcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcG9zc2libGVWYXVsdFBhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJy5lbnYudmF1bHQnKVxuICB9XG5cbiAgaWYgKGZzLmV4aXN0c1N5bmMocG9zc2libGVWYXVsdFBhdGgpKSB7XG4gICAgcmV0dXJuIHBvc3NpYmxlVmF1bHRQYXRoXG4gIH1cblxuICByZXR1cm4gbnVsbFxufVxuXG5mdW5jdGlvbiBfcmVzb2x2ZUhvbWUgKGVudlBhdGgpIHtcbiAgcmV0dXJuIGVudlBhdGhbMF0gPT09ICd+JyA/IHBhdGguam9pbihvcy5ob21lZGlyKCksIGVudlBhdGguc2xpY2UoMSkpIDogZW52UGF0aFxufVxuXG5mdW5jdGlvbiBfY29uZmlnVmF1bHQgKG9wdGlvbnMpIHtcbiAgX2xvZygnTG9hZGluZyBlbnYgZnJvbSBlbmNyeXB0ZWQgLmVudi52YXVsdCcpXG5cbiAgY29uc3QgcGFyc2VkID0gRG90ZW52TW9kdWxlLl9wYXJzZVZhdWx0KG9wdGlvbnMpXG5cbiAgbGV0IHByb2Nlc3NFbnYgPSBwcm9jZXNzLmVudlxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnByb2Nlc3NFbnYgIT0gbnVsbCkge1xuICAgIHByb2Nlc3NFbnYgPSBvcHRpb25zLnByb2Nlc3NFbnZcbiAgfVxuXG4gIERvdGVudk1vZHVsZS5wb3B1bGF0ZShwcm9jZXNzRW52LCBwYXJzZWQsIG9wdGlvbnMpXG5cbiAgcmV0dXJuIHsgcGFyc2VkIH1cbn1cblxuZnVuY3Rpb24gY29uZmlnRG90ZW52IChvcHRpb25zKSB7XG4gIGNvbnN0IGRvdGVudlBhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJy5lbnYnKVxuICBsZXQgZW5jb2RpbmcgPSAndXRmOCdcbiAgY29uc3QgZGVidWcgPSBCb29sZWFuKG9wdGlvbnMgJiYgb3B0aW9ucy5kZWJ1ZylcblxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmVuY29kaW5nKSB7XG4gICAgZW5jb2RpbmcgPSBvcHRpb25zLmVuY29kaW5nXG4gIH0gZWxzZSB7XG4gICAgaWYgKGRlYnVnKSB7XG4gICAgICBfZGVidWcoJ05vIGVuY29kaW5nIGlzIHNwZWNpZmllZC4gVVRGLTggaXMgdXNlZCBieSBkZWZhdWx0JylcbiAgICB9XG4gIH1cblxuICBsZXQgb3B0aW9uUGF0aHMgPSBbZG90ZW52UGF0aF0gLy8gZGVmYXVsdCwgbG9vayBmb3IgLmVudlxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnBhdGgpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkob3B0aW9ucy5wYXRoKSkge1xuICAgICAgb3B0aW9uUGF0aHMgPSBbX3Jlc29sdmVIb21lKG9wdGlvbnMucGF0aCldXG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvblBhdGhzID0gW10gLy8gcmVzZXQgZGVmYXVsdFxuICAgICAgZm9yIChjb25zdCBmaWxlcGF0aCBvZiBvcHRpb25zLnBhdGgpIHtcbiAgICAgICAgb3B0aW9uUGF0aHMucHVzaChfcmVzb2x2ZUhvbWUoZmlsZXBhdGgpKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIEJ1aWxkIHRoZSBwYXJzZWQgZGF0YSBpbiBhIHRlbXBvcmFyeSBvYmplY3QgKGJlY2F1c2Ugd2UgbmVlZCB0byByZXR1cm4gaXQpLiAgT25jZSB3ZSBoYXZlIHRoZSBmaW5hbFxuICAvLyBwYXJzZWQgZGF0YSwgd2Ugd2lsbCBjb21iaW5lIGl0IHdpdGggcHJvY2Vzcy5lbnYgKG9yIG9wdGlvbnMucHJvY2Vzc0VudiBpZiBwcm92aWRlZCkuXG4gIGxldCBsYXN0RXJyb3JcbiAgY29uc3QgcGFyc2VkQWxsID0ge31cbiAgZm9yIChjb25zdCBwYXRoIG9mIG9wdGlvblBhdGhzKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIFNwZWNpZnlpbmcgYW4gZW5jb2RpbmcgcmV0dXJucyBhIHN0cmluZyBpbnN0ZWFkIG9mIGEgYnVmZmVyXG4gICAgICBjb25zdCBwYXJzZWQgPSBEb3RlbnZNb2R1bGUucGFyc2UoZnMucmVhZEZpbGVTeW5jKHBhdGgsIHsgZW5jb2RpbmcgfSkpXG5cbiAgICAgIERvdGVudk1vZHVsZS5wb3B1bGF0ZShwYXJzZWRBbGwsIHBhcnNlZCwgb3B0aW9ucylcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZGVidWcpIHtcbiAgICAgICAgX2RlYnVnKGBGYWlsZWQgdG8gbG9hZCAke3BhdGh9ICR7ZS5tZXNzYWdlfWApXG4gICAgICB9XG4gICAgICBsYXN0RXJyb3IgPSBlXG4gICAgfVxuICB9XG5cbiAgbGV0IHByb2Nlc3NFbnYgPSBwcm9jZXNzLmVudlxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnByb2Nlc3NFbnYgIT0gbnVsbCkge1xuICAgIHByb2Nlc3NFbnYgPSBvcHRpb25zLnByb2Nlc3NFbnZcbiAgfVxuXG4gIERvdGVudk1vZHVsZS5wb3B1bGF0ZShwcm9jZXNzRW52LCBwYXJzZWRBbGwsIG9wdGlvbnMpXG5cbiAgaWYgKGxhc3RFcnJvcikge1xuICAgIHJldHVybiB7IHBhcnNlZDogcGFyc2VkQWxsLCBlcnJvcjogbGFzdEVycm9yIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4geyBwYXJzZWQ6IHBhcnNlZEFsbCB9XG4gIH1cbn1cblxuLy8gUG9wdWxhdGVzIHByb2Nlc3MuZW52IGZyb20gLmVudiBmaWxlXG5mdW5jdGlvbiBjb25maWcgKG9wdGlvbnMpIHtcbiAgLy8gZmFsbGJhY2sgdG8gb3JpZ2luYWwgZG90ZW52IGlmIERPVEVOVl9LRVkgaXMgbm90IHNldFxuICBpZiAoX2RvdGVudktleShvcHRpb25zKS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gRG90ZW52TW9kdWxlLmNvbmZpZ0RvdGVudihvcHRpb25zKVxuICB9XG5cbiAgY29uc3QgdmF1bHRQYXRoID0gX3ZhdWx0UGF0aChvcHRpb25zKVxuXG4gIC8vIGRvdGVudktleSBleGlzdHMgYnV0IC5lbnYudmF1bHQgZmlsZSBkb2VzIG5vdCBleGlzdFxuICBpZiAoIXZhdWx0UGF0aCkge1xuICAgIF93YXJuKGBZb3Ugc2V0IERPVEVOVl9LRVkgYnV0IHlvdSBhcmUgbWlzc2luZyBhIC5lbnYudmF1bHQgZmlsZSBhdCAke3ZhdWx0UGF0aH0uIERpZCB5b3UgZm9yZ2V0IHRvIGJ1aWxkIGl0P2ApXG5cbiAgICByZXR1cm4gRG90ZW52TW9kdWxlLmNvbmZpZ0RvdGVudihvcHRpb25zKVxuICB9XG5cbiAgcmV0dXJuIERvdGVudk1vZHVsZS5fY29uZmlnVmF1bHQob3B0aW9ucylcbn1cblxuZnVuY3Rpb24gZGVjcnlwdCAoZW5jcnlwdGVkLCBrZXlTdHIpIHtcbiAgY29uc3Qga2V5ID0gQnVmZmVyLmZyb20oa2V5U3RyLnNsaWNlKC02NCksICdoZXgnKVxuICBsZXQgY2lwaGVydGV4dCA9IEJ1ZmZlci5mcm9tKGVuY3J5cHRlZCwgJ2Jhc2U2NCcpXG5cbiAgY29uc3Qgbm9uY2UgPSBjaXBoZXJ0ZXh0LnN1YmFycmF5KDAsIDEyKVxuICBjb25zdCBhdXRoVGFnID0gY2lwaGVydGV4dC5zdWJhcnJheSgtMTYpXG4gIGNpcGhlcnRleHQgPSBjaXBoZXJ0ZXh0LnN1YmFycmF5KDEyLCAtMTYpXG5cbiAgdHJ5IHtcbiAgICBjb25zdCBhZXNnY20gPSBjcnlwdG8uY3JlYXRlRGVjaXBoZXJpdignYWVzLTI1Ni1nY20nLCBrZXksIG5vbmNlKVxuICAgIGFlc2djbS5zZXRBdXRoVGFnKGF1dGhUYWcpXG4gICAgcmV0dXJuIGAke2Flc2djbS51cGRhdGUoY2lwaGVydGV4dCl9JHthZXNnY20uZmluYWwoKX1gXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc3QgaXNSYW5nZSA9IGVycm9yIGluc3RhbmNlb2YgUmFuZ2VFcnJvclxuICAgIGNvbnN0IGludmFsaWRLZXlMZW5ndGggPSBlcnJvci5tZXNzYWdlID09PSAnSW52YWxpZCBrZXkgbGVuZ3RoJ1xuICAgIGNvbnN0IGRlY3J5cHRpb25GYWlsZWQgPSBlcnJvci5tZXNzYWdlID09PSAnVW5zdXBwb3J0ZWQgc3RhdGUgb3IgdW5hYmxlIHRvIGF1dGhlbnRpY2F0ZSBkYXRhJ1xuXG4gICAgaWYgKGlzUmFuZ2UgfHwgaW52YWxpZEtleUxlbmd0aCkge1xuICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKCdJTlZBTElEX0RPVEVOVl9LRVk6IEl0IG11c3QgYmUgNjQgY2hhcmFjdGVycyBsb25nIChvciBtb3JlKScpXG4gICAgICBlcnIuY29kZSA9ICdJTlZBTElEX0RPVEVOVl9LRVknXG4gICAgICB0aHJvdyBlcnJcbiAgICB9IGVsc2UgaWYgKGRlY3J5cHRpb25GYWlsZWQpIHtcbiAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcignREVDUllQVElPTl9GQUlMRUQ6IFBsZWFzZSBjaGVjayB5b3VyIERPVEVOVl9LRVknKVxuICAgICAgZXJyLmNvZGUgPSAnREVDUllQVElPTl9GQUlMRUQnXG4gICAgICB0aHJvdyBlcnJcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZXJyb3JcbiAgICB9XG4gIH1cbn1cblxuLy8gUG9wdWxhdGUgcHJvY2Vzcy5lbnYgd2l0aCBwYXJzZWQgdmFsdWVzXG5mdW5jdGlvbiBwb3B1bGF0ZSAocHJvY2Vzc0VudiwgcGFyc2VkLCBvcHRpb25zID0ge30pIHtcbiAgY29uc3QgZGVidWcgPSBCb29sZWFuKG9wdGlvbnMgJiYgb3B0aW9ucy5kZWJ1ZylcbiAgY29uc3Qgb3ZlcnJpZGUgPSBCb29sZWFuKG9wdGlvbnMgJiYgb3B0aW9ucy5vdmVycmlkZSlcblxuICBpZiAodHlwZW9mIHBhcnNlZCAhPT0gJ29iamVjdCcpIHtcbiAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoJ09CSkVDVF9SRVFVSVJFRDogUGxlYXNlIGNoZWNrIHRoZSBwcm9jZXNzRW52IGFyZ3VtZW50IGJlaW5nIHBhc3NlZCB0byBwb3B1bGF0ZScpXG4gICAgZXJyLmNvZGUgPSAnT0JKRUNUX1JFUVVJUkVEJ1xuICAgIHRocm93IGVyclxuICB9XG5cbiAgLy8gU2V0IHByb2Nlc3MuZW52XG4gIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHBhcnNlZCkpIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHByb2Nlc3NFbnYsIGtleSkpIHtcbiAgICAgIGlmIChvdmVycmlkZSA9PT0gdHJ1ZSkge1xuICAgICAgICBwcm9jZXNzRW52W2tleV0gPSBwYXJzZWRba2V5XVxuICAgICAgfVxuXG4gICAgICBpZiAoZGVidWcpIHtcbiAgICAgICAgaWYgKG92ZXJyaWRlID09PSB0cnVlKSB7XG4gICAgICAgICAgX2RlYnVnKGBcIiR7a2V5fVwiIGlzIGFscmVhZHkgZGVmaW5lZCBhbmQgV0FTIG92ZXJ3cml0dGVuYClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfZGVidWcoYFwiJHtrZXl9XCIgaXMgYWxyZWFkeSBkZWZpbmVkIGFuZCB3YXMgTk9UIG92ZXJ3cml0dGVuYClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwcm9jZXNzRW52W2tleV0gPSBwYXJzZWRba2V5XVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBEb3RlbnZNb2R1bGUgPSB7XG4gIGNvbmZpZ0RvdGVudixcbiAgX2NvbmZpZ1ZhdWx0LFxuICBfcGFyc2VWYXVsdCxcbiAgY29uZmlnLFxuICBkZWNyeXB0LFxuICBwYXJzZSxcbiAgcG9wdWxhdGVcbn1cblxubW9kdWxlLmV4cG9ydHMuY29uZmlnRG90ZW52ID0gRG90ZW52TW9kdWxlLmNvbmZpZ0RvdGVudlxubW9kdWxlLmV4cG9ydHMuX2NvbmZpZ1ZhdWx0ID0gRG90ZW52TW9kdWxlLl9jb25maWdWYXVsdFxubW9kdWxlLmV4cG9ydHMuX3BhcnNlVmF1bHQgPSBEb3RlbnZNb2R1bGUuX3BhcnNlVmF1bHRcbm1vZHVsZS5leHBvcnRzLmNvbmZpZyA9IERvdGVudk1vZHVsZS5jb25maWdcbm1vZHVsZS5leHBvcnRzLmRlY3J5cHQgPSBEb3RlbnZNb2R1bGUuZGVjcnlwdFxubW9kdWxlLmV4cG9ydHMucGFyc2UgPSBEb3RlbnZNb2R1bGUucGFyc2Vcbm1vZHVsZS5leHBvcnRzLnBvcHVsYXRlID0gRG90ZW52TW9kdWxlLnBvcHVsYXRlXG5cbm1vZHVsZS5leHBvcnRzID0gRG90ZW52TW9kdWxlXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/dotenv/lib/main.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/dotenv/package.json":
/*!******************************************!*\
  !*** ./node_modules/dotenv/package.json ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"name":"dotenv","version":"16.4.5","description":"Loads environment variables from .env file","main":"lib/main.js","types":"lib/main.d.ts","exports":{".":{"types":"./lib/main.d.ts","require":"./lib/main.js","default":"./lib/main.js"},"./config":"./config.js","./config.js":"./config.js","./lib/env-options":"./lib/env-options.js","./lib/env-options.js":"./lib/env-options.js","./lib/cli-options":"./lib/cli-options.js","./lib/cli-options.js":"./lib/cli-options.js","./package.json":"./package.json"},"scripts":{"dts-check":"tsc --project tests/types/tsconfig.json","lint":"standard","lint-readme":"standard-markdown","pretest":"npm run lint && npm run dts-check","test":"tap tests/*.js --100 -Rspec","test:coverage":"tap --coverage-report=lcov","prerelease":"npm test","release":"standard-version"},"repository":{"type":"git","url":"git://github.com/motdotla/dotenv.git"},"funding":"https://dotenvx.com","keywords":["dotenv","env",".env","environment","variables","config","settings"],"readmeFilename":"README.md","license":"BSD-2-Clause","devDependencies":{"@definitelytyped/dtslint":"^0.0.133","@types/node":"^18.11.3","decache":"^4.6.1","sinon":"^14.0.1","standard":"^17.0.0","standard-markdown":"^7.1.0","standard-version":"^9.5.0","tap":"^16.3.0","tar":"^6.1.11","typescript":"^4.8.4"},"engines":{"node":">=12"},"browser":{"fs":false}}');

/***/ })

};
;