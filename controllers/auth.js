import { StatusCodes } from "http-status-codes";
import User from "../models/user.js";

const register = async (req, res) => {
  const user = await User.create(req.body);
  const token = user.generateJwtToken();
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
    },
    token,
  });
};

const login = (req, res) => {
  res.send("login user");
};

export default {
  register,
  login,
};
