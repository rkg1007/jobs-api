import jwt from "jsonwebtoken";
import Unauthenticated from "../errors/unauthenticated.js";

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Unauthenticated("invalid authorization");
  }

  try {
    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Unauthenticated("invalid token");
  }
}

export default authenticate;