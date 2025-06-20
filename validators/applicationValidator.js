const { body, validationResult } = require("express-validator");

exports.validateApplication = [
  body("name").notEmpty().withMessage("Name is required"),
  body("gender")
    .isIn(["Male", "Female"])
    .withMessage("Valid gender is required"),
  body("age").isInt({ min: 15, max: 60 }).withMessage("Valid age is required"),
  body("contactNumber")
    .matches(/^\d{10}$/)
    .withMessage("Valid 10-digit contact number required"),
  body("college").notEmpty().withMessage("College name is required"),
  body("collegeAmbassador")
    .isBoolean()
    .withMessage("College Ambassador choice required"),
  body("domain")
    .isIn([
      "App Development",
      "Web Development",
      "Cloud Computing",
      "Java Programming",
      "Python Programming",
      "C++ Programming",
      "Artificial Intelligence/Machine Learning",
      "Front-End Development",
      "Back-End Development",
      "Full-Stack Development",
    ])
    .withMessage("Valid domain is required"),
  body("linkedinFollowed")
    .isBoolean()
    .withMessage("LinkedIn follow status required"),
  body("agreedToTerms").equals("true").withMessage("You must agree to terms"),
  // Optional fields
  body("screenshot")
    .optional()
    .isURL()
    .withMessage("Screenshot must be a valid URL"),
  body("referrerName").optional().isString(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
