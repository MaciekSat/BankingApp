import { useState } from 'react';
// @ts-ignore
import { getUser } from '../../api/usersApi.js';
import { toast } from 'react-hot-toast';

type LoginProps = {
	onNext: (active: string) => void;
	onVerify: (authenticated: boolean) => void;
	userInfo: (userInfo: string) => void;
};

export function Login({ onNext, onVerify, userInfo }: LoginProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const labelItem = 'block text-start text-sm font-medium text-slate-600';
	const selectItem = 'border-2 bg-slate-100/30 border-mist-200 focus:border-mist-300 focus:bg-slate-200/50';

	return (
		<section className="bgIm1 flex h-screen items-center justify-center">
			<div className="glassEdgeLess flex w-1/3 flex-col items-center justify-center p-10 *:w-full *:rounded-lg *:p-2 *:outline-none">
				<h1 className="text-center text-3xl">Login to your bank account</h1>
				<hr style={{ borderRadius: 0, marginTop: 10, borderColor: 'slategrey' }} />
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
						await handleSubmit(email, password, onNext, onVerify, userInfo);
					}}>
					Login to account
				</button>
				<button className="glassButtonSec mt-5" onClick={() => onNext('register')}>
					Navigate to register page
				</button>
			</div>
		</section>
	);
}

const handleSubmit = async (email: string, password: string, onNext: any, onVerify: any, userInfo: any) => {
	try {
		const response = await getUser(email, password);

		if (response.status == 200) {
			toast.success(response.data.message || 'Login successfully');
			setTimeout(() => onNext('dashboard'), 1000);
			onVerify(true);
			userInfo(email);
		} else {
			toast.error(response.data.message || 'Login failed');
		}
	} catch (error) {
		const err = error as any;
		toast.error(err.response?.data.error || 'Missing fields');
	}
};
