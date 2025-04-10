const allowedOrigins = require("../config/allowedOrigins"); // import the allowed origins from allowedOrigins.js

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next(); // call the next middleware function in the stack
};

module.exports = credentials; // export the credentials middleware to be used in the server.js file
