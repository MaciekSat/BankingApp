import { useState } from 'react';
// @ts-ignore
import { createUser } from '../../api/usersApi.js';
import { toast } from 'react-hot-toast';

type RegisterProps = {
	onNext: (active: string) => void;
};

export function Register({ onNext }: RegisterProps) {
	const [username, setUsername] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<section className="bgIm1 flex h-screen items-center justify-center">
			<div className="glassEdgeLess flex w-1/3 flex-col items-center justify-center p-10 *:w-full *:rounded-lg *:p-2 *:outline-none">
				<h1 className="text-center text-3xl">Create your bank account</h1>
				<hr style={{ borderRadius: 0, marginTop: 10, borderColor: 'slategray' }} />
				<label htmlFor="fname" className="label">
					First name
				</label>
				<input
					placeholder="Enter your first name"
					type="text"
					id="fname"
					className="glassInput"
					onChange={(e) => setUsername(e.target.value)}
				/>
				{/* ------------ */}
				<label htmlFor="lname" className="label">
					Last name
				</label>
				<input
					placeholder="Enter your last name"
					type="text"
					id="lname"
					className="glassInput"
					onChange={(e) => setSurname(e.target.value)}
				/>
				{/* ------------ */}
				<label htmlFor="email" className="label">
					E-mail
				</label>
				<input
					placeholder="Enter your e-mail"
					type="email"
					id="email"
					className="glassInput"
					onChange={(e) => setEmail(e.target.value)}
				/>
				{/* ------------ */}
				<label htmlFor="pass" className="label">
					Password
				</label>
				<input
					placeholder="Enter your password"
					type="password"
					id="pass"
					className="glassInput"
					onChange={(e) => setPassword(e.target.value)}
				/>
				{/* ------------ */}
				<button
					className="glassButton mt-5"
					onClick={async () => {
						await handleSubmit(username, surname, email, password, onNext);
					}}>
					Create account
				</button>
				<button className="glassButtonSec mt-5" onClick={() => onNext('login')}>
					Navigate to login page
				</button>
			</div>
		</section>
	);
}

const handleSubmit = async (username: string, surname: string, email: string, password: string, onNext: any) => {
	try {
		const response = await createUser({
			username: username,
			surname: surname,
			email: email,
			password: password,
		});

		console.log(response);
		if (response.status == 200) {
			toast.success(response.data.message || 'User registered successfully');
			setTimeout(() => onNext('login'), 3000);
		} else {
			toast.error(response.data.message || 'User registration failed');
		}
	} catch (error) {
		const err = error as any;
		toast.error(err.response?.data.error || 'Missing fields');
	}
};
