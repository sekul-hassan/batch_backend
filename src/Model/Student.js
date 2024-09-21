const sequelize = require("../DBConfig/Config");
const Member = require("./Member");
const {DataTypes} = require("sequelize");


class Student extends Member {}

Student.init({
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    district:{type:DataTypes.STRING},
    profilePic:{type:DataTypes.STRING},
},{
    sequelize,
    modelName:'student',
    timestamps:false,
})

module.exports = Student;