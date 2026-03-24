import { useState } from 'react';
// @ts-ignore
import { createUser } from '../../api/usersApi.js';

type RegisterProps = {
	onNext: (active: string) => void;
};

export function Register({ onNext }: RegisterProps) {
	const [username, setUsername] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	const labelItem = 'block text-start text-sm font-medium text-slate-600';
	const selectItem = 'border-2 border-mist-200 focus:border-mist-400';

	return (
		<section className="flex h-screen items-center justify-center bg-slate-200">
			<div className="flex w-1/3 flex-col items-center justify-center rounded-3xl bg-slate-300 p-10 text-slate-800 shadow-2xl *:w-full *:rounded-lg *:p-2 *:outline-none">
				<h1 className="text-center text-3xl">Create your bank account</h1>
				<hr style={{ borderRadius: 0, marginTop: 10, borderColor: 'lightgray' }} />
				<label htmlFor="fname" className={labelItem}>
					First name
				</label>
				<input placeholder="Enter your first name" type="text" id="fname" className={selectItem} onChange={(e) => setUsername(e.target.value)} />
				{/* ------------ */}
				<label htmlFor="lname" className={labelItem}>
					Last name
				</label>
				<input placeholder="Enter your last name" type="text" id="lname" className={selectItem} onChange={(e) => setSurname(e.target.value)} />
				{/* ------------ */}
				<label htmlFor="email" className={labelItem}>
					E-mail
				</label>
				<input placeholder="Enter your e-mail" type="email" id="email" className={selectItem} onChange={(e) => setEmail(e.target.value)} />
				{/* ------------ */}
				<label htmlFor="pass" className={labelItem}>
					Password
				</label>
				<input placeholder="Enter your password" type="password" id="pass" className={selectItem} onChange={(e) => setPassword(e.target.value)} />
				{/* ------------ */}
				<button
					className="mt-5 cursor-pointer rounded-lg bg-slate-400 text-slate-800"
					onClick={async () => {
						setMessage('');
						setError('');
						await handleSubmit(username, surname, email, password, setMessage, setError, onNext);
					}}>
					Create account
				</button>
				{message && <p className="mt-4 text-center font-medium text-green-500">{message}</p>}
				{error && <p className="mt-4 text-center font-medium text-red-500">{error}</p>}
				<button className="mt-5 cursor-pointer rounded-lg bg-slate-200 text-slate-800" onClick={() => onNext('login')}>
					Navigate to login page
				</button>
			</div>
		</section>
	);
}

const handleSubmit = async (username: string, surname: string, email: string, password: string, setMessage: any, setError: any, onNext: any) => {
	try {
		const response = await createUser({
			username: username,
			surname: surname,
			email: email,
			password: password,
		});

		console.log(response);
		if (response.status == 200) {
			setMessage(response.data.message);
			setTimeout(() => onNext('login'), 3000);
		} else {
			setError(response.data.message);
		}
	} catch (error) {
		const err = error as any;
		setError(err.response.data.error);
		console.error(err.response?.data || err.message);
	}
};
