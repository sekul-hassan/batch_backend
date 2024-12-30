const sequelize = require('./Config');
const defineAssociations = require('../DBConfig/Association');

const modelSynchronization = async () => {
    try {
        defineAssociations();
        await sequelize.sync({alter:true});
        console.log("Database synchronized");
    } catch (err) {
        console.error("Error:", err);
        throw err;
    }
};

module.exports = modelSynchronization;
