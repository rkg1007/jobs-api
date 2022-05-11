import { StatusCodes } from "http-status-codes";
import NotFound from "../errors/not-found.js";
import Unauthenticated from "../errors/unauthenticated.js";
import BadRequest from "../errors/bad-request.js";
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
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest("please provide email and password");
  }

  const user = User.findOne({ email });
  if (!user) {
    throw new NotFound("user is not registered");
  }

  const isPasswordCorrect = user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new Unauthenticated("incorrect password");
  }

  const token = user.generateJwtToken();
  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      email: user.email,
    },
    token
  })
};

export default {
  register,
  login,
};
