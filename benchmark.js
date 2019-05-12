/**
 * Last run 04/29/19
 *
 * spread operator x 1,158,185 ops/sec ±0.80% (84 runs sampled)
 * join x 1,288,586 ops/sec ±1.39% (86 runs sampled)
 * join with concat x 1,350,590 ops/sec ±4.05% (80 runs sampled)
 * join with interpolation x 1,158,687 ops/sec ±7.06% (72 runs sampled)
 * concat with interpolation x 2,976,061 ops/sec ±4.55% (76 runs sampled)
 * Fastest is concat with interpolation
 */

const Benchmark = require('benchmark')
const suite = Benchmark.Suite()

const funcs = {
  'spread operator': (styles = []) => {
    return (strs, ...values) => {
      const strArr = [strs[0]]
      const stylesArr = []
      for (let i = 0; i < values.length; i++) {
        if (styles[i]) {
          strArr.push('%c')
          strArr.push(values[i])
          strArr.push('%c')

          stylesArr.push(styles[i])
          stylesArr.push('')
        } else {
          strArr.push(values[i])
        }
        strArr.push(strs[i + 1])
      }
      return [strArr.join(''), ...stylesArr]
    }
  },
  join: (styles = []) => {
    return (strs, ...values) => {
      const strArr = [strs[0]]
      const args = ['']
      for (let i = 0; i < values.length; i++) {
        if (styles[i]) {
          strArr.push('%c')
          strArr.push(values[i])
          strArr.push('%c')

          args.push(styles[i])
          args.push('')
        } else {
          strArr.push(values[i])
        }
        strArr.push(strs[i + 1])
      }
      args[0] = strArr.join('')
      return args
    }
  },
  'join with concat': (styles = []) => {
    return (strs, ...values) => {
      const strArr = [strs[0]]
      const args = ['']
      for (let i = 0; i < values.length; i++) {
        if (styles[i]) {
          strArr.push('%c' + values[i] + '%c')

          args.push(styles[i])
          args.push('')
        } else {
          strArr.push(values[i])
        }
        strArr.push(strs[i + 1])
      }
      args[0] = strArr.join('')
      return args
    }
  },
  'join with interpolation': (styles = []) => {
    return (strs, ...values) => {
      const strArr = [strs[0]]
      const args = ['']
      for (let i = 0; i < values.length; i++) {
        if (styles[i]) {
          strArr.push(`%c${values[i]}%c`)

          args.push(styles[i])
          args.push('')
        } else {
          strArr.push(values[i])
        }
        strArr.push(strs[i + 1])
      }
      args[0] = strArr.join('')
      return args
    }
  },
  'concat with interpolation': (styles = []) => {
    return (strs, ...values) => {
      const args = [strs[0]]
      for (let i = 0; i < values.length; i++) {
        if (styles[i]) {
          args[0] += `%c${values[i]}%c`

          args.push(styles[i])
          args.push('')
        } else {
          args[0] += values[i]
        }
        args[0] += strs[i + 1]
      }
      return args
    }
  },
}
const styles = ['color: blue', 'color: red', 'color: yellow']
for (const [name, fn] of Object.entries(funcs)) {
  suite.add(name, () => fn(styles)`${'This'} is ${'some'} ${'text'}.`)
}

suite
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
