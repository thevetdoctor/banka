import express from 'express';
import UserController from '../controllers/users';
import validateSignup from '../helper/validateSignup';
import validateSignin from '../helper/validateSignin';

const router = express.Router();


router.post('/signup', validateSignup, UserController.signup);

router.post('/signin', validateSignin, UserController.signin);


export default router;
