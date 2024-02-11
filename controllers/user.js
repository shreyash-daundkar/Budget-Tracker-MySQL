const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { createUser, readUsers } = require('../services/user');



exports.addUser = async (req, res, next) => {
    try{ 
        const user = req.body;
        user.password = await hashPassword(user.password);

        const userObj = {
            ...user, 
            isPremium: false, 
            expense: 0
        }
        
        await createUser({ userObj });
        res.json({ success: true });

    } catch(error) {
        console.log(error.stack);

        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).send('Email already in use');
        } else {
            res.status(500).send('Something went wrong');
        }
    }
}

function hashPassword(password) {
    return new Promise(resolve => {
        bcrypt.hash(password, 10, (error, hash) => {
            if(error) throw error;
            resolve(hash);
        });
    });
}


exports.verifyUser = async (req, res, next) => {
    try{ 
        const {email, password} = req.body;

        const users = await readUsers({ email });

        if(users.length === 0) res.status(404).send('Email is not found');
        else {

            bcrypt.compare(password, users[0].password, (error, result) => {
                if(error) res.status(400).send('Password is incorrect');
                else if(result) res.json({success: true, token: incryptData(users[0].id), isPremium: users[0].isPremium});
            });
        }
    } catch(error) {
        console.log(error.stack);
        res.status(500).send('Something went wrong');
    }
}

function incryptData(userId) {
    return jwt.sign({ userId }, process.env.TOKEN_SECRET);
}