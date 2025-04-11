const User = require("../model/User");

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //Unauthorized

  const refreshToken = cookies.jwt; // Bearer token
  //  is refresh token in db?

  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); // secure: true, sameSite: 'None' for production

    return res.sendStatus(204);
  }

  foundUser.refreshToken = "";
  const result = await foundUser.save(); //delete for production
  console.log(result);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); //add secure: true - for production safety

  res.sendStatus(204);
};

module.exports = { handleLogout };
