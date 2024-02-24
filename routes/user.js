const express = require('express');

const validation = require('../middlewares/validation');

const { addUser, verifyUser } = require('../controllers/user');



const router = express.Router();



router.use(['/signup', '/login', '/forgot-password', '/reset-password'], validation);

router.post('/signup', addUser);

router.post('/login', verifyUser);



module.exports = router;