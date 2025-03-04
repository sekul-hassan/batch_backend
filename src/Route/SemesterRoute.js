const express = require('express');
const { addSemester, getSemesters} = require('../Service/SemesterService');
const upload = require("../Configuration/StorageConfig");
const semesterRouter = express.Router();

semesterRouter.post('/addSemester',upload.fields([
    { name: 'mcrPhoto', maxCount: 1 },
    { name: 'fcrPhoto', maxCount: 1 }
]), addSemester);

semesterRouter.get("/getSemesters", getSemesters);


module.exports = { semesterRouter };
