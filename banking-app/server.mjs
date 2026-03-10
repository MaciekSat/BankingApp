import express from 'express';
import cors from 'cors';
import { initPool } from './db/database.js';
import transferRoutes from './routes/transfers.js';
import userRoutes from './routes/users.js';

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/transfers', transferRoutes);
app.use('/users', userRoutes);

const PORT = 3000;

async function startServer() {
	try {
		await initPool();
		console.log('Database pool initialized');

		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});

		// app.post('/users', (req, res) => {
		// 	console.log('POST /users hit', req.body);
		// 	res.send({ ok: true });
		// });
	} catch (err) {
		console.error('Failed to start server:', err);
		process.exit(1);
	}
}

startServer();
