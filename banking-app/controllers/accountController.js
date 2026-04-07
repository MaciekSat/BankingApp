// handles requests/responses and passes data to src/services

import { createAccountService, getAccountsAuthService, changeAccountNameService } from '../services/accountService.js';

export async function createAccountController(req, res) {
	const { userId } = req.body;

	if (!userId) {
		return res.status(400).json({
			error: 'Missing required fields',
		});
	}

	try {
		await createAccountService(userId);

		res.status(200).json({
			message: 'Account successfully created. Wait for changes',
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({
			error: 'Internal server error',
		});
	}
}

export async function getAccountsAuthController(req, res) {
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
		const rows = await getAccountsAuthService(userId);

		/*
		only sort if there will be some problems with order
		const accounts = rows
			.map((row) => ({
				id: row.ID_ACCOUNT,
				balance: row.BALANCE,
				accountName: row.ACC_NAME,
				userId: userId,
			}))
			.sort((a, b) => a.id - b.id);

		 */

		const accounts = rows.map((row) => ({
			id: row.ID_ACCOUNT,
			balance: row.BALANCE,
			accountName: row.ACC_NAME,
			userId: userId,
		}));

		console.log(rows.map((r) => r.ID_ACCOUNT));

		return res.status(200).json({ accounts, message: 'Retrieved account' });
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

export async function changeAccountNameController(req, res) {
	const { accountId, accountName } = req.body;

	if (!accountId || !accountName) {
		return res.status(400).json({
			error: 'Missing required fields',
		});
	}

	try {
		await changeAccountNameService(accountId, accountName);

		res.status(200).json({
			message: 'Account name successfully changed. Wait for changes',
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({
			error: 'Internal server error',
		});
	}
}
