const Sequelize = require('sequelize');
const database = require('../util/database');

module.exports = database.define('expense', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true,
    },
    amount : {
        type : Sequelize.DOUBLE,
        allowNull : false,
    },
    category : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    description : {
        type : Sequelize.STRING,
        allowNull : false,
    },
})