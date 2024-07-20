/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/node-dijkstra";
exports.ids = ["vendor-chunks/node-dijkstra"];
exports.modules = {

/***/ "(ssr)/./node_modules/node-dijkstra/libs/Graph.js":
/*!**************************************************!*\
  !*** ./node_modules/node-dijkstra/libs/Graph.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Queue = __webpack_require__(/*! ./PriorityQueue */ \"(ssr)/./node_modules/node-dijkstra/libs/PriorityQueue.js\");\nconst removeDeepFromMap = __webpack_require__(/*! ./removeDeepFromMap */ \"(ssr)/./node_modules/node-dijkstra/libs/removeDeepFromMap.js\");\nconst toDeepMap = __webpack_require__(/*! ./toDeepMap */ \"(ssr)/./node_modules/node-dijkstra/libs/toDeepMap.js\");\nconst validateDeep = __webpack_require__(/*! ./validateDeep */ \"(ssr)/./node_modules/node-dijkstra/libs/validateDeep.js\");\n\n/** Creates and manages a graph */\nclass Graph {\n\n  /**\n   * Creates a new Graph, optionally initializing it a nodes graph representation.\n   *\n   * A graph representation is an object that has as keys the name of the point and as values\n   * the points reacheable from that node, with the cost to get there:\n   *\n   *     {\n   *       node (Number|String): {\n   *         neighbor (Number|String): cost (Number),\n   *         ...,\n   *       },\n   *     }\n   *\n   * In alternative to an object, you can pass a `Map` of `Map`. This will\n   * allow you to specify numbers as keys.\n   *\n   * @param {Objec|Map} [graph] - Initial graph definition\n   * @example\n   *\n   * const route = new Graph();\n   *\n   * // Pre-populated graph\n   * const route = new Graph({\n   *   A: { B: 1 },\n   *   B: { A: 1, C: 2, D: 4 },\n   * });\n   *\n   * // Passing a Map\n   * const g = new Map()\n   *\n   * const a = new Map()\n   * a.set('B', 1)\n   *\n   * const b = new Map()\n   * b.set('A', 1)\n   * b.set('C', 2)\n   * b.set('D', 4)\n   *\n   * g.set('A', a)\n   * g.set('B', b)\n   *\n   * const route = new Graph(g)\n   */\n  constructor(graph) {\n    if (graph instanceof Map) {\n      validateDeep(graph);\n      this.graph = graph;\n    } else if (graph) {\n      this.graph = toDeepMap(graph);\n    } else {\n      this.graph = new Map();\n    }\n  }\n\n  /**\n   * Adds a node to the graph\n   *\n   * @param {string} name      - Name of the node\n   * @param {Object|Map} neighbors - Neighbouring nodes and cost to reach them\n   * @return {this}\n   * @example\n   *\n   * const route = new Graph();\n   *\n   * route.addNode('A', { B: 1 });\n   *\n   * // It's possible to chain the calls\n   * route\n   *   .addNode('B', { A: 1 })\n   *   .addNode('C', { A: 3 });\n   *\n   * // The neighbors can be expressed in a Map\n   * const d = new Map()\n   * d.set('A', 2)\n   * d.set('B', 8)\n   *\n   * route.addNode('D', d)\n   */\n  addNode(name, neighbors) {\n    let nodes;\n    if (neighbors instanceof Map) {\n      validateDeep(neighbors);\n      nodes = neighbors;\n    } else {\n      nodes = toDeepMap(neighbors);\n    }\n\n    this.graph.set(name, nodes);\n\n    return this;\n  }\n\n  /**\n   * @deprecated since version 2.0, use `Graph#addNode` instead\n   */\n  addVertex(name, neighbors) {\n    return this.addNode(name, neighbors);\n  }\n\n  /**\n   * Removes a node and all of its references from the graph\n   *\n   * @param {string|number} key - Key of the node to remove from the graph\n   * @return {this}\n   * @example\n   *\n   * const route = new Graph({\n   *   A: { B: 1, C: 5 },\n   *   B: { A: 3 },\n   *   C: { B: 2, A: 2 },\n   * });\n   *\n   * route.removeNode('C');\n   * // The graph now is:\n   * // { A: { B: 1 }, B: { A: 3 } }\n   */\n  removeNode(key) {\n    this.graph = removeDeepFromMap(this.graph, key);\n\n    return this;\n  }\n\n  /**\n   * Compute the shortest path between the specified nodes\n   *\n   * @param {string}  start     - Starting node\n   * @param {string}  goal      - Node we want to reach\n   * @param {object}  [options] - Options\n   *\n   * @param {boolean} [options.trim]    - Exclude the origin and destination nodes from the result\n   * @param {boolean} [options.reverse] - Return the path in reversed order\n   * @param {boolean} [options.cost]    - Also return the cost of the path when set to true\n   *\n   * @return {array|object} Computed path between the nodes.\n   *\n   *  When `option.cost` is set to true, the returned value will be an object with shape:\n   *    - `path` *(Array)*: Computed path between the nodes\n   *    - `cost` *(Number)*: Cost of the path\n   *\n   * @example\n   *\n   * const route = new Graph()\n   *\n   * route.addNode('A', { B: 1 })\n   * route.addNode('B', { A: 1, C: 2, D: 4 })\n   * route.addNode('C', { B: 2, D: 1 })\n   * route.addNode('D', { C: 1, B: 4 })\n   *\n   * route.path('A', 'D') // => ['A', 'B', 'C', 'D']\n   *\n   * // trimmed\n   * route.path('A', 'D', { trim: true }) // => [B', 'C']\n   *\n   * // reversed\n   * route.path('A', 'D', { reverse: true }) // => ['D', 'C', 'B', 'A']\n   *\n   * // include the cost\n   * route.path('A', 'D', { cost: true })\n   * // => {\n   * //       path: [ 'A', 'B', 'C', 'D' ],\n   * //       cost: 4\n   * //    }\n   */\n  path(start, goal, options = {}) {\n    // Don't run when we don't have nodes set\n    if (!this.graph.size) {\n      if (options.cost) return { path: null, cost: 0 };\n\n      return null;\n    }\n\n    const explored = new Set();\n    const frontier = new Queue();\n    const previous = new Map();\n\n    let path = [];\n    let totalCost = 0;\n\n    let avoid = [];\n    if (options.avoid) avoid = [].concat(options.avoid);\n\n    if (avoid.includes(start)) {\n      throw new Error(`Starting node (${start}) cannot be avoided`);\n    } else if (avoid.includes(goal)) {\n      throw new Error(`Ending node (${goal}) cannot be avoided`);\n    }\n\n    // Add the starting point to the frontier, it will be the first node visited\n    frontier.set(start, 0);\n\n    // Run until we have visited every node in the frontier\n    while (!frontier.isEmpty()) {\n      // Get the node in the frontier with the lowest cost (`priority`)\n      const node = frontier.next();\n\n      // When the node with the lowest cost in the frontier in our goal node,\n      // we can compute the path and exit the loop\n      if (node.key === goal) {\n        // Set the total cost to the current value\n        totalCost = node.priority;\n\n        let nodeKey = node.key;\n        while (previous.has(nodeKey)) {\n          path.push(nodeKey);\n          nodeKey = previous.get(nodeKey);\n        }\n\n        break;\n      }\n\n      // Add the current node to the explored set\n      explored.add(node.key);\n\n      // Loop all the neighboring nodes\n      const neighbors = this.graph.get(node.key) || new Map();\n      neighbors.forEach((nCost, nNode) => {\n        // If we already explored the node, or the node is to be avoided, skip it\n        if (explored.has(nNode) || avoid.includes(nNode)) return null;\n\n        // If the neighboring node is not yet in the frontier, we add it with\n        // the correct cost\n        if (!frontier.has(nNode)) {\n          previous.set(nNode, node.key);\n          return frontier.set(nNode, node.priority + nCost);\n        }\n\n        const frontierPriority = frontier.get(nNode).priority;\n        const nodeCost = node.priority + nCost;\n\n        // Otherwise we only update the cost of this node in the frontier when\n        // it's below what's currently set\n        if (nodeCost < frontierPriority) {\n          previous.set(nNode, node.key);\n          return frontier.set(nNode, nodeCost);\n        }\n\n        return null;\n      });\n    }\n\n    // Return null when no path can be found\n    if (!path.length) {\n      if (options.cost) return { path: null, cost: 0 };\n\n      return null;\n    }\n\n    // From now on, keep in mind that `path` is populated in reverse order,\n    // from destination to origin\n\n    // Remove the first value (the goal node) if we want a trimmed result\n    if (options.trim) {\n      path.shift();\n    } else {\n      // Add the origin waypoint at the end of the array\n      path = path.concat([start]);\n    }\n\n    // Reverse the path if we don't want it reversed, so the result will be\n    // from `start` to `goal`\n    if (!options.reverse) {\n      path = path.reverse();\n    }\n\n    // Return an object if we also want the cost\n    if (options.cost) {\n      return {\n        path,\n        cost: totalCost,\n      };\n    }\n\n    return path;\n  }\n\n  /**\n   * @deprecated since version 2.0, use `Graph#path` instead\n   */\n  shortestPath(...args) {\n    return this.path(...args);\n  }\n\n}\n\nmodule.exports = Graph;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbm9kZS1kaWprc3RyYS9saWJzL0dyYXBoLmpzIiwibWFwcGluZ3MiOiJBQUFBLGNBQWMsbUJBQU8sQ0FBQyxpRkFBaUI7QUFDdkMsMEJBQTBCLG1CQUFPLENBQUMseUZBQXFCO0FBQ3ZELGtCQUFrQixtQkFBTyxDQUFDLHlFQUFhO0FBQ3ZDLHFCQUFxQixtQkFBTyxDQUFDLCtFQUFnQjs7QUFFN0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxXQUFXO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksTUFBTTtBQUNsQixZQUFZLGtCQUFrQjtBQUM5QixNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckIsYUFBYSxZQUFZO0FBQ3pCLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixNQUFNO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixNQUFNO0FBQzdCLHVCQUF1QixNQUFNO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxlQUFlO0FBQzVCLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxZQUFZLFlBQVk7QUFDeEIsWUFBWSxNQUFNO0FBQ2xCLFlBQVksWUFBWTtBQUN4QixNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsVUFBVSxLQUFLLE1BQU0sT0FBTztBQUM1QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFNBQVM7QUFDdEIsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsU0FBUztBQUN0QjtBQUNBLGFBQWEsU0FBUztBQUN0QixhQUFhLFNBQVM7QUFDdEIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0EsY0FBYyxjQUFjO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixNQUFNO0FBQ2hDLDBCQUEwQixrQkFBa0I7QUFDNUMsMEJBQTBCLFlBQVk7QUFDdEMsMEJBQTBCLFlBQVk7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsWUFBWTtBQUN4QztBQUNBO0FBQ0EsNEJBQTRCLGVBQWU7QUFDM0M7QUFDQTtBQUNBLDRCQUE0QixZQUFZO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBLGlDQUFpQzs7QUFFakM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0NBQXdDLE1BQU07QUFDOUMsTUFBTTtBQUNOLHNDQUFzQyxLQUFLO0FBQzNDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0EsaUNBQWlDOztBQUVqQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2l0aHVic3RyZWFtaW5nLy4vbm9kZV9tb2R1bGVzL25vZGUtZGlqa3N0cmEvbGlicy9HcmFwaC5qcz81M2MzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFF1ZXVlID0gcmVxdWlyZSgnLi9Qcmlvcml0eVF1ZXVlJyk7XG5jb25zdCByZW1vdmVEZWVwRnJvbU1hcCA9IHJlcXVpcmUoJy4vcmVtb3ZlRGVlcEZyb21NYXAnKTtcbmNvbnN0IHRvRGVlcE1hcCA9IHJlcXVpcmUoJy4vdG9EZWVwTWFwJyk7XG5jb25zdCB2YWxpZGF0ZURlZXAgPSByZXF1aXJlKCcuL3ZhbGlkYXRlRGVlcCcpO1xuXG4vKiogQ3JlYXRlcyBhbmQgbWFuYWdlcyBhIGdyYXBoICovXG5jbGFzcyBHcmFwaCB7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgR3JhcGgsIG9wdGlvbmFsbHkgaW5pdGlhbGl6aW5nIGl0IGEgbm9kZXMgZ3JhcGggcmVwcmVzZW50YXRpb24uXG4gICAqXG4gICAqIEEgZ3JhcGggcmVwcmVzZW50YXRpb24gaXMgYW4gb2JqZWN0IHRoYXQgaGFzIGFzIGtleXMgdGhlIG5hbWUgb2YgdGhlIHBvaW50IGFuZCBhcyB2YWx1ZXNcbiAgICogdGhlIHBvaW50cyByZWFjaGVhYmxlIGZyb20gdGhhdCBub2RlLCB3aXRoIHRoZSBjb3N0IHRvIGdldCB0aGVyZTpcbiAgICpcbiAgICogICAgIHtcbiAgICogICAgICAgbm9kZSAoTnVtYmVyfFN0cmluZyk6IHtcbiAgICogICAgICAgICBuZWlnaGJvciAoTnVtYmVyfFN0cmluZyk6IGNvc3QgKE51bWJlciksXG4gICAqICAgICAgICAgLi4uLFxuICAgKiAgICAgICB9LFxuICAgKiAgICAgfVxuICAgKlxuICAgKiBJbiBhbHRlcm5hdGl2ZSB0byBhbiBvYmplY3QsIHlvdSBjYW4gcGFzcyBhIGBNYXBgIG9mIGBNYXBgLiBUaGlzIHdpbGxcbiAgICogYWxsb3cgeW91IHRvIHNwZWNpZnkgbnVtYmVycyBhcyBrZXlzLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjfE1hcH0gW2dyYXBoXSAtIEluaXRpYWwgZ3JhcGggZGVmaW5pdGlvblxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBjb25zdCByb3V0ZSA9IG5ldyBHcmFwaCgpO1xuICAgKlxuICAgKiAvLyBQcmUtcG9wdWxhdGVkIGdyYXBoXG4gICAqIGNvbnN0IHJvdXRlID0gbmV3IEdyYXBoKHtcbiAgICogICBBOiB7IEI6IDEgfSxcbiAgICogICBCOiB7IEE6IDEsIEM6IDIsIEQ6IDQgfSxcbiAgICogfSk7XG4gICAqXG4gICAqIC8vIFBhc3NpbmcgYSBNYXBcbiAgICogY29uc3QgZyA9IG5ldyBNYXAoKVxuICAgKlxuICAgKiBjb25zdCBhID0gbmV3IE1hcCgpXG4gICAqIGEuc2V0KCdCJywgMSlcbiAgICpcbiAgICogY29uc3QgYiA9IG5ldyBNYXAoKVxuICAgKiBiLnNldCgnQScsIDEpXG4gICAqIGIuc2V0KCdDJywgMilcbiAgICogYi5zZXQoJ0QnLCA0KVxuICAgKlxuICAgKiBnLnNldCgnQScsIGEpXG4gICAqIGcuc2V0KCdCJywgYilcbiAgICpcbiAgICogY29uc3Qgcm91dGUgPSBuZXcgR3JhcGgoZylcbiAgICovXG4gIGNvbnN0cnVjdG9yKGdyYXBoKSB7XG4gICAgaWYgKGdyYXBoIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICB2YWxpZGF0ZURlZXAoZ3JhcGgpO1xuICAgICAgdGhpcy5ncmFwaCA9IGdyYXBoO1xuICAgIH0gZWxzZSBpZiAoZ3JhcGgpIHtcbiAgICAgIHRoaXMuZ3JhcGggPSB0b0RlZXBNYXAoZ3JhcGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdyYXBoID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbm9kZSB0byB0aGUgZ3JhcGhcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgICAgICAtIE5hbWUgb2YgdGhlIG5vZGVcbiAgICogQHBhcmFtIHtPYmplY3R8TWFwfSBuZWlnaGJvcnMgLSBOZWlnaGJvdXJpbmcgbm9kZXMgYW5kIGNvc3QgdG8gcmVhY2ggdGhlbVxuICAgKiBAcmV0dXJuIHt0aGlzfVxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBjb25zdCByb3V0ZSA9IG5ldyBHcmFwaCgpO1xuICAgKlxuICAgKiByb3V0ZS5hZGROb2RlKCdBJywgeyBCOiAxIH0pO1xuICAgKlxuICAgKiAvLyBJdCdzIHBvc3NpYmxlIHRvIGNoYWluIHRoZSBjYWxsc1xuICAgKiByb3V0ZVxuICAgKiAgIC5hZGROb2RlKCdCJywgeyBBOiAxIH0pXG4gICAqICAgLmFkZE5vZGUoJ0MnLCB7IEE6IDMgfSk7XG4gICAqXG4gICAqIC8vIFRoZSBuZWlnaGJvcnMgY2FuIGJlIGV4cHJlc3NlZCBpbiBhIE1hcFxuICAgKiBjb25zdCBkID0gbmV3IE1hcCgpXG4gICAqIGQuc2V0KCdBJywgMilcbiAgICogZC5zZXQoJ0InLCA4KVxuICAgKlxuICAgKiByb3V0ZS5hZGROb2RlKCdEJywgZClcbiAgICovXG4gIGFkZE5vZGUobmFtZSwgbmVpZ2hib3JzKSB7XG4gICAgbGV0IG5vZGVzO1xuICAgIGlmIChuZWlnaGJvcnMgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgIHZhbGlkYXRlRGVlcChuZWlnaGJvcnMpO1xuICAgICAgbm9kZXMgPSBuZWlnaGJvcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGVzID0gdG9EZWVwTWFwKG5laWdoYm9ycyk7XG4gICAgfVxuXG4gICAgdGhpcy5ncmFwaC5zZXQobmFtZSwgbm9kZXMpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgc2luY2UgdmVyc2lvbiAyLjAsIHVzZSBgR3JhcGgjYWRkTm9kZWAgaW5zdGVhZFxuICAgKi9cbiAgYWRkVmVydGV4KG5hbWUsIG5laWdoYm9ycykge1xuICAgIHJldHVybiB0aGlzLmFkZE5vZGUobmFtZSwgbmVpZ2hib3JzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgbm9kZSBhbmQgYWxsIG9mIGl0cyByZWZlcmVuY2VzIGZyb20gdGhlIGdyYXBoXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0ga2V5IC0gS2V5IG9mIHRoZSBub2RlIHRvIHJlbW92ZSBmcm9tIHRoZSBncmFwaFxuICAgKiBAcmV0dXJuIHt0aGlzfVxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBjb25zdCByb3V0ZSA9IG5ldyBHcmFwaCh7XG4gICAqICAgQTogeyBCOiAxLCBDOiA1IH0sXG4gICAqICAgQjogeyBBOiAzIH0sXG4gICAqICAgQzogeyBCOiAyLCBBOiAyIH0sXG4gICAqIH0pO1xuICAgKlxuICAgKiByb3V0ZS5yZW1vdmVOb2RlKCdDJyk7XG4gICAqIC8vIFRoZSBncmFwaCBub3cgaXM6XG4gICAqIC8vIHsgQTogeyBCOiAxIH0sIEI6IHsgQTogMyB9IH1cbiAgICovXG4gIHJlbW92ZU5vZGUoa2V5KSB7XG4gICAgdGhpcy5ncmFwaCA9IHJlbW92ZURlZXBGcm9tTWFwKHRoaXMuZ3JhcGgsIGtleSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wdXRlIHRoZSBzaG9ydGVzdCBwYXRoIGJldHdlZW4gdGhlIHNwZWNpZmllZCBub2Rlc1xuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gIHN0YXJ0ICAgICAtIFN0YXJ0aW5nIG5vZGVcbiAgICogQHBhcmFtIHtzdHJpbmd9ICBnb2FsICAgICAgLSBOb2RlIHdlIHdhbnQgdG8gcmVhY2hcbiAgICogQHBhcmFtIHtvYmplY3R9ICBbb3B0aW9uc10gLSBPcHRpb25zXG4gICAqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudHJpbV0gICAgLSBFeGNsdWRlIHRoZSBvcmlnaW4gYW5kIGRlc3RpbmF0aW9uIG5vZGVzIGZyb20gdGhlIHJlc3VsdFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnJldmVyc2VdIC0gUmV0dXJuIHRoZSBwYXRoIGluIHJldmVyc2VkIG9yZGVyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuY29zdF0gICAgLSBBbHNvIHJldHVybiB0aGUgY29zdCBvZiB0aGUgcGF0aCB3aGVuIHNldCB0byB0cnVlXG4gICAqXG4gICAqIEByZXR1cm4ge2FycmF5fG9iamVjdH0gQ29tcHV0ZWQgcGF0aCBiZXR3ZWVuIHRoZSBub2Rlcy5cbiAgICpcbiAgICogIFdoZW4gYG9wdGlvbi5jb3N0YCBpcyBzZXQgdG8gdHJ1ZSwgdGhlIHJldHVybmVkIHZhbHVlIHdpbGwgYmUgYW4gb2JqZWN0IHdpdGggc2hhcGU6XG4gICAqICAgIC0gYHBhdGhgICooQXJyYXkpKjogQ29tcHV0ZWQgcGF0aCBiZXR3ZWVuIHRoZSBub2Rlc1xuICAgKiAgICAtIGBjb3N0YCAqKE51bWJlcikqOiBDb3N0IG9mIHRoZSBwYXRoXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIGNvbnN0IHJvdXRlID0gbmV3IEdyYXBoKClcbiAgICpcbiAgICogcm91dGUuYWRkTm9kZSgnQScsIHsgQjogMSB9KVxuICAgKiByb3V0ZS5hZGROb2RlKCdCJywgeyBBOiAxLCBDOiAyLCBEOiA0IH0pXG4gICAqIHJvdXRlLmFkZE5vZGUoJ0MnLCB7IEI6IDIsIEQ6IDEgfSlcbiAgICogcm91dGUuYWRkTm9kZSgnRCcsIHsgQzogMSwgQjogNCB9KVxuICAgKlxuICAgKiByb3V0ZS5wYXRoKCdBJywgJ0QnKSAvLyA9PiBbJ0EnLCAnQicsICdDJywgJ0QnXVxuICAgKlxuICAgKiAvLyB0cmltbWVkXG4gICAqIHJvdXRlLnBhdGgoJ0EnLCAnRCcsIHsgdHJpbTogdHJ1ZSB9KSAvLyA9PiBbQicsICdDJ11cbiAgICpcbiAgICogLy8gcmV2ZXJzZWRcbiAgICogcm91dGUucGF0aCgnQScsICdEJywgeyByZXZlcnNlOiB0cnVlIH0pIC8vID0+IFsnRCcsICdDJywgJ0InLCAnQSddXG4gICAqXG4gICAqIC8vIGluY2x1ZGUgdGhlIGNvc3RcbiAgICogcm91dGUucGF0aCgnQScsICdEJywgeyBjb3N0OiB0cnVlIH0pXG4gICAqIC8vID0+IHtcbiAgICogLy8gICAgICAgcGF0aDogWyAnQScsICdCJywgJ0MnLCAnRCcgXSxcbiAgICogLy8gICAgICAgY29zdDogNFxuICAgKiAvLyAgICB9XG4gICAqL1xuICBwYXRoKHN0YXJ0LCBnb2FsLCBvcHRpb25zID0ge30pIHtcbiAgICAvLyBEb24ndCBydW4gd2hlbiB3ZSBkb24ndCBoYXZlIG5vZGVzIHNldFxuICAgIGlmICghdGhpcy5ncmFwaC5zaXplKSB7XG4gICAgICBpZiAob3B0aW9ucy5jb3N0KSByZXR1cm4geyBwYXRoOiBudWxsLCBjb3N0OiAwIH07XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGV4cGxvcmVkID0gbmV3IFNldCgpO1xuICAgIGNvbnN0IGZyb250aWVyID0gbmV3IFF1ZXVlKCk7XG4gICAgY29uc3QgcHJldmlvdXMgPSBuZXcgTWFwKCk7XG5cbiAgICBsZXQgcGF0aCA9IFtdO1xuICAgIGxldCB0b3RhbENvc3QgPSAwO1xuXG4gICAgbGV0IGF2b2lkID0gW107XG4gICAgaWYgKG9wdGlvbnMuYXZvaWQpIGF2b2lkID0gW10uY29uY2F0KG9wdGlvbnMuYXZvaWQpO1xuXG4gICAgaWYgKGF2b2lkLmluY2x1ZGVzKHN0YXJ0KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBTdGFydGluZyBub2RlICgke3N0YXJ0fSkgY2Fubm90IGJlIGF2b2lkZWRgKTtcbiAgICB9IGVsc2UgaWYgKGF2b2lkLmluY2x1ZGVzKGdvYWwpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEVuZGluZyBub2RlICgke2dvYWx9KSBjYW5ub3QgYmUgYXZvaWRlZGApO1xuICAgIH1cblxuICAgIC8vIEFkZCB0aGUgc3RhcnRpbmcgcG9pbnQgdG8gdGhlIGZyb250aWVyLCBpdCB3aWxsIGJlIHRoZSBmaXJzdCBub2RlIHZpc2l0ZWRcbiAgICBmcm9udGllci5zZXQoc3RhcnQsIDApO1xuXG4gICAgLy8gUnVuIHVudGlsIHdlIGhhdmUgdmlzaXRlZCBldmVyeSBub2RlIGluIHRoZSBmcm9udGllclxuICAgIHdoaWxlICghZnJvbnRpZXIuaXNFbXB0eSgpKSB7XG4gICAgICAvLyBHZXQgdGhlIG5vZGUgaW4gdGhlIGZyb250aWVyIHdpdGggdGhlIGxvd2VzdCBjb3N0IChgcHJpb3JpdHlgKVxuICAgICAgY29uc3Qgbm9kZSA9IGZyb250aWVyLm5leHQoKTtcblxuICAgICAgLy8gV2hlbiB0aGUgbm9kZSB3aXRoIHRoZSBsb3dlc3QgY29zdCBpbiB0aGUgZnJvbnRpZXIgaW4gb3VyIGdvYWwgbm9kZSxcbiAgICAgIC8vIHdlIGNhbiBjb21wdXRlIHRoZSBwYXRoIGFuZCBleGl0IHRoZSBsb29wXG4gICAgICBpZiAobm9kZS5rZXkgPT09IGdvYWwpIHtcbiAgICAgICAgLy8gU2V0IHRoZSB0b3RhbCBjb3N0IHRvIHRoZSBjdXJyZW50IHZhbHVlXG4gICAgICAgIHRvdGFsQ29zdCA9IG5vZGUucHJpb3JpdHk7XG5cbiAgICAgICAgbGV0IG5vZGVLZXkgPSBub2RlLmtleTtcbiAgICAgICAgd2hpbGUgKHByZXZpb3VzLmhhcyhub2RlS2V5KSkge1xuICAgICAgICAgIHBhdGgucHVzaChub2RlS2V5KTtcbiAgICAgICAgICBub2RlS2V5ID0gcHJldmlvdXMuZ2V0KG5vZGVLZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCB0aGUgY3VycmVudCBub2RlIHRvIHRoZSBleHBsb3JlZCBzZXRcbiAgICAgIGV4cGxvcmVkLmFkZChub2RlLmtleSk7XG5cbiAgICAgIC8vIExvb3AgYWxsIHRoZSBuZWlnaGJvcmluZyBub2Rlc1xuICAgICAgY29uc3QgbmVpZ2hib3JzID0gdGhpcy5ncmFwaC5nZXQobm9kZS5rZXkpIHx8IG5ldyBNYXAoKTtcbiAgICAgIG5laWdoYm9ycy5mb3JFYWNoKChuQ29zdCwgbk5vZGUpID0+IHtcbiAgICAgICAgLy8gSWYgd2UgYWxyZWFkeSBleHBsb3JlZCB0aGUgbm9kZSwgb3IgdGhlIG5vZGUgaXMgdG8gYmUgYXZvaWRlZCwgc2tpcCBpdFxuICAgICAgICBpZiAoZXhwbG9yZWQuaGFzKG5Ob2RlKSB8fCBhdm9pZC5pbmNsdWRlcyhuTm9kZSkpIHJldHVybiBudWxsO1xuXG4gICAgICAgIC8vIElmIHRoZSBuZWlnaGJvcmluZyBub2RlIGlzIG5vdCB5ZXQgaW4gdGhlIGZyb250aWVyLCB3ZSBhZGQgaXQgd2l0aFxuICAgICAgICAvLyB0aGUgY29ycmVjdCBjb3N0XG4gICAgICAgIGlmICghZnJvbnRpZXIuaGFzKG5Ob2RlKSkge1xuICAgICAgICAgIHByZXZpb3VzLnNldChuTm9kZSwgbm9kZS5rZXkpO1xuICAgICAgICAgIHJldHVybiBmcm9udGllci5zZXQobk5vZGUsIG5vZGUucHJpb3JpdHkgKyBuQ29zdCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmcm9udGllclByaW9yaXR5ID0gZnJvbnRpZXIuZ2V0KG5Ob2RlKS5wcmlvcml0eTtcbiAgICAgICAgY29uc3Qgbm9kZUNvc3QgPSBub2RlLnByaW9yaXR5ICsgbkNvc3Q7XG5cbiAgICAgICAgLy8gT3RoZXJ3aXNlIHdlIG9ubHkgdXBkYXRlIHRoZSBjb3N0IG9mIHRoaXMgbm9kZSBpbiB0aGUgZnJvbnRpZXIgd2hlblxuICAgICAgICAvLyBpdCdzIGJlbG93IHdoYXQncyBjdXJyZW50bHkgc2V0XG4gICAgICAgIGlmIChub2RlQ29zdCA8IGZyb250aWVyUHJpb3JpdHkpIHtcbiAgICAgICAgICBwcmV2aW91cy5zZXQobk5vZGUsIG5vZGUua2V5KTtcbiAgICAgICAgICByZXR1cm4gZnJvbnRpZXIuc2V0KG5Ob2RlLCBub2RlQ29zdCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFJldHVybiBudWxsIHdoZW4gbm8gcGF0aCBjYW4gYmUgZm91bmRcbiAgICBpZiAoIXBhdGgubGVuZ3RoKSB7XG4gICAgICBpZiAob3B0aW9ucy5jb3N0KSByZXR1cm4geyBwYXRoOiBudWxsLCBjb3N0OiAwIH07XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIEZyb20gbm93IG9uLCBrZWVwIGluIG1pbmQgdGhhdCBgcGF0aGAgaXMgcG9wdWxhdGVkIGluIHJldmVyc2Ugb3JkZXIsXG4gICAgLy8gZnJvbSBkZXN0aW5hdGlvbiB0byBvcmlnaW5cblxuICAgIC8vIFJlbW92ZSB0aGUgZmlyc3QgdmFsdWUgKHRoZSBnb2FsIG5vZGUpIGlmIHdlIHdhbnQgYSB0cmltbWVkIHJlc3VsdFxuICAgIGlmIChvcHRpb25zLnRyaW0pIHtcbiAgICAgIHBhdGguc2hpZnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQWRkIHRoZSBvcmlnaW4gd2F5cG9pbnQgYXQgdGhlIGVuZCBvZiB0aGUgYXJyYXlcbiAgICAgIHBhdGggPSBwYXRoLmNvbmNhdChbc3RhcnRdKTtcbiAgICB9XG5cbiAgICAvLyBSZXZlcnNlIHRoZSBwYXRoIGlmIHdlIGRvbid0IHdhbnQgaXQgcmV2ZXJzZWQsIHNvIHRoZSByZXN1bHQgd2lsbCBiZVxuICAgIC8vIGZyb20gYHN0YXJ0YCB0byBgZ29hbGBcbiAgICBpZiAoIW9wdGlvbnMucmV2ZXJzZSkge1xuICAgICAgcGF0aCA9IHBhdGgucmV2ZXJzZSgpO1xuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBvYmplY3QgaWYgd2UgYWxzbyB3YW50IHRoZSBjb3N0XG4gICAgaWYgKG9wdGlvbnMuY29zdCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGF0aCxcbiAgICAgICAgY29zdDogdG90YWxDb3N0LFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2ZXJzaW9uIDIuMCwgdXNlIGBHcmFwaCNwYXRoYCBpbnN0ZWFkXG4gICAqL1xuICBzaG9ydGVzdFBhdGgoLi4uYXJncykge1xuICAgIHJldHVybiB0aGlzLnBhdGgoLi4uYXJncyk7XG4gIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdyYXBoO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/node-dijkstra/libs/Graph.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/node-dijkstra/libs/PriorityQueue.js":
/*!**********************************************************!*\
  !*** ./node_modules/node-dijkstra/libs/PriorityQueue.js ***!
  \**********************************************************/
/***/ ((module) => {

eval("/**\n * This very basic implementation of a priority queue is used to select the\n * next node of the graph to walk to.\n *\n * The queue is always sorted to have the least expensive node on top.\n * Some helper methods are also implemented.\n *\n * You should **never** modify the queue directly, but only using the methods\n * provided by the class.\n */\nclass PriorityQueue {\n\n  /**\n   * Creates a new empty priority queue\n   */\n  constructor() {\n    // The `keys` set is used to greatly improve the speed at which we can\n    // check the presence of a value in the queue\n    this.keys = new Set();\n    this.queue = [];\n  }\n\n  /**\n   * Sort the queue to have the least expensive node to visit on top\n   *\n   * @private\n   */\n  sort() {\n    this.queue.sort((a, b) => a.priority - b.priority);\n  }\n\n  /**\n   * Sets a priority for a key in the queue.\n   * Inserts it in the queue if it does not already exists.\n   *\n   * @param {any}     key       Key to update or insert\n   * @param {number}  value     Priority of the key\n   * @return {number} Size of the queue\n   */\n  set(key, value) {\n    const priority = Number(value);\n    if (isNaN(priority)) throw new TypeError('\"priority\" must be a number');\n\n    if (!this.keys.has(key)) {\n      // Insert a new entry if the key is not already in the queue\n      this.keys.add(key);\n      this.queue.push({ key, priority });\n    } else {\n      // Update the priority of an existing key\n      this.queue.map((element) => {\n        if (element.key === key) {\n          Object.assign(element, { priority });\n        }\n\n        return element;\n      });\n    }\n\n    this.sort();\n    return this.queue.length;\n  }\n\n  /**\n   * The next method is used to dequeue a key:\n   * It removes the first element from the queue and returns it\n   *\n   * @return {object} First priority queue entry\n   */\n  next() {\n    const element = this.queue.shift();\n\n    // Remove the key from the `_keys` set\n    this.keys.delete(element.key);\n\n    return element;\n  }\n\n  /**\n   * @return {boolean} `true` when the queue is empty\n   */\n  isEmpty() {\n    return Boolean(this.queue.length === 0);\n  }\n\n  /**\n   * Check if the queue has a key in it\n   *\n   * @param {any} key   Key to lookup\n   * @return {boolean}\n   */\n  has(key) {\n    return this.keys.has(key);\n  }\n\n  /**\n   * Get the element in the queue with the specified key\n   *\n   * @param {any} key   Key to lookup\n   * @return {object}\n   */\n  get(key) {\n    return this.queue.find(element => element.key === key);\n  }\n\n}\n\nmodule.exports = PriorityQueue;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbm9kZS1kaWprc3RyYS9saWJzL1ByaW9yaXR5UXVldWUuanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QixhQUFhLFNBQVM7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixlQUFlO0FBQ3ZDLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsVUFBVTtBQUM3Qzs7QUFFQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGNBQWMsU0FBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLEtBQUs7QUFDbEIsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsS0FBSztBQUNsQixjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9naXRodWJzdHJlYW1pbmcvLi9ub2RlX21vZHVsZXMvbm9kZS1kaWprc3RyYS9saWJzL1ByaW9yaXR5UXVldWUuanM/NmJmMyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRoaXMgdmVyeSBiYXNpYyBpbXBsZW1lbnRhdGlvbiBvZiBhIHByaW9yaXR5IHF1ZXVlIGlzIHVzZWQgdG8gc2VsZWN0IHRoZVxuICogbmV4dCBub2RlIG9mIHRoZSBncmFwaCB0byB3YWxrIHRvLlxuICpcbiAqIFRoZSBxdWV1ZSBpcyBhbHdheXMgc29ydGVkIHRvIGhhdmUgdGhlIGxlYXN0IGV4cGVuc2l2ZSBub2RlIG9uIHRvcC5cbiAqIFNvbWUgaGVscGVyIG1ldGhvZHMgYXJlIGFsc28gaW1wbGVtZW50ZWQuXG4gKlxuICogWW91IHNob3VsZCAqKm5ldmVyKiogbW9kaWZ5IHRoZSBxdWV1ZSBkaXJlY3RseSwgYnV0IG9ubHkgdXNpbmcgdGhlIG1ldGhvZHNcbiAqIHByb3ZpZGVkIGJ5IHRoZSBjbGFzcy5cbiAqL1xuY2xhc3MgUHJpb3JpdHlRdWV1ZSB7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgZW1wdHkgcHJpb3JpdHkgcXVldWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIFRoZSBga2V5c2Agc2V0IGlzIHVzZWQgdG8gZ3JlYXRseSBpbXByb3ZlIHRoZSBzcGVlZCBhdCB3aGljaCB3ZSBjYW5cbiAgICAvLyBjaGVjayB0aGUgcHJlc2VuY2Ugb2YgYSB2YWx1ZSBpbiB0aGUgcXVldWVcbiAgICB0aGlzLmtleXMgPSBuZXcgU2V0KCk7XG4gICAgdGhpcy5xdWV1ZSA9IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIFNvcnQgdGhlIHF1ZXVlIHRvIGhhdmUgdGhlIGxlYXN0IGV4cGVuc2l2ZSBub2RlIHRvIHZpc2l0IG9uIHRvcFxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc29ydCgpIHtcbiAgICB0aGlzLnF1ZXVlLnNvcnQoKGEsIGIpID0+IGEucHJpb3JpdHkgLSBiLnByaW9yaXR5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGEgcHJpb3JpdHkgZm9yIGEga2V5IGluIHRoZSBxdWV1ZS5cbiAgICogSW5zZXJ0cyBpdCBpbiB0aGUgcXVldWUgaWYgaXQgZG9lcyBub3QgYWxyZWFkeSBleGlzdHMuXG4gICAqXG4gICAqIEBwYXJhbSB7YW55fSAgICAga2V5ICAgICAgIEtleSB0byB1cGRhdGUgb3IgaW5zZXJ0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSAgdmFsdWUgICAgIFByaW9yaXR5IG9mIHRoZSBrZXlcbiAgICogQHJldHVybiB7bnVtYmVyfSBTaXplIG9mIHRoZSBxdWV1ZVxuICAgKi9cbiAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICBjb25zdCBwcmlvcml0eSA9IE51bWJlcih2YWx1ZSk7XG4gICAgaWYgKGlzTmFOKHByaW9yaXR5KSkgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJwcmlvcml0eVwiIG11c3QgYmUgYSBudW1iZXInKTtcblxuICAgIGlmICghdGhpcy5rZXlzLmhhcyhrZXkpKSB7XG4gICAgICAvLyBJbnNlcnQgYSBuZXcgZW50cnkgaWYgdGhlIGtleSBpcyBub3QgYWxyZWFkeSBpbiB0aGUgcXVldWVcbiAgICAgIHRoaXMua2V5cy5hZGQoa2V5KTtcbiAgICAgIHRoaXMucXVldWUucHVzaCh7IGtleSwgcHJpb3JpdHkgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFVwZGF0ZSB0aGUgcHJpb3JpdHkgb2YgYW4gZXhpc3Rpbmcga2V5XG4gICAgICB0aGlzLnF1ZXVlLm1hcCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBpZiAoZWxlbWVudC5rZXkgPT09IGtleSkge1xuICAgICAgICAgIE9iamVjdC5hc3NpZ24oZWxlbWVudCwgeyBwcmlvcml0eSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5zb3J0KCk7XG4gICAgcmV0dXJuIHRoaXMucXVldWUubGVuZ3RoO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBuZXh0IG1ldGhvZCBpcyB1c2VkIHRvIGRlcXVldWUgYSBrZXk6XG4gICAqIEl0IHJlbW92ZXMgdGhlIGZpcnN0IGVsZW1lbnQgZnJvbSB0aGUgcXVldWUgYW5kIHJldHVybnMgaXRcbiAgICpcbiAgICogQHJldHVybiB7b2JqZWN0fSBGaXJzdCBwcmlvcml0eSBxdWV1ZSBlbnRyeVxuICAgKi9cbiAgbmV4dCgpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5xdWV1ZS5zaGlmdCgpO1xuXG4gICAgLy8gUmVtb3ZlIHRoZSBrZXkgZnJvbSB0aGUgYF9rZXlzYCBzZXRcbiAgICB0aGlzLmtleXMuZGVsZXRlKGVsZW1lbnQua2V5KTtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IGB0cnVlYCB3aGVuIHRoZSBxdWV1ZSBpcyBlbXB0eVxuICAgKi9cbiAgaXNFbXB0eSgpIHtcbiAgICByZXR1cm4gQm9vbGVhbih0aGlzLnF1ZXVlLmxlbmd0aCA9PT0gMCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIHF1ZXVlIGhhcyBhIGtleSBpbiBpdFxuICAgKlxuICAgKiBAcGFyYW0ge2FueX0ga2V5ICAgS2V5IHRvIGxvb2t1cFxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaGFzKGtleSkge1xuICAgIHJldHVybiB0aGlzLmtleXMuaGFzKGtleSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBlbGVtZW50IGluIHRoZSBxdWV1ZSB3aXRoIHRoZSBzcGVjaWZpZWQga2V5XG4gICAqXG4gICAqIEBwYXJhbSB7YW55fSBrZXkgICBLZXkgdG8gbG9va3VwXG4gICAqIEByZXR1cm4ge29iamVjdH1cbiAgICovXG4gIGdldChrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5xdWV1ZS5maW5kKGVsZW1lbnQgPT4gZWxlbWVudC5rZXkgPT09IGtleSk7XG4gIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFByaW9yaXR5UXVldWU7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/node-dijkstra/libs/PriorityQueue.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/node-dijkstra/libs/removeDeepFromMap.js":
/*!**************************************************************!*\
  !*** ./node_modules/node-dijkstra/libs/removeDeepFromMap.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("/**\n * Removes a key and all of its references from a map.\n * This function has no side-effects as it returns\n * a brand new map.\n *\n * @param {Map}     map - Map to remove the key from\n * @param {string}  key - Key to remove from the map\n * @return {Map}    New map without the passed key\n */\nfunction removeDeepFromMap(map, key) {\n  const newMap = new Map();\n\n  for (const [aKey, val] of map) {\n    if (aKey !== key && val instanceof Map) {\n      newMap.set(aKey, removeDeepFromMap(val, key));\n    } else if (aKey !== key) {\n      newMap.set(aKey, val);\n    }\n  }\n\n  return newMap;\n}\n\nmodule.exports = removeDeepFromMap;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbm9kZS1kaWprc3RyYS9saWJzL3JlbW92ZURlZXBGcm9tTWFwLmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsV0FBVyxTQUFTO0FBQ3BCLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2l0aHVic3RyZWFtaW5nLy4vbm9kZV9tb2R1bGVzL25vZGUtZGlqa3N0cmEvbGlicy9yZW1vdmVEZWVwRnJvbU1hcC5qcz8wZDJmIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUmVtb3ZlcyBhIGtleSBhbmQgYWxsIG9mIGl0cyByZWZlcmVuY2VzIGZyb20gYSBtYXAuXG4gKiBUaGlzIGZ1bmN0aW9uIGhhcyBubyBzaWRlLWVmZmVjdHMgYXMgaXQgcmV0dXJuc1xuICogYSBicmFuZCBuZXcgbWFwLlxuICpcbiAqIEBwYXJhbSB7TWFwfSAgICAgbWFwIC0gTWFwIHRvIHJlbW92ZSB0aGUga2V5IGZyb21cbiAqIEBwYXJhbSB7c3RyaW5nfSAga2V5IC0gS2V5IHRvIHJlbW92ZSBmcm9tIHRoZSBtYXBcbiAqIEByZXR1cm4ge01hcH0gICAgTmV3IG1hcCB3aXRob3V0IHRoZSBwYXNzZWQga2V5XG4gKi9cbmZ1bmN0aW9uIHJlbW92ZURlZXBGcm9tTWFwKG1hcCwga2V5KSB7XG4gIGNvbnN0IG5ld01hcCA9IG5ldyBNYXAoKTtcblxuICBmb3IgKGNvbnN0IFthS2V5LCB2YWxdIG9mIG1hcCkge1xuICAgIGlmIChhS2V5ICE9PSBrZXkgJiYgdmFsIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICBuZXdNYXAuc2V0KGFLZXksIHJlbW92ZURlZXBGcm9tTWFwKHZhbCwga2V5KSk7XG4gICAgfSBlbHNlIGlmIChhS2V5ICE9PSBrZXkpIHtcbiAgICAgIG5ld01hcC5zZXQoYUtleSwgdmFsKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3TWFwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlbW92ZURlZXBGcm9tTWFwO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/node-dijkstra/libs/removeDeepFromMap.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/node-dijkstra/libs/toDeepMap.js":
/*!******************************************************!*\
  !*** ./node_modules/node-dijkstra/libs/toDeepMap.js ***!
  \******************************************************/
/***/ ((module) => {

eval("/**\n * Validates a cost for a node\n *\n * @private\n * @param {number} val - Cost to validate\n * @return {bool}\n */\nfunction isValidNode(val) {\n  const cost = Number(val);\n\n  if (isNaN(cost) || cost <= 0) {\n    return false;\n  }\n\n  return true;\n}\n\n/**\n * Creates a deep `Map` from the passed object.\n *\n * @param  {Object} source - Object to populate the map with\n * @return {Map} New map with the passed object data\n */\nfunction toDeepMap(source) {\n  const map = new Map();\n  const keys = Object.keys(source);\n\n  keys.forEach((key) => {\n    const val = source[key];\n\n    if (val !== null && typeof val === 'object' && !Array.isArray(val)) {\n      return map.set(key, toDeepMap(val));\n    }\n\n    if (!isValidNode(val)) {\n      throw new Error(`Could not add node at key \"${key}\", make sure it's a valid node`, val);\n    }\n\n    return map.set(key, Number(val));\n  });\n\n  return map;\n}\n\nmodule.exports = toDeepMap;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbm9kZS1kaWprc3RyYS9saWJzL3RvRGVlcE1hcC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQixZQUFZLEtBQUs7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvREFBb0QsSUFBSTtBQUN4RDs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL2dpdGh1YnN0cmVhbWluZy8uL25vZGVfbW9kdWxlcy9ub2RlLWRpamtzdHJhL2xpYnMvdG9EZWVwTWFwLmpzPzY4OTQiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBWYWxpZGF0ZXMgYSBjb3N0IGZvciBhIG5vZGVcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IHZhbCAtIENvc3QgdG8gdmFsaWRhdGVcbiAqIEByZXR1cm4ge2Jvb2x9XG4gKi9cbmZ1bmN0aW9uIGlzVmFsaWROb2RlKHZhbCkge1xuICBjb25zdCBjb3N0ID0gTnVtYmVyKHZhbCk7XG5cbiAgaWYgKGlzTmFOKGNvc3QpIHx8IGNvc3QgPD0gMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBkZWVwIGBNYXBgIGZyb20gdGhlIHBhc3NlZCBvYmplY3QuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBzb3VyY2UgLSBPYmplY3QgdG8gcG9wdWxhdGUgdGhlIG1hcCB3aXRoXG4gKiBAcmV0dXJuIHtNYXB9IE5ldyBtYXAgd2l0aCB0aGUgcGFzc2VkIG9iamVjdCBkYXRhXG4gKi9cbmZ1bmN0aW9uIHRvRGVlcE1hcChzb3VyY2UpIHtcbiAgY29uc3QgbWFwID0gbmV3IE1hcCgpO1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcblxuICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGNvbnN0IHZhbCA9IHNvdXJjZVtrZXldO1xuXG4gICAgaWYgKHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICByZXR1cm4gbWFwLnNldChrZXksIHRvRGVlcE1hcCh2YWwpKTtcbiAgICB9XG5cbiAgICBpZiAoIWlzVmFsaWROb2RlKHZhbCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGFkZCBub2RlIGF0IGtleSBcIiR7a2V5fVwiLCBtYWtlIHN1cmUgaXQncyBhIHZhbGlkIG5vZGVgLCB2YWwpO1xuICAgIH1cblxuICAgIHJldHVybiBtYXAuc2V0KGtleSwgTnVtYmVyKHZhbCkpO1xuICB9KTtcblxuICByZXR1cm4gbWFwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvRGVlcE1hcDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/node-dijkstra/libs/toDeepMap.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/node-dijkstra/libs/validateDeep.js":
/*!*********************************************************!*\
  !*** ./node_modules/node-dijkstra/libs/validateDeep.js ***!
  \*********************************************************/
/***/ ((module) => {

eval("/**\n * Validate a map to ensure all it's values are either a number or a map\n *\n * @param {Map} map - Map to valiadte\n */\nfunction validateDeep(map) {\n  if (!(map instanceof Map)) {\n    throw new Error(`Invalid graph: Expected Map instead found ${typeof map}`);\n  }\n\n  map.forEach((value, key) => {\n    if (typeof value === 'object' && value instanceof Map) {\n      validateDeep(value);\n      return;\n    }\n\n    if (typeof value !== 'number' || value <= 0) {\n      throw new Error(`Values must be numbers greater than 0. Found value ${value} at ${key}`);\n    }\n  });\n}\n\nmodule.exports = validateDeep;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbm9kZS1kaWprc3RyYS9saWJzL3ZhbGlkYXRlRGVlcC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEtBQUs7QUFDaEI7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFLFdBQVc7QUFDNUU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRFQUE0RSxPQUFPLEtBQUssSUFBSTtBQUM1RjtBQUNBLEdBQUc7QUFDSDs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL2dpdGh1YnN0cmVhbWluZy8uL25vZGVfbW9kdWxlcy9ub2RlLWRpamtzdHJhL2xpYnMvdmFsaWRhdGVEZWVwLmpzP2JlZDIiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBWYWxpZGF0ZSBhIG1hcCB0byBlbnN1cmUgYWxsIGl0J3MgdmFsdWVzIGFyZSBlaXRoZXIgYSBudW1iZXIgb3IgYSBtYXBcbiAqXG4gKiBAcGFyYW0ge01hcH0gbWFwIC0gTWFwIHRvIHZhbGlhZHRlXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlRGVlcChtYXApIHtcbiAgaWYgKCEobWFwIGluc3RhbmNlb2YgTWFwKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBncmFwaDogRXhwZWN0ZWQgTWFwIGluc3RlYWQgZm91bmQgJHt0eXBlb2YgbWFwfWApO1xuICB9XG5cbiAgbWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgdmFsaWRhdGVEZWVwKHZhbHVlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJyB8fCB2YWx1ZSA8PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFZhbHVlcyBtdXN0IGJlIG51bWJlcnMgZ3JlYXRlciB0aGFuIDAuIEZvdW5kIHZhbHVlICR7dmFsdWV9IGF0ICR7a2V5fWApO1xuICAgIH1cbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdmFsaWRhdGVEZWVwO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/node-dijkstra/libs/validateDeep.js\n");

/***/ })

};
;