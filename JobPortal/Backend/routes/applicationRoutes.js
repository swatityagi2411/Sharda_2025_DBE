const express = require("express");
const Application = require("../models/Application");
const router = express.Router();

// POST new application
router.post("/", async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all applications with job details
router.get("/", async (req, res) => {
  const { jobId, applicantName } = req.query;
  let filters = [];

  if (jobId) filters.push({ jobId: mongoose.Types.ObjectId(jobId) });
  if (applicantName) filters.push({ applicantName: { $regex: applicantName, $options: "i" } });

  const query = filters.length ? (filters.length === 1 ? filters[0] : { $and: filters }) : {};

  try {
    const applications = await Application.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "jobs",
          localField: "jobId",
          foreignField: "_id",
          as: "jobDetails"
        }
      },
      { $unwind: "$jobDetails" }
    ]);
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single application by ID
router.get("/:id", async (req, res) => {
  try {
    const application = await Application.aggregate([
      { $match: { _id: req.params.id } },
      {
        $lookup: {
          from: "jobs",
          localField: "jobId",
          foreignField: "_id",
          as: "jobDetails"
        }
      },
      { $unwind: "$jobDetails" }
    ]);

    if (!application.length) return res.status(404).json({ message: "Application not found" });

    res.json(application[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
