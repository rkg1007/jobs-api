import mongoose from "mongoose";

const JobSchema = mongoose.Schema({
  company: {
    type: String,
    required: [true, "please provide company name"],
    minlength: 3,
    maxlength: 100,
  },
  position: {
    type: String,
    required: [true, "please provide position"],
    minlength: 3,
    maxlength: 50,
  },
  status: {
    type: String,
    enum: ["interview", "rejected", "pending", "selected"],
    default: "pending",
  },
  createBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  timestamps: true,
});

export default mongoose.model("Job", JobSchema);