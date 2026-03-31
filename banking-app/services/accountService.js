// actual database procedures usage

import { getConnection } from '../db/database.js';
import oracledb from 'oracledb';

export async function createAccount(userId) {
	let connection;

	try {
		connection = await getConnection();

		await connection.execute(
			`
            BEGIN
                create_account(:a_user_id);
            END;
            `,
			{
				a_user_id: userId,
			},
		);

		// await connection.commit();

		return { success: true };
	} catch (error) {
		console.log(error);

		if (connection) {
			await connection.rollback();
		}

		throw error;
	} finally {
		if (connection) {
			await connection.close();
		}
	}
}

export async function retrieveAccountsDB(userId) {
	let connection;

	try {
		connection = await getConnection();

		const result = await connection.execute(
			`
			BEGIN
				get_accounts(:u_id, :cursor);
			END;
			`,
			{
				u_id: userId,
				cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
			},
			{ outFormat: oracledb.OUT_FORMAT_OBJECT },
		);

		const resultSet = result.outBinds.cursor;

		const rows = await resultSet.getRows();

		await resultSet.close();

		return rows;
	} catch (error) {
		if (connection) {
			await connection.rollback();
		}

		throw error;
	} finally {
		if (connection) {
			await connection.close();
		}
	}
}

export async function changeAccountName(accountId, accountName) {
	let connection;

	try {
		connection = await getConnection();

		await connection.execute(
			`
            BEGIN
                change_account_name(:a_id, :account_name);
            END;
            `,
			{
				a_id: accountId,
				account_name: accountName,
			},
		);

		// await connection.commit();

		return { success: true };
	} catch (error) {
		console.log(error);

		if (connection) {
			await connection.rollback();
		}

		throw error;
	} finally {
		if (connection) {
			await connection.close();
		}
	}
}
