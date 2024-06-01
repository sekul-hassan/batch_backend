const { DataTypes } = require("sequelize");
const sequelize = require('../DBConfig/Config');

const Member = sequelize.define('member', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    phone: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    district: { type: DataTypes.STRING },
    profile: { type: DataTypes.STRING }
}, { timestamps: false });

module.exports = Member;
