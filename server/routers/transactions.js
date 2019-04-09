const express = require('express');

const router = express.Router();
const { TransactionController } = require('../controllers/transactions');


router.post('/:accountNumber/:credit', TransactionController.credit);


module.exports = router;
