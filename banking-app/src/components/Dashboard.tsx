type CSSVars = React.CSSProperties & {
	'--topVar': string;
};

export function Dashboard() {
	return (
		<section className="flex h-screen flex-col items-center justify-center">
			<div className="absolute z-0 h-screen w-screen px-2">
				<div className="h-3/12 rounded-b-3xl bg-slate-800">Dashboard</div>
			</div>
			<div className="absolute top-(--topVar) z-10 h-[calc(100vh-var(--topVar))] w-screen px-5" style={{ '--topVar': '100px' } as CSSVars}>
				<div className="bg-sky-300">Dashboard</div>
				<div className="bg-sky-300">Menu</div>
			</div>
		</section>
	);
}
