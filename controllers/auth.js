import { StatusCodes } from "http-status-codes";
import User from "../models/user.js";

const register = async (req, res) => {
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json(user);
};

const login = (req, res) => {
  res.send("login user");
};

export default {
  register,
  login,
};
