const express = require('express');
const { addSemester } = require('../Service/SemesterService');
const upload = require("../StorageConfig");
const semesterRouter = express.Router();

semesterRouter.post('/addSemester',upload.fields([
    { name: 'mcrPhoto', maxCount: 1 },
    { name: 'fcrPhoto', maxCount: 1 }
]), addSemester);


module.exports = { semesterRouter };
