const express = require('express');

const { createOrder, updateOrder } = require('../controllers/buy-premium');


const router = express.Router();

router.get('/', createOrder);

router.post('/', updateOrder);



module.exports = router;