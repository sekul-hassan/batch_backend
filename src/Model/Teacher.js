
const {DataTypes} = require("sequelize") ;
const sequelize = require("../DBConfig/Config");
const Member = require("../Model/Member");


class Teacher extends Member {}

Teacher.init({
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    designation:{type:DataTypes.STRING},
},{
    sequelize,
    modelName:'teacher',
    timestamps:false,
})

module.exports = Teacher;