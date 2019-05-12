/**
 * @param {object} styles An array of styles respectively for each placeholder.
 * @returns A tag function that styles text for the browser console using the
 * given styles.
 */
function consoleStyle(styles = []) {
  /**
   * @param {array} strs The array of intermediary strings.
   * @param {array} vals The array of objects to be styled.
   * @returns An args array that should be passed to `console.log` using the
   * spread operator.
   */
  return (strs, ...vals) => {
    // 1. Initialize the output string with the first intermediary string.
    const args = [strs[0]]

    // 2. For each index,
    for (const [i, val] of vals.entries()) {
      const isFunction = typeof val === 'function'

      // a. concat the format string and push corresponding values to args
      //
      // if the value is a function, then use `%s` in format string to evaluate
      // the `toString` function of the value each time
      if (styles[i]) {
        args[0] += isFunction ? '%c%s%c' : `%c${val}%c`

        args.push(styles[i]) // set style
        if (isFunction) args.push(val)
        args.push('') // reset style
      } else {
        args[0] += isFunction ? '%s' : val

        if (isFunction) args.push(val)
      }

      // b. concat the intermediary string.
      args[0] += strs[i + 1]
    }

    return args
  }
}

module.exports = consoleStyle
