const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  certId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  college: { type: String, required: true },
  domain: { type: String, required: true },
  duration: { type: String, required: true }, // e.g. "4 weeks"
  issueDate: { type: Date, required: true },
});

module.exports = mongoose.model("Certificate", certificateSchema);
