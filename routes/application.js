const express = require("express");
const router = express.Router();
const { validateApplication } = require("../validators/applicationValidator");
const { submitApplication } = require("../controllers/applicationController");

router.post("/", validateApplication, submitApplication);

module.exports = router;
