import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
	return (
		<div className="flex @container flex-col h-screen">
			<header className="">
				<Header />
			</header>
			<main className="min-w-full bg-[#EDEEF0] flex-grow">
				<Outlet />
			</main>
			<footer className="w-full row-auto"></footer>
		</div>
	);
}
