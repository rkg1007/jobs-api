import { StatusCodes } from "http-status-codes";

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let msg = err.message || "something went wrong. please try again.";

  if (err.name) {
    if (err.name === "ValidationError") {
      msg = Object.values(err.errors).map(item => item.message).join(", ");
    } else if (err.name == "CastError") {
      msg = `given id: ${err.value} is not valid. please provide valid object id`;
    }
    statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.code || err.code === 11000) {
    msg = `duplicate value for ${Object.keys(err.keyValue)}`;
    statusCode = StatusCodes.BAD_REQUEST;
  }

  res.status(statusCode).json({
    status: "failed",
    msg,
  });
};

export default errorHandler;
