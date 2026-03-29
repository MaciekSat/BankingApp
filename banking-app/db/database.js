// db/database.js
import oracledb from 'oracledb';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// Determine if wallet mode is active
const useWallet = !!process.env.DB_WALLET_PATH && !!process.env.DB_LIB_DIR;

if (useWallet) {
	// Oracle Cloud wallet mode
	oracledb.initOracleClient({
		libDir: path.resolve(process.env.DB_LIB_DIR),
		configDir: path.resolve(process.env.DB_WALLET_PATH),
	});
	if (process.env.DB_WALLET_PATH) {
		console.log('Running in Oracle Cloud wallet mode');
	} else {
		console.log('Running in local DB mode');
	}
}

export async function initPool() {
	await oracledb.createPool({
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		connectString: process.env.DB_CONNECT, // tns alias if wallet, plain string if local
		poolMin: 2,
		poolMax: 10,
		poolIncrement: 1,
	});

	console.log('Oracle connection pool started.');
}

export async function getConnection() {
	return await oracledb.getConnection();
}
