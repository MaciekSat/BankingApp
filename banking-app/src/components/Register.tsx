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

	const labelItem = 'block text-start text-sm font-medium text-slate-600';
	const selectItem = 'border-2 bg-slate-100/30 border-mist-200 focus:border-mist-300 focus:bg-slate-200/50';

	return (
		<section className="bgIm1 flex h-screen items-center justify-center">
			<div className="glassEdgeLess flex w-1/3 flex-col items-center justify-center p-10 *:w-full *:rounded-lg *:p-2 *:outline-none">
				<h1 className="text-center text-3xl">Create your bank account</h1>
				<hr style={{ borderRadius: 0, marginTop: 10, borderColor: 'slategray' }} />
				<label htmlFor="fname" className={labelItem}>
					First name
				</label>
				<input
					placeholder="Enter your first name"
					type="text"
					id="fname"
					className={selectItem}
					onChange={(e) => setUsername(e.target.value)}
				/>
				{/* ------------ */}
				<label htmlFor="lname" className={labelItem}>
					Last name
				</label>
				<input
					placeholder="Enter your last name"
					type="text"
					id="lname"
					className={selectItem}
					onChange={(e) => setSurname(e.target.value)}
				/>
				{/* ------------ */}
				<label htmlFor="email" className={labelItem}>
					E-mail
				</label>
				<input
					placeholder="Enter your e-mail"
					type="email"
					id="email"
					className={selectItem}
					onChange={(e) => setEmail(e.target.value)}
				/>
				{/* ------------ */}
				<label htmlFor="pass" className={labelItem}>
					Password
				</label>
				<input
					placeholder="Enter your password"
					type="password"
					id="pass"
					className={selectItem}
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
