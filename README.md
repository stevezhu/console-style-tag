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
