// handles requests/responses and passes data to src/services

import { createUser, retrieveUserDB } from '../services/userService.js';
import * as argon2 from 'argon2';

export async function constructUser(req, res) {
	const { username, surname, email, password } = req.body;

	if (!username || !surname || !email || !password) {
		return res.status(400).json({
			error: 'Missing required fields',
		});
	}

	try {
		const hash = await argon2.hash(password, { type: argon2.argon2i });

		try {
			await createUser(username, surname, email, hash);

			res.status(200).json({
				message: 'User successfully created',
			});
		} catch (error) {
			if (error.errorNum === 20001) {
				return res.status(400).json({
					error: 'This user already exists, try logging in',
				});
			}

			console.error(error);

			res.status(500).json({
				error: 'Internal server error',
			});
		}
	} catch (err) {
		return res.status(400).json({
			error: 'Troubles with hashing password',
		});
	}
}

export async function retrieveUser(req, res) {
	const email = req.query.email;
	const password = req.query.password;

	if (!email || !password) {
		return res.status(400).json({
			error: 'Missing required fields',
		});
	}

	try {
		try {
			const result = await retrieveUserDB(email);

			const user = {
				id: result.outBinds.u_id,
				name: result.outBinds.u_name,
				surname: result.outBinds.u_surname,
				email: email,
				hash: result.outBinds.u_hash,
			};

			try {
				if (await argon2.verify(result.outBinds.u_hash, password)) {
					return res.status(200).json({ user: user, message: 'User successfully verified' });
				} else {
					return res.status(400).json({
						error: 'Wrong password',
					});
				}
			} catch (err) {
				res.status(500).json({
					error: 'Internal server error',
				});
			}
		} catch (error) {
			if (error.errorNum === 20002) {
				return res.status(400).json({
					error: 'User not found',
				});
			}

			console.error(error);

			res.status(500).json({
				error: 'Internal server error',
			});
		}
	} catch (err) {
		return res.status(400).json({
			error: 'Troubles with hashing password',
		});
	}
}

export async function retrieveUserAuth(req, res) {
	const email = req.query.email;
	const authenticated = req.query.authenticated;

	if (!email) {
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
		const result = await retrieveUserDB(email);

		const user = {
			id: result.outBinds.u_id,
			name: result.outBinds.u_name,
			surname: result.outBinds.u_surname,
			email: email,
			hash: result.outBinds.u_hash,
		};

		return res.status(200).json({ user: user, message: 'Retrieved user' });
	} catch (error) {
		if (error.errorNum === 20002) {
			return res.status(400).json({
				error: 'User not found',
			});
		}

		console.error(error);

		res.status(500).json({
			error: 'Internal server error',
		});
	}
}
