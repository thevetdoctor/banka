const express = require('express');

const router = express.Router();
const { TransactionController } = require('../controllers/transactions');


router.post('/:accountNumber/:type', TransactionController.creDebit);


module.exports = router;
