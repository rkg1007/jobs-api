import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import express from "express";

import authRouter from "./routes/auth.js";
import jobsRouter from "./routes/jobs.js";
import notFound from "./middlewares/not-found.js";
import errorHandler from "./middlewares/error-handler.js";
import connectDb from "./utils/connect-db.js";


const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// middlewares
app.use(express.json());

// routes
app.use("/auth", authRouter);
app.use("/jobs", jobsRouter);

// error handlers
app.use(notFound);
app.use(errorHandler);

const start = async (port, url) => {
  try {
    await connectDb(url);
    app.listen(port, console.log(`server is up and running at port ${port}...`));
  } catch (error) {
    console.log("error while connecting to the database");
    console.log(error.message);
  }
};

start(PORT, MONGO_URI);
