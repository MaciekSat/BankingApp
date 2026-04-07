// maps HTTP request to code and passes data to src/controllers

import express from 'express';
import { transferMoneyController, getTransfersController } from '../controllers/transferController.js';

const router = express.Router();

router.post('/createTransfer', transferMoneyController);

router.get('/getTransfers', getTransfersController);

export default router;
