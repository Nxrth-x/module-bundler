import { customLog } from './colors.js'

/**
 * Prints the error and instructions to `stdout`
 */
export const entryPointFileNotSuppliedError = () => {
  customLog('[ERROR]', 'BG_RED', 'BLACK')
  console.error(`You need to provide an entry point file 📂\n`)
  customLog('[USAGE]', 'BG_GREEN', 'BLACK')
  console.log(`$ yarn build entryPoint.js [outputFile]\n`)
}

/**
 * Prints the file error to `stdout`
 *
 * @param {string} filename Supplied filename
 * @param {Error} error Error
 */
export const entryPointFileDoesNotExistError = (filename, error) => {
  customLog('[ERROR]', 'BG_RED', 'BLACK')
  console.log(`The supplied filename ${filename} does not exist\n`)
  customLog('[ABOUT]', 'BG_YELLOW', 'BLACK')
  console.log(`${error}\n`)
}

export const bundleSavedSuccessfullyLog = filename => {
  customLog('[SUCCESS]', 'BG_GREEN', 'BLACK')
  console.log(
    `Successfully bundled and saved ${filename} to 'dist/${filename}' 📂\n`
  )
}
