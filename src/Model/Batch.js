const { DataTypes } = require("sequelize");
const sequelize = require('../DBConfig/Config');

const Batch = sequelize.define('batch', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    profilePic: { type: DataTypes.STRING },
    coverPic: { type: DataTypes.STRING }
}, { timestamps: false });

module.exports = Batch;
