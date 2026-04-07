// @ts-ignore
import { createAccount, changeAccountName } from '../../../api/accountsApi.js';
// @ts-ignore
import { createTransfer } from '../../../api/transfersApi.js';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

type HomeProps = {
	userData: any;
	refreshData: any;
};

export function Home({ userData, refreshData }: HomeProps) {
	const [accountIndex, setAccountIndex] = useState<number>(0);
	const [nameEdit, setNameEdit] = useState<boolean>(false);
	const [accountName, setAccountName] = useState<string>('');

	const quickActionElement = 'flex items-center gap-2 px-5 h-1/5 text-lg glassButtonHidden';
	const recentItems = [
		{ id: 0, icon: 'bi bi-shop-window', type: 'Groceries', date: '21.03.2026', expenses: true, price: '$ 80.95' },
		{ id: 1, icon: 'bi bi-phone', type: 'Electronics', date: '12.03.2026', expenses: true, price: '$ 1,450.94' },
		{
			id: 2,
			icon: 'bi bi-currency-dollar',
			type: 'Salary',
			date: '10.02.2026',
			expenses: false,
			price: '$ 15,000.00',
		},
	];

	return (
		<div className="grid h-full w-17/20 grid-cols-4 grid-rows-2 gap-3">
			{/* Banking card */}

			<div className="glass col-span-2 flex flex-col items-start justify-between gap-5">
				<p className="h-1/5 text-2xl">Balance</p>
				<div className="flex w-full items-center justify-between gap-10 text-xl">
					<button
						className="glassButtonHidden"
						onClick={() =>
							setAccountIndex((accountIndex - 1 + userData.accounts.length) % userData.accounts.length)
						}>
						<i className="bi bi-arrow-left"></i>
					</button>
					<div className="h-full w-full text-5xl">
						{nameEdit ? (
							<div className="mb-10 flex gap-2 text-xl">
								<input
									className="glassInput"
									autoFocus
									onChange={(e) => setAccountName(e.target.value)}
									placeholder={
										userData.accounts !== undefined
											? userData.accounts[accountIndex].accountName
											: ''
									}
								/>
								<button
									className="glassButton"
									onClick={() => {
										handleAccountNameChange(
											userData.accounts[accountIndex].id,
											accountName || userData.accounts[accountIndex].accountName,
											refreshData,
										);
										setNameEdit(false);
									}}>
									Save
								</button>
							</div>
						) : (
							<p
								className="mb-10 p-2 text-xl"
								onClick={() => {
									setNameEdit(true);
								}}>
								{userData.accounts !== undefined ? userData.accounts[accountIndex].accountName : ''}
							</p>
						)}

						<p>
							{userData.accounts !== undefined
								? `$ ${formatMoney(userData.accounts[accountIndex].balance)}`
								: 'Create account first'}
						</p>
					</div>
					<button
						className="glassButtonHidden"
						onClick={() => setAccountIndex((accountIndex + 1) % userData.accounts.length)}>
						<i className="bi bi-arrow-right"></i>
					</button>
				</div>

				<div className="flex h-1/5 items-center gap-5">
					<span className="flex gap-2 border-r-2 border-slate-200 pr-5 text-lg">
						<i className="bi bi-graph-up-arrow"></i>
						<p>Income</p>
						<p className="text-emerald-500">$ 10,800.00</p>
					</span>
					<span className="flex gap-2 text-lg">
						<i className="bi bi-graph-down-arrow"></i>
						<p>Expenses</p>
						<p className="text-red-500">$ 5,690.90</p>
					</span>
				</div>
			</div>

			{/* Quick actions */}
			<div className="glass flex flex-col justify-center gap-5">
				<button
					className={quickActionElement}
					onClick={async () =>
						await handleAccountCreate(userData.user.id, userData.account?.balance, refreshData)
					}>
					<i className="bi bi-collection"></i>
					<p>Create new account</p>
				</button>
				<button className={quickActionElement}>
					<i className="bi bi-fast-forward"></i>
					<p>Transfer money</p>
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
			<div className="glass row-span-2 flex flex-col gap-2">
				<p className="text-xl">Recent</p>
				{recentItems.map((item) => (
					<div key={item.id} className="glassButtonSec text-md flex items-center p-3 px-4">
						<i className={`${item.icon} mr-2 w-1/7 text-4xl`}></i>
						<span className="flex w-2/7 flex-col">
							<p className="text truncate">{item.type}</p>
							<p className="textSec truncate text-sm">{item.date}</p>
						</span>
						<p className={`w-4/7 text-end ${item.expenses ? 'text-red-500' : 'text-emerald-500'}`}>
							{item.price}
						</p>
					</div>
				))}
			</div>

			{/* Analysis */}
			<div className="glass col-span-3 flex flex-col gap-2"></div>
		</div>
	);
}

const handleAccountCreate = async (userId: number, balance: any, refreshData: any) => {
	if (balance === undefined) {
		try {
			const response = await createAccount({
				userId: userId,
			});

			if (response.status == 200) {
				toast.success(response.data.message || 'Account created successfully');
				setTimeout(
					async () =>
						await toast.promise(refreshData(), {
							loading: 'Loading',
							success: 'Retrieved account data',
							error: 'Error when retrieving account data',
						}),
					2000,
				);
			} else {
				toast.error(response.data.message || 'Something went wrong');
			}
		} catch (error) {
			const err = error as any;
			toast.error(err.response?.data || err.message);
		}
	} else {
		toast('You already have an account', { icon: <i className="bi bi-check-circle" /> });
	}
};

const handleAccountNameChange = async (index: number, name: string, refreshData: any) => {
	try {
		const response = await changeAccountName({
			accountId: index,
			accountName: name,
		});

		if (response.status == 200) {
			toast.success(response.data.message || 'Account name updated');
			setTimeout(
				async () =>
					await toast.promise(refreshData(), {
						loading: 'Loading',
						success: 'Retrieved account data',
						error: 'Error when retrieving account data',
					}),
				1000,
			);
		} else {
			toast.error(response.data.message || 'Something went wrong');
		}
	} catch (error) {
		const err = error as any;
		toast.error(err.response?.data || err.message);
	}
};

const formatMoney = (value: number) => {
	if (value !== undefined) {
		const formatted: string = new Intl.NumberFormat('en-US', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(value);

		return formatted;
	}
};
