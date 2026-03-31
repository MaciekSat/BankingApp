// maps HTTP request to code and passes data to src/controllers

import express from 'express';
import { constructAccount, retrieveAccountsAuth, updateAccountName } from '../controllers/accountController.js';

const router = express.Router();

router.post('/createAccount', constructAccount);

router.get('/getAccountsAuth', retrieveAccountsAuth);

router.patch('/changeAccountName', updateAccountName);

export default router;
