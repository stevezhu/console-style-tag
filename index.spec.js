require('jest-extended')
const consoleStyle = require('console-style-tag')

describe('console-style-tag', () => {
  it('should return a function', () => {
    expect(consoleStyle()).toBeFunction()
  })

  it('should return tagged output if styles are given as an array', () => {
    const tagFn = consoleStyle(['color: gray', 'color: red'])
    const output = tagFn`${'This'} is ${'some'} ${'text'}.`

    expect(output).toEqual([
      '%cThis%c is %csome%c text.',
      'color: gray',
      '',
      'color: red',
      '',
    ])
  })

  it('should return tagged output if styles are given as an object', () => {
    const tagFn = consoleStyle({ 0: 'color: gray', 2: 'color: red' })
    const output = tagFn`${'This'} is ${'some'} ${'text'}.`

    expect(output).toEqual([
      '%cThis%c is some %ctext%c.',
      'color: gray',
      '',
      'color: red',
      '',
    ])
  })

  it('should use format strings for function values', () => {
    const counter1 = (() => {
      const fn = function() {}
      let count1 = 0
      fn.toString = () => '' + count1++
      return fn
    })()

    const counter2 = (() => {
      const fn = function() {}
      let count2 = 0
      fn.toString = () => '' + count2++
      return fn
    })()

    const tagFn = consoleStyle(['color: gray', 'color: red'])
    const output = tagFn`${'Count'}: ${counter1} ${counter2}`

    expect(output).toEqual([
      '%cCount%c: %c%s%c %s',
      'color: gray',
      '',
      'color: red',
      counter1,
      '',
      counter2,
    ])
  })

  it('should return tagged output if styles are not given', () => {
    const output = consoleStyle()`${'This'} is ${'some'} ${'text'}.`

    expect(output).toEqual(['This is some text.'])
  })

  it('should return tagged output of empty string', () => {
    const output = consoleStyle()``

    expect(output).toEqual([''])
  })

  it('should ignore styles that are falsy', () => {
    const tagFn = consoleStyle(['', undefined, null, false])
    const output = tagFn`${'This'} ${'is'} ${'some'} ${'text'}.`

    expect(output).toEqual(['This is some text.'])
  })

  it("should ignore styles of indices that don't exist", () => {
    const tagFn = consoleStyle({ 1: 'color: black' })
    const output = tagFn`${'text'}`

    expect(output).toEqual(['text'])
  })
})
