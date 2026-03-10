// maps HTTP request to code and passes data to src/controllers

import express from 'express';
import { createTransfer } from '../controllers/transferController.js';

const router = express.Router();

router.post('/tranfers', createTransfer);

export default router;
