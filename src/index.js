import fs from 'fs'
import generateDependenciesGraph from './package-assets.js'
import generateBundle from './bundler.js'
import { v4 as uuid } from 'uuid'

/**
 * Generates a bundled JS package
 *
 * @param {string[]} args CLI arguments
 */
function bundlePackageWithCLIArguments(args) {
  const filePath = args[2] ? args[2] : generateFilename()
  const graph = generateDependenciesGraph('example/entry.js')
  const bundledPackage = generateBundle(graph)

  saveBundledPackage(bundledPackage, filePath)
}

function generateFilename() {
  const uuidFilename = uuid()

  return `${uuidFilename}.js`
}

function saveBundledPackage(bundledPackage, filePath) {
  if (!fs.existsSync('./dist')) {
    fs.mkdirSync('./dist')
  }

  fs.writeFileSync(`./dist/${filePath}`, bundledPackage)
}

bundlePackageWithCLIArguments(process.argv)
