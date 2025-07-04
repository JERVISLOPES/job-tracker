const express = require("express");
const router = express.Router();
const multer = require("multer");
const resumeController = require("../controllers/resumeController");

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/analyze", upload.single("resume"), resumeController.analyzeResume);

module.exports = router;
