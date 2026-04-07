// maps HTTP request to code and passes data to src/controllers

import express from 'express';
import { createUserController, getUserController, getUserAuthController } from '../controllers/userController.js';

const router = express.Router();

router.post('/createUser', createUserController);

router.get('/getUser', getUserController);

router.get('/getUserAuth', getUserAuthController);

export default router;
