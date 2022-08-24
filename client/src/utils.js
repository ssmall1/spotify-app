/**
 * Higher-order function for async/await error handling
 * Higher-order functions are functions that operate on other functions,
 * either by taking them as arguments or by returning them.
 * @param {function} fn an async function
 * @returns {function}
 */
 export const catchErrors = fn => {
  return function(...args) {
    return fn(...args).catch((err) => {
      console.error(err);
    })
  }
}