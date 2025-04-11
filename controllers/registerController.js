const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  // Check for duplicate usernames in the database
  const duplicate = await User.findOne({ username: user }).exec();

  if (duplicate)
    return res.status(409).json({ message: "Username already exists." });

  try {
    // encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //store new users
    const newUser = {
      username: user,
      password: hashedPwd,
    };
    // create and store  the new user

    const result = await User.create(newUser);
    console.log(result);

    res.status(201).json({ message: `New user ${user} created` });
    // Encryptt the passord
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  // Hash the password
};

module.exports = { handleNewUser };
