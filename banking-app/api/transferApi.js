// api for handling actions from React and passing them as api calls to the src/routes

import axios from 'axios';

const API = axios.create({
	baseURL: 'http://localhost:3000',
});

export async function createTransfer(data) {
	return await API.post('/transfers', data);
}

/*
const handleSubmit = async (e) => {
	e.preventDefault();

	try {
		const response = await createTransfer({
			fromId: Number(form.fromId),
			toId: Number(form.toId),
			amount: Number(form.amount),
		});

		setMessage(response.data.message);
	} catch (error) {
		setMessage(error.response?.data?.error || 'Transfer failed');
	}
};
*/
