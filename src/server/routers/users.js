import express from 'express';
import UserController from '../controllers/users';
import validateUser from '../helper/validateUser';

const router = express.Router();

// User sign up
router.post('/signup', validateUser.validateSignup, UserController.signup);

// User sign in
router.post('/signin', validateUser.validateSignin, UserController.signin);


export default router;
