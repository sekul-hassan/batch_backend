const {Model, DataTypes} = require("sequelize");
const sequelize = require("../DBConfig/Config");


class Notice extends Model {}

Notice.init({
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    author:{type:DataTypes.STRING},
    title:{type:DataTypes.STRING},
    description:{type:DataTypes.STRING},
},{
    sequelize,
    modelName:'notice',
    timestamps:true,
})

module.exports = Notice;