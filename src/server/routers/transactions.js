import express from 'express';
import TransactionController from '../controllers/transactions';
import validateTransaction from '../helper/validateTransaction';
import auth from '../checkAuth';

const router = express.Router();


router.post('/:accountNumber/:type', validateTransaction.validateCreditAndDebit, TransactionController.creditAndDebit);

router.get('/:transactionId', validateTransaction.getTransaction, TransactionController.getTransaction);


export default router;
