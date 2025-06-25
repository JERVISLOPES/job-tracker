const fs = require("fs");
const pdfParse = require("pdf-parse");

exports.analyzeResume = async (req, res) => {
  const filePath = req.file.path;
  const jobKeywords = req.body.keywords?.split(",") || [];

  try {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);

    const resumeText = pdfData.text.toLowerCase();
    const matched = jobKeywords.filter((word) => resumeText.includes(word.toLowerCase()));
    const missing = jobKeywords.filter((word) => !resumeText.includes(word.toLowerCase()));

    res.json({
      totalKeywords: jobKeywords.length,
      matchedKeywords: matched,
      missingKeywords: missing,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to analyze resume", error: error.message });
  } finally {
    fs.unlinkSync(filePath); // delete temp file
  }
};
