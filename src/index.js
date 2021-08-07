import fs from 'fs'
import { v4 as uuid } from 'uuid'
import generateBundle from './bundler.js'
import generateDependenciesGraph from './package-assets.js'
import * as FeedbackMessages from './helpers/feedback-messages.js'

/**
 * Generates a bundled Javascript package
 *
 * @param {string[]} args CLI arguments
 */
function bundlePackageWithCLIArguments(args) {
  const [entryPointFile, userOutputFile] = args.slice(2)

  if (!entryPointFile) {
    FeedbackMessages.entryPointFileNotSuppliedError()
    return
  }

  try {
    const filePath = userOutputFile ? userOutputFile : generateFilename()
    const graph = generateDependenciesGraph(entryPointFile)
    const bundledPackage = generateBundle(graph)
    saveBundledPackage(bundledPackage, filePath)
  } catch (error) {
    FeedbackMessages.entryPointFileDoesNotExistError(entryPointFile, error)
  }
}

/**
 * Generates a random string to be used as a filename
 *
 * @returns {string} A random UUID string to be used as the filename
 */
function generateFilename() {
  const [uuidFilename] = uuid().split('-')

  return `${uuidFilename}.js`
}

/**
 * Saves the bundled package to a `dist` folder
 *
 * @param {string} bundledPackage Bundled package code
 * @param {string} filePath Path to save the file
 */
function saveBundledPackage(bundledPackage, filePath) {
  if (!fs.existsSync('./dist')) {
    fs.mkdirSync('./dist')
  }

  fs.writeFileSync(`./dist/${filePath}`, bundledPackage)
  FeedbackMessages.bundleSavedSuccessfullyLog(filePath)
}

bundlePackageWithCLIArguments(process.argv)
