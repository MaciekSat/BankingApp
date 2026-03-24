// @ts-ignore
import { createAccount } from '../../../api/accountsApi.js';

type HomeProps = {
	userData: any;
};

export function Home({ userData }: HomeProps) {
	const quickActionElement = 'flex gap-2 hover:bg-mist-400 p-3 rounded-lg text-lg';
	const recentItems = [
		{ id: 0, icon: 'bi bi-shop-window', type: 'Groceries', date: '21.03.2026', expenses: true, price: '$ 80.95' },
		{ id: 1, icon: 'bi bi-phone', type: 'Electronics', date: '12.03.2026', expenses: true, price: '$ 1,450.94' },
		{ id: 2, icon: 'bi bi-currency-dollar', type: 'Salary', date: '10.02.2026', expenses: false, price: '$ 15,000.00' },
	];

	return (
		<div className="grid h-full w-17/20 grid-cols-4 grid-rows-2 gap-5">
			{/* Banking card */}
			<div className="col-span-2 flex flex-col items-start justify-between gap-5 rounded-2xl border border-slate-200 bg-linear-20 from-sky-100 to-zinc-400 p-5 shadow-2xl">
				<p className="text-2xl">Balance</p>
				<p className="text-5xl">{userData.account?.balance !== undefined ? `$ ${userData.account.balance}` : 'Create account first'}</p>
				<div className="flex items-center gap-5">
					<span className="flex gap-2 border-r-2 border-gray-400 pr-5 text-lg">
						<i className="bi bi-graph-up-arrow"></i>
						<p>Income</p>
						<p className="text-green-400">$ 10,800.00</p>
					</span>
					<span className="flex gap-2 text-lg">
						<i className="bi bi-graph-down-arrow"></i>
						<p>Expenses</p>
						<p className="text-red-500">$ 5,690.90</p>
					</span>
				</div>
			</div>

			{/* Quick actions */}
			<div className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-slate-300 p-5 shadow-2xl">
				<button className={quickActionElement}>
					<i className="bi bi-fast-forward"></i>
					<p>Transfer money</p>
				</button>
				<button className={quickActionElement} onClick={async () => await handleAccountCreate(userData.user.id)}>
					<i className="bi bi-collection"></i>
					<p>Create new account</p>
				</button>
				<button className={quickActionElement}>
					<i className="bi bi-credit-card"></i>
					<p>Add banking card</p>
				</button>
				<button className={quickActionElement}>
					<i className="bi bi-exclamation-octagon"></i>
					<p>Block your card</p>
				</button>
				<button className={quickActionElement}>
					<i className="bi bi-chat-square-text"></i>
					<p>Report problem</p>
				</button>
			</div>

			{/* Recent */}
			<div className="row-span-2 flex flex-col gap-2 rounded-3xl border border-slate-200 bg-slate-300 p-5 shadow-2xl">
				<p className="text-xl">Recent</p>
				{recentItems.map((item) => (
					<div key={item.id} className="flex items-center rounded-2xl bg-slate-400 p-3 px-4 text-xl">
						<i className={`${item.icon} w-15 text-4xl`}></i>
						<span className="flex w-45 flex-col border-r-2 border-slate-300">
							<p className="text-slate-100">{item.type}</p>
							<p className="text-sm text-slate-500">{item.date}</p>
						</span>
						<p className={`w-40 text-end ${item.expenses ? 'text-red-500' : 'text-green-500'}`}>{item.price}</p>
					</div>
				))}
			</div>

			{/* Analysis */}
			<div className="col-span-3 flex flex-col gap-2 rounded-3xl border border-slate-200 bg-slate-300 p-5 shadow-2xl"></div>
		</div>
	);
}

const handleAccountCreate = async (userId: number) => {
	try {
		const response = await createAccount({
			userId: userId,
		});

		console.log(response);
		if (response.status == 200) {
			console.log(response.data.message);
		} else {
			console.log(response.data.message);
		}
	} catch (error) {
		const err = error as any;
		console.error(err.response?.data || err.message);
	}
};
