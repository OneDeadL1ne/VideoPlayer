import { NavLink } from "react-router-dom";

export default function NotFoundPage() {
	document.title = "Ошибка 404";
	return (
		<div className="flex flex-col h-screen">
			<header className="flex justify-center items-center mt-5">
				<NavLink to="/"></NavLink>
			</header>
			<main className="min-w-full flex-grow flex items-center justify-center">
				<div>
					<p className="text-primary text-2xl font-[600] uppercase">
						Ошибка 404. такой страницы нет
					</p>
					<NavLink to="/">
						<p className="underline text-center text-muted">Перейти на главную</p>
					</NavLink>
				</div>
			</main>
			<footer className="w-full row-auto flex justify-center items-center mb-4"></footer>
		</div>
	);
}
