const { Model, DataTypes } = require("sequelize");
const sequelize = require('../DBConfig/Config');

class Member extends Model {}

Member.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
}, {
    sequelize,
    modelName: 'member',
    timestamps: false
});

module.exports = Member;
