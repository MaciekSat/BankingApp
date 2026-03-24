// handles requests/responses and passes data to src/services

import { createAccount, retrieveAccountDB } from '../services/accountService.js';

export async function constructAccount(req, res) {
	const { userId } = req.body;

	if (!userId) {
		return res.status(400).json({
			error: 'Missing required fields',
		});
	}

	try {
		await createAccount(userId);

		res.status(200).json({
			message: 'Account successfully created',
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({
			error: 'Internal server error',
		});
	}
}

export async function retrieveAccountAuth(req, res) {
	const userId = req.query.userId;
	const authenticated = req.query.authenticated;

	if (!userId) {
		return res.status(400).json({
			error: 'Missing required fields',
		});
	}

	if (!authenticated) {
		return res.status(400).json({
			error: 'User not authenticated',
		});
	}

	try {
		const result = await retrieveAccountDB(userId);

		const account = {
			id: result.outBinds.a_id,
			balance: result.outBinds.a_balance,
			userId: userId,
		};

		return res.status(200).json({ account: account, message: 'Retrieved account' });
	} catch (error) {
		if (error.errorNum === 20002) {
			return res.status(400).json({
				error: 'Account not found',
			});
		}

		console.error(error);

		res.status(500).json({
			error: 'Internal server error',
		});
	}
}
