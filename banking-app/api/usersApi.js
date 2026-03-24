// api for handling actions from React and passing them as api calls to the src/routes

import axios from 'axios';

const API = axios.create({
	baseURL: 'http://localhost:3000',
});

export async function createUser(data) {
	return await API.post('/users/createUser', data);
}

// used only for retrieving info from db, without auth, only used on login
export async function getUser(email, password) {
	const user = await API.get('/users/getUser', {
		params: { email, password },
	});
	return user;
}

// used for retrieving info about user inside modules, it prevents retrieving info from unauthorized user
export async function getUserAuth(email, authenticated) {
	if (!authenticated) {
		return { error: 'User is not authenticated' };
	} else {
		return await API.get('/users/getUserAuth', {
			params: { email, authenticated },
		});
	}
}
