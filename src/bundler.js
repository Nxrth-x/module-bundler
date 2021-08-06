import './types.js'

/**
 * Generates a bundled version of a given module
 *
 * @param {AssetType[]} graph
 * @returns {string} Bundled package
 */
export default function generateBundle(graph) {
  let modules = ''

  graph.forEach(mod => {
    modules += `"${mod.id}": [
      function(require, module, exports) {
        ${mod.code}
      },
      ${JSON.stringify(mod.mapping)}
    ],`
  })

  const result = `
    (function (mapping) {
      function require(id) {
        var mod = mapping[id];
        var fn = mod[0], map = mod[1];
        
        function localRequire(relativePath) {
          return require(map[relativePath]);
        }

        var module = {
          exports: {},
        };

        fn(localRequire, module, module.exports);

        return module.exports;
      }
      require(Object.keys(mapping)[0]);
    })({ ${modules} });
  `

  return result.replace(/  |\r\n|\n|\r/gm, '')
}
