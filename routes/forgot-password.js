const express = require('express');


const { sendMail, resetPassword } = require('../controllers/forgot-password');


const router = express.Router();


router.post('/', sendMail);

router.post('/reset-password', resetPassword);


module.exports = router;