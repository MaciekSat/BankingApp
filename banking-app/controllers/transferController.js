// handles requests/responses and passes data to src/services

import { transferMoneyService, getTransfersService } from '../services/transferService.js';

export async function transferMoneyController(req, res) {
	const { accountId, toId, amount, transactionType } = req.body;

	if (!accountId || !toId || !amount || !transactionType) {
		return res.status(400).json({
			error: 'Missing required fields',
		});
	}

	try {
		await transferMoneyService(accountId, toId, amount, transactionType);

		res.status(200).json({
			message: 'Transfer successful',
		});
	} catch (error) {
		if (error.errorNum === 20002) {
			return res.status(400).json({
				error: 'No such account',
			});
		}

		if (error.errorNum === 20003) {
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

export async function getTransfersController(req, res) {
	const accountId = req.query.accountId;

	if (!accountId) {
		return res.status(400).json({
			error: 'Missing required fields',
		});
	}

	try {
		const rows = await getTransfersService(accountId);

		const transactions = rows.map((row) => ({
			id: row.ID_TRANSACTION,
			accountId: accountId,
			transactionDate: row.DATE_TRANSACTION,
			toAccountId: row.ID_ACCOUNT_TO,
			amount: row.AMOUNT,
			transactionType: row.TYPE_TRANSACTION,
		}));

		return res.status(200).json({ transactions, message: 'Retrieved transfers' });
	} catch (error) {
		if (error.errorNum === 20002) {
			return res.status(400).json({
				error: 'No transactions found',
			});
		}

		console.error(error);

		res.status(500).json({
			error: 'Internal server error',
		});
	}
}
