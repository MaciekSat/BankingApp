import { useState } from 'react';
// @ts-ignore
import { getUser } from '../../api/usersApi.js';

type LoginProps = {
	onNext: (active: string) => void;
};

export function Login({ onNext }: LoginProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	return (
		<section className="flex h-screen items-center justify-center">
			<div className="flex w-1/3 flex-col items-center justify-center rounded-lg border-2 border-gray-200 p-10 *:w-full *:rounded-lg *:p-2 *:outline-none">
				<h1 className="text-center text-3xl">Login to your bank account</h1>
				<hr style={{ borderRadius: 0, marginTop: 10, borderColor: 'lightgray' }} />
				{/* ------------ */}
				<label htmlFor="email" className="block text-start text-sm font-medium text-gray-700">
					E-mail
				</label>
				<input
					placeholder="Enter your e-mail"
					type="email"
					id="email"
					className="border-2 border-gray-200 focus:border-blue-200"
					onChange={(e) => setEmail(e.target.value)}
				/>
				{/* ------------ */}
				<label htmlFor="pass" className="block text-start text-sm font-medium text-gray-700">
					Password
				</label>
				<input
					placeholder="Enter your password"
					type="password"
					id="pass"
					className="border-2 border-gray-200 focus:border-blue-200"
					onChange={(e) => setPassword(e.target.value)}
				/>
				{/* ------------ */}
				<button
					className="mt-5 cursor-pointer rounded-lg bg-sky-300"
					onClick={async () => {
						setMessage('');
						setError('');
						await handleSubmit(email, password, setMessage, setError, onNext);
					}}>
					Login to account
				</button>
				{message && <p className="mt-4 text-center font-medium text-green-500">{message}</p>}
				{error && <p className="mt-4 text-center font-medium text-red-500">{error}</p>}
				<button className="mt-5 cursor-pointer rounded-lg bg-sky-100" onClick={() => onNext('login')}>
					Navigate to register page
				</button>
			</div>
		</section>
	);
}

const handleSubmit = async (email: string, password: string, setMessage: any, setError: any, onNext: any) => {
	try {
		const response = await getUser(email, password);

		console.log(response);
		if (response.status == 200) {
			setMessage(response.data.message);
			setTimeout(() => onNext('dashboard'), 3000);
		} else {
			setError(response.data.message);
		}
	} catch (error) {
		const err = error as any;
		setError(err.response.data.error);
		console.error(err.response?.data || err.message);
	}
};
