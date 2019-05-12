[![npm](https://img.shields.io/npm/v/@stzhu/console-style-tag.svg)](https://www.npmjs.com/package/@stzhu/console-style-tag)
[![GitHub](https://img.shields.io/github/license/stevezhu/console-style-tag.svg)](https://github.com/stevezhu/console-style-tag/blob/master/LICENSE)
[![Build Status](https://travis-ci.com/stevezhu/console-style-tag.svg)](https://travis-ci.com/stevezhu/console-style-tag)
[![Coverage Status](https://coveralls.io/repos/github/stevezhu/console-style-tag/badge.svg?branch=master)](https://coveralls.io/github/stevezhu/console-style-tag?branch=master)
[![devDependencies Status](https://david-dm.org/stevezhu/console-style-tag/dev-status.svg)](https://david-dm.org/stevezhu/console-style-tag?type=dev)

Package for styling console logs in developer tools.

# Usage

1. Styling

    The styles can be given as an object. Each key matches the index of the interpolated variable. In the following case, the style would apply to the word `'text'`.
      ```javascript
      consoleStyle({ 1: 'color: red' })`This is some ${'styled'} ${'text'}.`
      ```

    Styles can also be given as an array. Each index matches the index of the interpolated variable.
      ```javascript
      consoleStyle(['color: blue', 'color: red'])`This is some ${'styled'} ${'text'}.`
      ```

    Falsy styles are ignored.
      ```javascript
      consoleStyle([ undefined, 'color: red' ])`This is some ${'styled'} ${'text'}.`
      ```

2. The output can then be passed to `console.log` using the spread operator.
    ```javascript
    const output = consoleStyle([ undefined, 'color: red' ])`This is some ${'styled'} ${'text'}.`
    console.log(...output)
    ```
