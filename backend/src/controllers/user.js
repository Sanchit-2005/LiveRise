import { User } from "../models/users.js";
import { StatusCodes } from "http-status-codes";
import bcrypt, { hash } from "bcrypt";
import crypto from "node:crypto";

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Plase provide proper info " });
  }

  try {
    let user = await User.findOne({ username });
    if (user) {
      let checkPassword = await bcrypt.compare(password, user.password);
      if (checkPassword) {
        let token = crypto.randomBytes(20).toString("hex");
        user.token = token;
        await user.save();
        return res
          .status(StatusCodes.ACCEPTED)
          .json({ message: `Welcome Back ${user.name}`,token: token });
      
      }
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "incorrect passwords" });
    }
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "User not found !" });
  } catch (e) {
    res.send(`something went wrong ${e}`);
  }
};

const register = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    let user = await User.findOne({ username });
    if (user) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: `User with given username already exists ` });
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      name: name,
      username: username,
      password: hashedPassword,
    });
    await newUser.save();

    return res
      .status(StatusCodes.CREATED)
      .json({ message: `Register successfully` });
  } catch (e) {
   res.json({ message: `Something went wrong ${e}` })
  }
};

export { login, register };
