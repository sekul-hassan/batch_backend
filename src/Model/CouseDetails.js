const { DataTypes } = require("sequelize");
const sequelize = require('../DBConfig/Config');

const CourseDetails = sequelize.define('course_details', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ct: { type: DataTypes.STRING },
    title: { type: DataTypes.STRING }
}, { timestamps: false });

module.exports = CourseDetails;
