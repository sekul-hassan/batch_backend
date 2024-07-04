const { DataTypes } = require("sequelize");
const sequelize = require('../DBConfig/Config');

const CourseDetails = sequelize.define('course_details', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
}, { timestamps: false });

module.exports = CourseDetails;
