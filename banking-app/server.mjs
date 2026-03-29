import express from 'express';
import cors from 'cors';
import { initPool } from './db/database.js';
import transferRoutes from './routes/transfers.js';
import userRoutes from './routes/users.js';
import accountRoutes from './routes/accounts.js';
import oracledb from 'oracledb';

const { getConnection } = oracledb;

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/transfers', transferRoutes);
app.use('/users', userRoutes);
app.use('/accounts', accountRoutes);

const PORT = 3000;

async function startServer() {
	try {
		await initPool();
		console.log('Database pool initialized');

		// Test connection immediately
		const conn = await getConnection();
		const result = await conn.execute('SELECT sysdate FROM dual');
		console.log('Test query succeeded, DB time:', result.rows[0][0]);
		await conn.close();

		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	} catch (err) {
		console.error('Failed to start server:', err);
		process.exit(1);
	}
}

startServer();
