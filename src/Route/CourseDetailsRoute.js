const express = require('express');
const upload = require('../StorageConfig'); // Ensure the path is correct
const { addCourseDetails, getCourseDetails} = require('../Service/CourseDetails');

const courseDetailsRouter = express.Router();

courseDetailsRouter.post('/addCourseDetails', upload.single('image'), addCourseDetails);
courseDetailsRouter.get("/getCourseDetails",getCourseDetails);

module.exports = { courseDetailsRouter };
