import { Router } from "express";
import authController from "../controllers/auth.js";

const router = Router();
const { register, login } = authController;

router.route("/register")
  .post(register);

router.route("/login")
  .post(login);

export default router;