// @ts-ignore
import { createTransfer, getTransfers } from '../../../api/transfersApi.js';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

type TransactionsProps = {
	userData: any;
};

export function Transactions({ userData }: TransactionsProps) {
	const [accountIndex, setAccountIndex] = useState<number>(0);
	const [transfersData, setTransfersData] = useState<any>({});

	const fetchData = async () => {
		const data = await handleTransfersGet(userData.accounts[accountIndex].id);

		setTransfersData(data?.transactions || []);
	};

	useEffect(() => {
		if (!userData.accounts) return;

		fetchData();
	}, [accountIndex, userData.accounts]);

	return (
		<div className="grid h-full w-17/20 grid-cols-5 grid-rows-4 gap-3">
			<div className="glass row-span-4 flex flex-col gap-3">
				{userData.accounts !== undefined &&
					userData.accounts.map((item: any, index: any) => (
						<div key={item.id} className="glassButtonSec p-3" onClick={() => setAccountIndex(index)}>
							<p className="truncate">{item.accountName}</p>
						</div>
					))}
			</div>
			<div className="glass col-span-4 row-span-3 flex flex-col gap-3 overflow-auto overscroll-contain scroll-smooth">
				{userData.accounts !== undefined &&
					transfersData[0] !== undefined &&
					transfersData.map((item: any, index: any) => (
						<div key={item.id} className="glassButtonSec h-hit flex w-full gap-2 p-3">
							<p>Icon: {item.transactionType}</p>
							<p>From: {item.accountId}</p>
							<p>To: {item.toAccountId}</p>
							<p>Date: {item.transactionDate}</p>
							<p className="border-none">Amount: {item.amount}</p>
						</div>
					))}
			</div>
			<div className="glass col-span-4 flex gap-3">
				<button className="glassButton h-fit p-3" onClick={() => handleTransfer(10, fetchData)}>
					Transfer
				</button>
			</div>
		</div>
	);
}

const formatMoney = (value: number) => {
	if (value !== undefined) {
		const formatted: string = new Intl.NumberFormat('en-US', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(value);

		return formatted;
	}
};

const handleTransfer = async (value: number, refresh: any) => {
	try {
		const response = await createTransfer({
			accountId: 102,
			toId: 41,
			amount: value,
			transactionType: 'default',
		});

		if (response.status == 200) {
			toast.success(response.data.message || 'Account created successfully');
			refresh();
		} else {
			toast.error(response.data.message || 'Something went wrong');
		}
	} catch (error) {
		const err = error as any;
		toast.error(err.response?.data.error || err.message);
	}
};

async function handleTransfersGet(id: number) {
	try {
		const response = await getTransfers(id);

		if (response.status === 200) {
			return response.data;
		} else {
			console.error('Failed to fetch transactions data');
			return null;
		}
	} catch (error) {
		const err = error as any;
		console.error(err.response?.data || err.message);
		return null;
	}
}
