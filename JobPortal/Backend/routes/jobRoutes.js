const express=require('express');
const Job=require("../models/Job.js");
const router=express.Router();

// Filtering APIwith advanced queries

router.get("/jobs", async (req, res) => {
    const { location, exp, skill, excludeLocation } = req.query;

    let filters = [];

    // location filter
    if (location) filters.push({ location });

    // minimum experience filter
    if (exp) filters.push({ experience: { $gte: parseInt(exp) } });

    // skill filter
    if (skill) {
        const skillsArray = Array.isArray(skill) ? skill : skill.split(",");
        filters.push({ skills: { $all: skillsArray } }); // or use $in if any skill match is ok
    }

    // exclude location filter
    if (excludeLocation) filters.push({ location: { $ne: excludeLocation } });

    // build query
    const query = filters.length > 1 ? { $and: filters } : filters[0] || {};

    try {
        const jobs = await Job.find(query);
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports=router;