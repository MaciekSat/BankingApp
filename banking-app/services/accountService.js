// actual database procedures usage

import { getConnection } from '../db/database.js';
import oracledb from 'oracledb';

export async function createAccount(a_user_id) {
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
				a_user_id,
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

export async function retrieveAccountDB(userId) {
	let connection;

	try {
		connection = await getConnection();

		return await connection.execute(
			`
    		BEGIN
        		get_account(:u_id, :a_id, :a_balance);
    		END;
    		`,
			{
				u_id: userId,
				a_id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER, maxSize: 100 },
				a_balance: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER, maxSize: 100 },
			},
		);
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
