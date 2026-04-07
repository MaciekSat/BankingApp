import { createAccount, changeAccountName } from '../../../api/accountsApi.js';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

type AccountsProps = {
	userData: any;
	refreshData: any;
};

export function Accounts({ userData, refreshData }: AccountsProps) {
	const [accountIndex, setAccountIndex] = useState<number>(0);

	return (
		<div className="flex h-full w-17/20 flex-col gap-3">
			<div className="glass flex h-1/2 gap-3 overflow-hidden">
				{userData.accounts !== undefined && userData.accounts.length > 2 && (
					<div
						style={{ transform: 'translateX(-50%)', opacity: '0.2' }}
						onClick={() =>
							setAccountIndex((accountIndex - 1 + userData.accounts.length) % userData.accounts.length)
						}
						className="glassEdgeLess flex h-full w-1/2 shrink-0 flex-col items-center justify-between">
						<p className="h-1/8 w-full text-start text-2xl">
							{
								userData.accounts[
									(accountIndex - 1 + userData.accounts.length) % userData.accounts.length
								].accountName
							}
						</p>
						<p className="flex h-7/8 items-center justify-center text-5xl">
							{`$ ${formatMoney(userData.accounts[(accountIndex - 1 + userData.accounts.length) % userData.accounts.length].balance)}`}
						</p>
					</div>
				)}
				<div
					style={{ transform: 'translateX(-50%)', opacity: '1' }}
					className="glassEdgeLess flex h-full w-1/2 shrink-0 flex-col items-center justify-between">
					<p className="h-1/8 w-full text-start text-2xl">
						{userData.accounts !== undefined
							? userData.accounts[accountIndex % userData.accounts.length].accountName
							: ''}
					</p>
					<p className="flex h-7/8 items-center justify-center text-5xl">
						{userData.accounts !== undefined
							? `$ ${formatMoney(userData.accounts[accountIndex % userData.accounts.length].balance)}`
							: 'Create account first'}
					</p>
				</div>
				{userData.accounts !== undefined && userData.accounts.length > 1 && (
					<div
						style={{ transform: 'translateX(-50%)', opacity: '0.2' }}
						onClick={() => setAccountIndex(accountIndex + 1)}
						className="glassEdgeLess flex h-full w-1/2 shrink-0 flex-col items-center justify-between">
						<p className="h-1/8 w-full text-start text-2xl">
							{userData.accounts[(accountIndex + 1) % userData.accounts.length].accountName}
						</p>
						<p className="flex h-7/8 items-center justify-center text-5xl">
							{`$ ${formatMoney(userData.accounts[(accountIndex + 1) % userData.accounts.length].balance)}`}
						</p>
					</div>
				)}
			</div>
			<div className="glass flex h-1/2 gap-3 overflow-hidden">
				<div className="h-full w-full items-center justify-between">
					<p className="h-1/8 w-full text-start text-2xl">
						{userData.accounts !== undefined
							? userData.accounts[accountIndex % userData.accounts.length].accountName
							: ''}
					</p>
					<p className="flex h-7/8 items-center justify-center text-5xl">
						{userData.accounts !== undefined
							? `$ ${formatMoney(userData.accounts[accountIndex % userData.accounts.length].balance)}`
							: 'Create account first'}
					</p>
				</div>
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
