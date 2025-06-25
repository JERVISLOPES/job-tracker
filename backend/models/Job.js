const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  status: {
    type: String,
    enum: ["Applied", "Interviewing", "Rejected", "Offer"],
    default: "Applied",
  },
  appliedDate: { type: Date, default: Date.now },
  link: { type: String },
  notes: { type: String },
});

module.exports = mongoose.model("Job", JobSchema);
