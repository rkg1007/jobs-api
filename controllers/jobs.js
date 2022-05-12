import { StatusCodes } from "http-status-codes";
import NotFound from "../errors/not-found.js";
import BadRequest from "../errors/bad-request.js";
import Job from "../models/job.js";

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  const job = await Job.findOne({ _id: req.params.id, createdBy: req.user });
  if (!job) {
    throw new NotFound(`job with job id ${req.params.id} is not found`);
  }
  res.status(StatusCodes.OK).json({ ...job });
};

const createJob = async (req, res) => {
  const job = await Job.create({ ...req.body, createdBy: req.user });
  res.status(StatusCodes.CREATED).json(job);
};

const updateJob = async (req, res) => {
  const { company, position } = req.body;

  if (!company || !position) {
    throw new BadRequest("please provide company and position both.");
  }

  const job = await Job.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user },
    req.body,
    { new: true }
  );

  if (!job) {
    throw new NotFound(`job with job id ${req.params.id} is not found`);
  }
  res.status(StatusCodes.OK).json({ ...job });
};

const deleteJob = async (req, res) => {
  const job = await Job.findOneAndDelete({ _id: req.params.id, createdBy: req.user });
  if (!job) {
    throw new NotFound(`job with job id ${req.params.id} is not found`);
  }
  res.status(StatusCodes.OK).json({ ...job });
};

export default {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
};