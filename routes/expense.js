const express = require('express');

const { displayExpense, addExpense, editExpense, deleteExpense } = require('../controllers/expense');



const router = express.Router();



router.get('/', displayExpense);

router.post('/', addExpense);

router.put('/', editExpense);

router.delete('/', deleteExpense);



module.exports = router;