import React from "react";

import SidebarLink from "../links/nav-link.tsx";

import { cn } from "@/lib/utils.ts";

export interface SingleLink {
	path: string;
	title: string;
	children: React.ReactNode;
}

export interface NavbarProps {
	open: boolean;
}

export function Navbar({ open }: NavbarProps) {
	const links: (SingleLink | false)[] = [
		{ title: "Рецензии", path: "/admin/posts", children: null },
		{ title: "Список фильмов", path: "/admin/films", children: null },
		{ title: "Режиссёры", path: "/admin/directors", children: null },
		{ title: "Актеры", path: "/admin/actors", children: null },
		{ title: "Жанры", path: "/admin/genres", children: null },
		{ title: "Озвучка", path: "/admin/voiceovers", children: null },
		{ title: "Пользователи", path: "/admin/users", children: null },
		{ title: "Сотрудники", path: "/admin/employees", children: null },
		{ title: "Роли", path: "/admin/roles", children: null },
	];

	return (
		<nav className="bg-white flex flex-col border-solid h-screen">
			{open ? (
				<div className={cn("h-[64px] w-[270px] py-2 flex justify-center")}>Ностальгия</div>
			) : (
				<div className="h-[64px] w-[75px] p-2 flex justify-center">Лого</div>
			)}
			<ul>
				{links.map((item, key) => {
					if (!item) {
						return void 0;
					}

					const link = item;

					return (
						<li key={key}>
							<SidebarLink open={open} path={link.path} title={link.title}>
								{link.children}
							</SidebarLink>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
