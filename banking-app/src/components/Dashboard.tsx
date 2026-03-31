// @ts-ignore
import { createUser, getUserAuth } from '../../api/usersApi.js';
// @ts-ignore
import { createAccount, getAccountsAuth } from '../../api/accountsApi.js';
import { useEffect, useState } from 'react';
import { Home } from './dashboardComponents/Home.tsx';

type DashboardProps = {
	onNext: (active: string) => void;
	logOut: (authenticated: boolean) => void;
	mail: string;
	authenticated: boolean;
};

export function Dashboard({ mail, authenticated, onNext, logOut }: DashboardProps) {
	const [userData, setUserData] = useState<any>({});
	const [view, setView] = useState<any>('home');

	const menuItem = 'w-full p-2 glassButtonHidden flex items-center justify-start gap-2';

	if (!authenticated) {
		return (
			<section className="bgIm1 flex h-screen flex-col items-center justify-center">
				<div className="glassEdgeLess flex flex-col gap-2 p-10">
					<h1 className="text-2xl">Please verify user</h1>
					<button className="glassButton mt-5" onClick={() => onNext('login')}>
						Return to login
					</button>
				</div>
			</section>
		);
	}

	const fetchData = async () => {
		const userData = await handleUser(mail, authenticated);

		if (!userData?.user) return;

		setUserData((prev: any) => ({
			...prev,
			user: userData.user,
		}));

		const accountsData = await handleAccounts(userData.user.id, authenticated);

		setUserData((prev: any) => ({
			...prev,
			accounts: accountsData.accounts,
		}));
	};

	useEffect(() => {
		fetchData();
	}, [mail, authenticated]);

	return (
		<section className="bgIm1 flex h-screen flex-col items-center justify-center">
			<div className="flex h-screen w-screen flex-col gap-2 p-2">
				<div className="glassEdgeLess flex items-center justify-start p-3 text-3xl">
					Good morning, {userData.user?.name} {userData.user?.surname}
				</div>

				<div className="glassEdgeLess flex h-11/12 gap-3 p-5">
					{view == 'home' && <Home userData={userData} refreshData={fetchData} />}
					<div className="glass flex h-full w-3/20 flex-col justify-start gap-3 p-2 px-5">
						<p className="mt-3 text-start text-2xl">Main</p>
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
						<p className="mt-10 text-start text-2xl">Payments</p>
						<button className={menuItem} onClick={() => setView('history')}>
							<i className="bi bi-clock-history"></i>
							<p>History</p>
						</button>
						<button className={menuItem} onClick={() => setView('analytics')}>
							<i className="bi bi-pie-chart"></i>
							<p>Analytics</p>
						</button>
						<p className="mt-10 text-start text-2xl">Account</p>
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

async function handleAccounts(userId: string, authenticated: boolean) {
	try {
		const response = await getAccountsAuth(userId, authenticated);

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
