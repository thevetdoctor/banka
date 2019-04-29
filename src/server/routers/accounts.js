import express from 'express';
import AccountController from '../controllers/accounts';
import validateAccount from '../helper/validateAccount';
import auth from '../checkAuth';
import staffAuth from '../checkAuth/staffAuth';
import ownerAuth from '../checkAuth/ownerAuth';
import ownerEmailAuth from '../checkAuth/ownerEmailAuth';

const router = express.Router();


// Create bank account
router.post('/', auth, validateAccount.creation, AccountController.create);

// Admin / Staff can activate or deactivate an account
router.patch('/:accountNumber', auth, staffAuth, validateAccount.activation, AccountController.activate);

// Admin / Staff can delete an account
router.delete('/:accountNumber', auth, staffAuth, validateAccount.deletion, AccountController.delete);

// User can view account transaction history
router.get('/:accountNumber/:transactions', auth, validateAccount.getTransactions, ownerAuth, AccountController.getTransactions);

// User can view account details
// Staff/Admin can view all active bank accounts
// Staff/Admin can view all dormant bank accounts
router.get('/:accountNumber', auth, validateAccount.listing, ownerAuth, AccountController.listAccount);

// Admin / staff can view a list of accounts owned by a specific user
router.get('/user/:userEmailAddress/:accounts', auth, validateAccount.getUserBankAccounts, ownerEmailAuth, AccountController.getUserBankAccounts);

// Staff / Admin can view all bank accounts
router.get('/', auth, staffAuth, AccountController.listAllAccounts);


export default router;
