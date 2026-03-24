// api for handling actions from React and passing them as api calls to the src/routes

import axios from 'axios';

const API = axios.create({
	baseURL: 'http://localhost:3000',
});

export async function createAccount(data) {
	return await API.post('/accounts/createAccount', data);
}

// used for retrieving info about user inside modules, it prevents retrieving info from unauthorized user
export async function getAccountAuth(userId, authenticated) {
	if (!authenticated) {
		return { error: 'User is not authenticated' };
	} else {
		return await API.get('/accounts/getAccountAuth', {
			params: { userId, authenticated },
		});
	}
}
