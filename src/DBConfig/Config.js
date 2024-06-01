const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('batch_management', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log,
});

module.exports = sequelize;
