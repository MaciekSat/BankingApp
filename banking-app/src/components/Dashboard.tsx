// @ts-ignore
import { getUser, getUserAuth } from '../../api/usersApi.js';
import { useEffect, useState } from 'react';
import { Home } from './dashboardComponents/Home.tsx';

type DashboardProps = {
	onNext: (active: string) => void;
	mail: string;
	authenticated: boolean;
};

export function Dashboard({ mail, authenticated, onNext }: DashboardProps) {
	const [userData, setUserData] = useState<any>(null);
	const [view, setView] = useState<any>('home');

	const menuItem = 'w-4/5 cursor-pointer rounded-lg hover:bg-sky-700 p-2 text-slate-50 flex items-center justify-start gap-2';

	if (!authenticated) {
		return (
			<section className="flex h-screen flex-col items-center justify-center bg-gray-950">
				<div className="flex flex-col gap-2 rounded-2xl bg-gray-900 p-10 text-slate-200">
					<h1 className="text-2xl">Please verify user</h1>
					<button className="mt-5 cursor-pointer rounded-lg bg-sky-700 p-3" onClick={() => onNext('login')}>
						Return to login
					</button>
				</div>
			</section>
		);
	}

	useEffect(() => {
		if (!authenticated) return;

		const fetchUser = async () => {
			const userData = await handleUser(mail, authenticated);
			setUserData(userData.user);
		};

		fetchUser();
	}, [mail, authenticated]);

	return (
		<section className="flex h-screen flex-col items-center justify-center bg-gray-950">
			<div className="flex h-screen w-screen flex-col gap-2 p-2">
				<div className="flex items-center justify-start rounded-2xl bg-sky-800 p-3 text-3xl text-slate-200">
					Good morning, {`${userData?.name} `} {`${userData?.surname} `}
				</div>

				<div className="flex h-11/12 gap-2 rounded-2xl bg-gray-900 p-2 text-slate-200">
					{view == 'home' && <Home userData={'17,589.56'} />}
					<div className="h-full w-3/20 rounded-[calc(var(--radius-3xl)-(--spacing(2)))] bg-gray-950 p-2">
						<div className="flex h-full w-full flex-col justify-start gap-3 rounded-[calc(var(--radius-2xl)-(--spacing(2)))] bg-gray-900 p-2 px-5">
							<p className="mt-3 w-4/5 text-start text-2xl">Main</p>
							<button className={menuItem} onClick={() => setView('home')}>
								<i className="bi bi-house"></i>
								<p>Home</p>
							</button>
							<button className={menuItem} onClick={() => setView('transactions')}>
								<i className="bi bi-file-earmark-text"></i>
								<p>Transactions</p>
							</button>
							<button className={menuItem} onClick={() => setView('cards')}>
								<i className="bi bi-credit-card-2-front"></i>
								<p>Banking cards</p>
							</button>
							<button className={menuItem} onClick={() => setView('investments')}>
								<i className="bi bi-graph-up"></i>
								<p>Investments</p>
							</button>
							<p className="mt-10 w-4/5 text-start text-2xl">Payments</p>
							<button className={menuItem} onClick={() => setView('history')}>
								<i className="bi bi-clock-history"></i>
								<p>History</p>
							</button>
							<button className={menuItem} onClick={() => setView('analytics')}>
								<i className="bi bi-pie-chart"></i>
								<p>Analytics</p>
							</button>
							<p className="mt-10 w-4/5 text-start text-2xl">Account</p>
							<button className={menuItem} onClick={() => setView('settings')}>
								<i className="bi bi-gear"></i>
								<p>Settings</p>
							</button>
							<button className={menuItem} onClick={() => onNext('login')}>
								<i className="bi bi-box-arrow-in-left"></i>
								<p>Log out</p>
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

async function handleUser(mail: string, authenticated: boolean) {
	try {
		const response = await getUserAuth(mail, authenticated);

		if (response.status === 200) {
			return response.data;
		} else {
			console.error('Failed to fetch user data');
			return null;
		}
	} catch (error) {
		const err = error as any;
		console.error(err.response?.data || err.message);
		return null;
	}
}
