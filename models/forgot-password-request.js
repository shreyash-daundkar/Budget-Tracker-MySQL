const Sequelize = require('sequelize');
const database = require('../util/database');

module.exports = database.define('forgotPasswordRequests', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    }
});