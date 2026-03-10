// handles requests/responses and passes data to src/services

import { transferMoney } from '../services/transferService.js';

export async function createTransfer(req, res) {
	const { fromId, toId, amount } = req.body;

	if (!fromId || !toId || !amount) {
		return res.status(400).json({
			error: 'Missing required fields',
		});
	}

	try {
		await transferMoney(fromId, toId, amount);

		res.status(200).json({
			message: 'Transfer successful',
		});
	} catch (error) {
		if (error.errorNum === 20001) {
			return res.status(400).json({
				error: 'Insufficient funds',
			});
		}

		console.error(error);

		res.status(500).json({
			error: 'Internal server error',
		});
	}
}
