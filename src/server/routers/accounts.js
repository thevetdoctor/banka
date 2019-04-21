import express from 'express';
import AccountController from '../controllers/accounts';

const router = express.Router();


router.post('/', AccountController.create);

router.patch('/:accountNumber', AccountController.activate);

router.delete('/:accountNumber', AccountController.delete);

router.get('/', AccountController.listAllAccounts);

router.get('/:accountNumber', AccountController.listOneAccount);

router.get('/:accountNumber/:transactions', AccountController.getTransactions);


export default router;
