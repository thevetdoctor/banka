import express from 'express';
import AccountController from '../controllers/accounts';
import validateAccount from '../helper/validateAccount';
import auth from '../checkAuth';
// import staffAuth from '../checkAuth/staffAuth';

const router = express.Router();


router.post('/', auth, validateAccount.creation, AccountController.create);

router.patch('/:accountNumber', auth, validateAccount.activation, AccountController.activate);

router.delete('/:accountNumber', auth, validateAccount.deletion, AccountController.delete);

router.get('/', auth, AccountController.listAllAccounts);

router.get('/:accountNumber', auth, validateAccount.listing, AccountController.listAccount);

router.get('/:accountNumber/:transactions', auth, validateAccount.getTransactions, AccountController.getTransactions);

router.get('/user/:userEmailAddress/:accounts', auth, validateAccount.getUserBankAccounts, AccountController.getUserBankAccounts);


export default router;
