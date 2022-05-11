const getAllJobs = (req, res) => {
  res.send("get all jobs");
};

const getJob = (req, res) => {
  res.send("get single job");
};

const createJob = (req, res) => {
  res.send("creat a job");
};

const updateJob = (req, res) => {
  res.send("update the job");
};

const deleteJob = (req, res) => {
  res.send("delete the job");
};

export default {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
};