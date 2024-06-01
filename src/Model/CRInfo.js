const { DataTypes } = require("sequelize");
const sequelize = require('../DBConfig/Config');

const CRInfo = sequelize.define('crinfo', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    speech: { type: DataTypes.STRING },
    pic: { type: DataTypes.STRING }
}, { timestamps: false });

module.exports = CRInfo;
