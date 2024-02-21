const express = require('express');

const { downloadHistory } = require('../controllers/download-history');


const router = express.Router();


router.get('/', downloadHistory);


module.exports = router;