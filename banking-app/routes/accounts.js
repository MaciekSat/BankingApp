// maps HTTP request to code and passes data to src/controllers

import express from 'express';
import { constructAccount, retrieveAccountAuth } from '../controllers/accountController.js';

const router = express.Router();

router.post('/createAccount', constructAccount);

router.get('/getAccountAuth', retrieveAccountAuth);

export default router;
