import express from 'express';
import TransactionController from '../controllers/transactions';
import validateTransaction from '../helper/validateTransaction';
import auth from '../checkAuth';
import cashierAuth from '../checkAuth/cashierAuth';

const router = express.Router();


// Staff(cashier) can credit an account
// Staff(cashier) can debit an account
router.post('/:accountNumber/:type', auth, cashierAuth, validateTransaction.validateCreditAndDebit, TransactionController.creditAndDebit);

// User can view a specific account transaction
router.get('/:transactionId', auth, validateTransaction.getTransaction, TransactionController.getTransaction);


export default router;
