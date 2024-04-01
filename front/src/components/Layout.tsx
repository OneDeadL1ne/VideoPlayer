import { Outlet } from "react-router-dom";

export default function Layout() {
	return (
		<div className="flex flex-col h-screen">
			<header className=""></header>
			<main className="min-w-full flex-grow">
				<Outlet />
			</main>
			<footer className="w-full row-auto"></footer>
		</div>
	);
}
