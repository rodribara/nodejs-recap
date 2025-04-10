const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // for JWT secret

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //Unauthorized

  const refreshToken = cookies.jwt; // Bearer token
  //  is refresh token in db?
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); // secure: true, sameSite: 'None' for production

    return res.sendStatus(204);
  }

  // evaluate jwt
  const otherUsers = usersDB.users.filter(
    (person) => person.refeshToken !== foundUser.refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: "" };
  usersDB.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(usersDB.users)
  );
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); //add secure: true - for production safety

  res.sendStatus(204);
};

module.exports = { handleLogout };
