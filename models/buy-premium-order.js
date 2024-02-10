const Sequelize = require('sequelize');
const database = require('../util/database');

module.exports = database.define('orders', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true,
    },
    orderId : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    paymentId : {
        type : Sequelize.STRING,
        unique : true,
    },
    status : {
        type : Sequelize.STRING,
        allowNull : false,
    },
});