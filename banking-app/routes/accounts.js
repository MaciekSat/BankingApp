// maps HTTP request to code and passes data to src/controllers

import express from 'express';
import {
	createAccountController,
	getAccountsAuthController,
	changeAccountNameController,
} from '../controllers/accountController.js';

const router = express.Router();

router.post('/createAccount', createAccountController);

router.get('/getAccountsAuth', getAccountsAuthController);

router.patch('/changeAccountName', changeAccountNameController);

export default router;
