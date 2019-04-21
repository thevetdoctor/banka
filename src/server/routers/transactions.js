import express from 'express';
import TransactionController from '../controllers/transactions';

const router = express.Router();


router.post('/:accountNumber/:type', TransactionController.creDebit);

// router.get('')


export default router;