import { Router } from "express";
import jobsController from "../controllers/jobs.js";

const router = Router();
const { getAllJobs, getJob, createJob, updateJob, deleteJob } = jobsController;

router.route("/")
  .get(getAllJobs)
  .post(createJob);

router.route("/:id")
  .get(getJob)
  .patch(updateJob)
  .delete(deleteJob);

export default router;
