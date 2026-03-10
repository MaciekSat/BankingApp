import { Register } from './components/Register.tsx';
import { Login } from './components/Login.tsx';
import { Dashboard } from './components/Dashboard.tsx';

import { useState } from 'react';

export function App() {
	const [active, setActive] = useState('dashboard');

	return (
		<main>
			{active === 'register' && <Register onNext={setActive} />}
			{active === 'login' && <Login onNext={setActive} />}
			{active === 'dashboard' && <Dashboard />}
		</main>
	);
}
