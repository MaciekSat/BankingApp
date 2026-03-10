// maps HTTP request to code and passes data to src/controllers

import express from 'express';
import { constructUser, retrieveUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/createUser', constructUser);

router.get('/getUser', retrieveUser);

export default router;
