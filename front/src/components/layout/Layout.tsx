import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
	return (
		<div className="flex flex-col h-screen">
			<header className="">
				<Header />
			</header>
			<main className="min-w-full bg-accent  flex-grow">
				<Outlet />
			</main>
			<footer className="w-full row-auto"></footer>
		</div>
	);
}
