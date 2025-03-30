const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
console.log(format(new Date(), "yyyy-MM-dd\tHH:mm:ss"));

console.log("Hello World!"); // rerendes with nodemon

console.log(uuid()); // if used as uuid without destructuring, you can uuid.v4() instead of uuid()

console.log();
/* 
adding packages
npm i nodemon -g

npm init

deleting
 npm uninstall nodemon -g
npm uninstall nodemon --save-dev  (or -D)

*/
