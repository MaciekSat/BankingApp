// actual database procedures usage

import { getConnection } from '../db/database.js';
import oracledb from 'oracledb';

export async function createUser(name, surname, email, hash) {
	let connection;

	try {
		connection = await getConnection();

		await connection.execute(
			`
            BEGIN
                create_user(:name, :surname, :email, :hash);
            END;
            `,
			{
				name,
				surname,
				email,
				hash,
			},
		);

		// await connection.commit();

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

export async function retrieveUserDB(u_email) {
	let connection;

	try {
		connection = await getConnection();

		const result = await connection.execute(
			`
    		BEGIN
        		get_user(:u_email, :u_name, :u_surname, :u_hash);
    		END;
    		`,
			{
				u_email: u_email,
				u_name: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 100 },
				u_surname: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 100 },
				u_hash: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 100 },
			},
		);

		// await connection.commit();

		return result;
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
