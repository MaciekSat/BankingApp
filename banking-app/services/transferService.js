// actual database procedures usage

import { getConnection } from '../db/database.js';

export async function transferMoney(fromId, toId, amount) {
	let connection;

	try {
		connection = await getConnection();

		await connection.execute(
			`
            BEGIN
                transfer_money(:fromId, :toId, :amount);
            END;
            `,
			{
				fromId,
				toId,
				amount,
			},
		);

		await connection.commit();

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
