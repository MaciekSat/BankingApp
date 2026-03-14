// maps HTTP request to code and passes data to src/controllers

import express from 'express';
import { constructUser, retrieveUser, retrieveUserAuth } from '../controllers/userController.js';

const router = express.Router();

router.post('/createUser', constructUser);

router.get('/getUser', retrieveUser);

router.get('/getUserAuth', retrieveUserAuth);

export default router;
