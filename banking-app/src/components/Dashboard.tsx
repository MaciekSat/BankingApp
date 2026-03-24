// @ts-ignore
import { createUser, getUserAuth } from '../../api/usersApi.js';
// @ts-ignore
import { createAccount, getAccountAuth } from '../../api/accountsApi.js';
import { useEffect, useState } from 'react';
import { Home } from './dashboardComponents/Home.tsx';

type DashboardProps = {
	onNext: (active: string) => void;
	logOut: (authenticated: boolean) => void;
	mail: string;
	authenticated: boolean;
};

export function Dashboard({ mail, authenticated, onNext, logOut }: DashboardProps) {
	const [userData, setUserData] = useState<any>({ user: null, account: null });
	const [view, setView] = useState<any>('home');

	const menuItem = 'w-4/5 cursor-pointer rounded-lg hover:bg-mist-400 p-2 text-slate-800 flex items-center justify-start gap-2';

	if (!authenticated) {
		return (
			<section className="flex h-screen flex-col items-center justify-center bg-slate-200">
				<div className="flex flex-col gap-2 rounded-2xl bg-slate-300 p-10 text-slate-800 shadow-2xl">
					<h1 className="text-2xl">Please verify user</h1>
					<button className="mt-5 cursor-pointer rounded-lg bg-slate-200 p-3" onClick={() => onNext('login')}>
						Return to login
					</button>
				</div>
			</section>
		);
	}

	useEffect(() => {
		if (!authenticated) return;

		const fetchData = async () => {
			const userData = await handleUser(mail, authenticated);

			if (!userData?.user) return;

			setUserData({
				user: userData.user,
				account: null,
			});

			const accountData = await handleAccount(userData.user.id, authenticated);

			setUserData({
				user: userData.user,
				account: accountData.account,
			});
		};

		fetchData();
	}, [mail, authenticated]);

	return (
		<section className="flex h-screen flex-col items-center justify-center bg-slate-200">
			<div className="flex h-screen w-screen flex-col gap-2 p-2">
				<div className="flex items-center justify-start rounded-2xl bg-linear-170 from-slate-400 to-mist-500 p-3 text-3xl text-slate-100 shadow-2xl">
					Good morning, {`${userData.user?.name} `} {`${userData.user?.surname} `}
				</div>

				<div className="flex h-11/12 gap-2 rounded-3xl bg-slate-200 p-5 text-slate-800 shadow-2xl">
					{view == 'home' && <Home userData={userData} />}
					<div className="flex h-full w-3/20 flex-col justify-start gap-3 rounded-3xl border border-slate-200 bg-slate-300 p-2 px-5 shadow-2xl">
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
						<button
							className={menuItem}
							onClick={() => {
								onNext('login');
								logOut(false); // it sets authenticated as false not logged out as false
							}}>
							<i className="bi bi-box-arrow-in-left"></i>
							<p>Log out</p>
						</button>
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

async function handleAccount(userId: string, authenticated: boolean) {
	try {
		const response = await getAccountAuth(userId, authenticated);

		if (response.status === 200) {
			return response.data;
		} else {
			console.error('Failed to fetch account data');
			return null;
		}
	} catch (error) {
		const err = error as any;
		console.error(err.response?.data || err.message);
		return null;
	}
}
