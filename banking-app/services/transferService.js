// actual database procedures usage

import { getConnection } from '../db/database.js';
import oracledb from 'oracledb';

export async function transferMoneyService(accountId, toId, amount, transactionType) {
	let connection;

	try {
		connection = await getConnection();

		await connection.execute(
			`
            BEGIN
                transfer_money(:account_id, :to_id, :amount, :transaction_type);
            END;
            `,
			{
				account_id: accountId,
				to_id: toId,
				amount: amount,
				transaction_type: transactionType,
			},
		);

		return { success: true };
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

export async function getTransfersService(accountId) {
	let connection;

	try {
		connection = await getConnection();

		const result = await connection.execute(
			`
			BEGIN
				get_transactions(:a_id, :cursor);
			END;
			`,
			{
				a_id: accountId,
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
