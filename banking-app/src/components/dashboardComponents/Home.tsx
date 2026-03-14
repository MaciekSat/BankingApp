type HomeProps = {
	userData: any;
};

export function Home({ userData }: HomeProps) {
	return (
		<div className="h-full w-17/20">
			<div className="grid h-full grid-cols-3 grid-rows-2 gap-2 rounded-[calc(var(--radius-3xl)-(--spacing(2)))] bg-gray-950 p-2">
				{/* Banking card */}
				<div className="flex items-center justify-center rounded-[calc(var(--radius-2xl)-(--spacing(2)))] bg-gray-900 p-2">
					<div className="flex h-70 w-120 flex-col items-start justify-between gap-5 rounded-2xl bg-linear-20 from-sky-700 to-violet-950 p-5">
						<p className="text-xl">Balance</p>
						<p className="text-5xl">$ {userData}</p>
						<div className="flex items-center gap-5">
							<span className="flex gap-2 border-r-2 border-gray-400 pr-5">
								<i className="bi bi-graph-up-arrow"></i>
								<p>Income</p>
								<p className="text-green-400">$ 10,800.00</p>
							</span>
							<span className="flex gap-2">
								<i className="bi bi-graph-down-arrow"></i>
								<p>Expenses</p>
								<p className="text-red-500">$ 5,690.90</p>
							</span>
						</div>
					</div>
				</div>

				{/* Recent */}
				<div className="flex flex-col gap-2 rounded-[calc(var(--radius-2xl)-(--spacing(2)))] bg-gray-900 p-5">
					<p className="text-xl">Recent</p>
					<div className="flex items-center rounded-2xl bg-gray-800 p-3 px-8 text-xl">
						<i className="bi bi-shop-window w-15 text-4xl"></i>
						<span className="flex w-45 flex-col border-r-2 border-gray-500">
							<p className="text-slate-300">Groceries</p>
							<p className="text-sm text-slate-500">10.03.2026</p>
						</span>
						<p className="w-40 text-end text-red-500">$ 80.95</p>
					</div>
					<div className="flex items-center rounded-2xl bg-gray-800 p-3 px-8 text-xl">
						<i className="bi bi-phone w-15 text-4xl"></i>
						<span className="flex w-45 flex-col border-r-2 border-gray-500">
							<p className="text-slate-300">Electronics</p>
							<p className="text-sm text-slate-500">12.03.2026</p>
						</span>
						<p className="w-40 text-end text-red-500">$ 1,450.94</p>
					</div>
					<div className="flex items-center rounded-2xl bg-gray-800 p-3 px-8 text-xl">
						<i className="bi bi-currency-dollar w-15 text-4xl"></i>
						<span className="flex w-45 flex-col border-r-2 border-gray-500">
							<p className="text-slate-300">Salary</p>
							<p className="text-sm text-slate-500">10.02.2026</p>
						</span>
						<p className="w-40 text-end text-green-400">$ 15,000.00</p>
					</div>
				</div>

				{/* Work in progress */}
				<div className="flex flex-col gap-2 rounded-[calc(var(--radius-2xl)-(--spacing(2)))] bg-gray-900 p-5"></div>

				{/* Analysis */}
				<div className="col-span-3 flex flex-col gap-2 rounded-[calc(var(--radius-2xl)-(--spacing(2)))] bg-gray-900 p-5"></div>
			</div>
		</div>
	);
}
