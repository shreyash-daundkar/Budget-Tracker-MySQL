const Sequelize = require('sequelize');
const database = require('../util/database');

module.exports = database.define('downloadHistories', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true,
    },
    fileName : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    location : {
        type : Sequelize.STRING,
        allowNull : false,
    },
});