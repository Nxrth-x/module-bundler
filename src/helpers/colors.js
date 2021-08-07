const COLORS = {
  RESET: '\x1b[0m',
  BLACK: '\u001b[30m',
  RED: '\u001b[31m',
  GREEN: '\u001b[32m',
  YELLOW: '\u001b[33m',
  BLUE: '\u001b[34m',
  MAGENTA: '\u001b[35m',
  CYAN: '\u001b[36m',
  WHITE: '\u001b[37m',
  BG_BLACK: '\u001b[40m',
  BG_RED: '\u001b[41m',
  BG_GREEN: '\u001b[42m',
  BG_YELLOW: '\u001b[43m',
  BG_BLUE: '\u001b[44m',
  BG_MAGENTA: '\u001b[45m',
  BG_CYAN: '\u001b[46m',
  BG_WHITE: '\u001b[47m',
}

/**
 * Prints to `stout` with the given colors
 *
 * @param {any} message Message to be logged
 * @param {Array<keyof COLORS>} colors List of colors to use in the console
 */
export const customLog = (message, ...colors) => {
  const colorsString = colors.reduce(
    (string, color) => string + COLORS[color],
    ''
  )

  console.log(`${colorsString}${message}${COLORS.RESET}`)
}

export default COLORS
