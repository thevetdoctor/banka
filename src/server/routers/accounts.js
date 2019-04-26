import express from 'express';
import AccountController from '../controllers/accounts';
import validateAccount from '../helper/validateAccount';
import auth from '../checkAuth';
// import staffAuth from '../checkAuth/staffAuth';

const router = express.Router();


router.post('/', validateAccount.creation, AccountController.create);

router.patch('/:accountNumber', validateAccount.activation, AccountController.activate);

router.delete('/:accountNumber', validateAccount.deletion, AccountController.delete);

router.get('/', AccountController.listAllAccounts);

router.get('/:accountNumber', validateAccount.listing, AccountController.listAccount);

router.get('/:accountNumber/:transactions', validateAccount.getTransactions, AccountController.getTransactions);

router.get('/user/:userEmailAddress/:accounts', validateAccount.getUserBankAccounts, AccountController.getUserBankAccounts);


export default router;
