// api for handling actions from React and passing them as api calls to the src/routes

import axios from 'axios';

const API = axios.create({
	baseURL: 'http://localhost:3000',
});

export async function createTransfer(data) {
	return await API.post('/transfers/createTransfer', data);
}

export async function getTransfers(accountId) {
	return await API.get('/transfers/getTransfers', {
		params: { accountId },
	});
}
