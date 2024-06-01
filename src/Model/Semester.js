const { DataTypes } = require("sequelize");
const sequelize = require('../DBConfig/Config');

const Semester = sequelize.define("semester", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    semester: { type: DataTypes.STRING }
}, { timestamps: false });

module.exports = Semester;
