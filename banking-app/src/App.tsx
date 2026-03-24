import { Register } from './components/Register.tsx';
import { Login } from './components/Login.tsx';
import { Dashboard } from './components/Dashboard.tsx';

import { useState } from 'react';

export function App() {
	const [active, setActive] = useState(import.meta.env.VITE_DEFPAGE);
	const [authenticated, setAuthenticated] = useState(import.meta.env.VITE_AUTH === 'true');
	const [userInfo, setUserInfo] = useState(import.meta.env.VITE_EMAIL);

	// console.log('auth', authenticated);

	return (
		<main>
			{active === 'register' && <Register onNext={setActive} />}
			{active === 'login' && <Login onNext={setActive} onVerify={setAuthenticated} userInfo={setUserInfo} />}
			{active === 'dashboard' && <Dashboard mail={userInfo} authenticated={authenticated} logOut={setAuthenticated} onNext={setActive} />}
		</main>
	);
}
