import express from 'express';
import TransactionController from '../controllers/transactions';

const router = express.Router();


router.post('/:accountNumber/:type', TransactionController.creDebit);

router.get('/:transactionId', TransactionController.getTransaction);

// router.get('', TransactionController.getAccountHistory);


export default router;
