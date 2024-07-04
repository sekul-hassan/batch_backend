const express = require('express');
const {addCourse, allCourse} = require("../Service/CourseService");


const courseRouter = express.Router();

courseRouter.post("/addCourse",addCourse);
courseRouter.get("/allCourse",allCourse);


module.exports = {courseRouter};