const express = require("express");
const router = express.Router();
const Certificate = require("../models/certificate");
const adminAuth = require("../middleware/auth"); // for admin POST

// GET certificate by certId
router.get("/verify/:certId", async (req, res) => {
  try {
    const cert = await Certificate.findOne({ certId: req.params.certId });

    if (!cert) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    res.json({
      name: cert.name,
      college: cert.college,
      domain: cert.domain,
      duration: cert.duration,
      issueDate: cert.issueDate.toISOString().split("T")[0],
    });
  } catch (err) {
    console.error("Error verifying certificate:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST to create a new certificate (admin only)
router.post("/", adminAuth, async (req, res) => {
  try {
    const { certId, name, college, domain, duration, issueDate } = req.body;

    if (!certId || !name || !college || !domain || !duration || !issueDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await Certificate.findOne({ certId });
    if (exists) {
      return res.status(409).json({ message: "Certificate ID already exists" });
    }

    const newCert = new Certificate({
      certId,
      name,
      college,
      domain,
      duration,
      issueDate: new Date(issueDate),
    });

    await newCert.save();
    res.status(201).json({
      message: "Certificate created successfully",
      certificate: newCert,
    });
  } catch (err) {
    console.error("Error creating certificate:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
