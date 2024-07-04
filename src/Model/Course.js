const { DataTypes } = require("sequelize");
const sequelize = require('../DBConfig/Config');

const Course = sequelize.define('course', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    code: { type: DataTypes.STRING },
    teacher: { type: DataTypes.STRING },
}, { timestamps: false });

module.exports = Course;
