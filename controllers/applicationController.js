const { appendApplication } = require("../services/googleSheetsService");

exports.submitApplication = async (req, res) => {
  try {
    await appendApplication(req.body);
    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error submitting application:", error);
    res
      .status(500)
      .json({ error: "Server error while submitting application" });
  }
};
