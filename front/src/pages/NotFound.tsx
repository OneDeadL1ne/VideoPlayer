import { NavLink } from 'react-router-dom';

export default function NotFoundPage() {
	//document.title = "Ошибка 404";
	return (
		<div className="flex flex-col h-full @container">
			<div className="min-w-full flex-grow flex items-center justify-center ">
				<div className="">
					<p className="text-primary text-lg font-[600] uppercase text-center @[400px]: @[400px]:text-2xl">
						Ошибка 404. такой страницы нет
					</p>
					<NavLink to="/">
						<p className="underline text-center text-muted-foreground">
							Перейти на главную
						</p>
					</NavLink>
				</div>
			</div>
		</div>
	);
}
