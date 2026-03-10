import oracledb from 'oracledb';
import dotenv from 'dotenv';

dotenv.config();

export async function initPool() {
	await oracledb.createPool({
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		connectString: process.env.DB_CONNECT,
		poolMin: 2,
		poolMax: 10,
		poolIncrement: 1,
	});

	console.log('Oracle connection pool started.');
}

export async function getConnection() {
	return await oracledb.getConnection();
}
