const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization; // Bearer token
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401); //Unauthorized
  console.log(authHeader); // Bearer token
  const token = authHeader.split(" ")[1]; // Bearer token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //Forbidden
    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

module.exports = verifyJWT;
