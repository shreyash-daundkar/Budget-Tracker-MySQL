const jwt = require('jsonwebtoken');
const { readUsers } = require('../services/user');
const user = require('../models/user');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];

        const { userId } = decryptData(token);
        const users = await readUsers({ userId });
        req.user = users[0];
        
        next();
    } catch (error) {
        console.log(error);
        return res.status(404).json({message: 'invalid token'});
    }
}

function decryptData(token) {
    return jwt.verify(token, process.env.TOKEN_SECRET);
}