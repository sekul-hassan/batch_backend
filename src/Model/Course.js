const { DataTypes } = require("sequelize");
const sequelize = require('../DBConfig/Config');

const Course = sequelize.define('course', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    course_code: { type: DataTypes.STRING },
    course_title: { type: DataTypes.STRING }
}, { timestamps: false });

module.exports = Course;
