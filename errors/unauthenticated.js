import { StatusCodes } from "http-status-codes";
import CustomError from "./custom-error.js";

class Unauthenticated extends CustomError {
  constructor(message) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export default Unauthenticated;
