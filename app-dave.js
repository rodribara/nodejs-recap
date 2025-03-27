
const os = require('os')
//console.log(os)

const path = require('path')
//console.log(path)

const math = require('./math')
/* {
  add: [Function: add],
  subtract: [Function: subtract],
  multiply: [Function: multiply],
  divide: [Function: divide]
} */
const {add, subtract, multiply, divide } = require('./math')
console.log(add(1,2))
console.log(subtract(1,2))
console.log(multiply(1,2))
console.log(divide(1,2))

console.log(math)

console.log(os.type()) 
// Windows_NT
console.log(os.version())
// Windows 11 Home Single Language
console.log(os.homedir())
// C:\Users\rodri
console.log(__dirname)
// C:\GitHub\nodejs-recap
console.log(__filename)
// C:\GitHub\nodejs-recap\app-dave.js
console.log(path.dirname(__filename))
// C:\GitHub\nodejs-recap
console.log(path.basename(__filename))
// app-dave.js
console.log(path.extname(__filename))
// .js

console.log(path.parse(__filename))
/* {
  root: 'C:\\',
  dir: 'C:\\GitHub\\nodejs-recap',
  base: 'app-dave.js',
  ext: '.js',
  name: 'app-dave'
} */

