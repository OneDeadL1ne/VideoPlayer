import { Outlet } from 'react-router-dom';
import Header from './Header';
import { useAppSelector } from '@/hooks/reduxHooks';

export default function Layout() {
	const { theme } = useAppSelector((s) => s.theme);
	return (
		<div className="flex flex-col h-screen">
			<header className="">
				<Header />
			</header>
			<main className="min-w-full bg-accent  flex-grow">
				<Outlet />
			</main>
			<footer
				className={`w-full h-[70px] row-auto bg-gradient-to-b  ${
					theme == 'dark'
						? 'from-[#1a1a1a] from-50% to-[#36393F]'
						: 'from-[#edeef0] from-30% to-[#fff] '
				}`}
			>
				&nbsp;
			</footer>
		</div>
	);
}
