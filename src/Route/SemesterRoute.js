const express = require('express');
const { addSemester } = require('../Service/SemesterService');
const semesterRouter = express.Router();

semesterRouter.post('/addSemester', addSemester);

module.exports = { semesterRouter };
