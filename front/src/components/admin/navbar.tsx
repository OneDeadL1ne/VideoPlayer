import React, { useEffect, useState } from 'react';

import SidebarLink from '../links/nav-link.tsx';

import { cn } from '@/lib/utils.ts';
import Logo from '@/assets/Logo.svg?react';
import LogoDark from '@/assets/LogoDark.svg?react';
import LogoMini from '@/assets/LogoMini.svg?react';
import { useAppSelector } from '@/hooks/reduxHooks.ts';
import { getCurrentColor } from '@/utils/helpers.ts';
import { NavLink } from 'react-router-dom';
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
		{ title: 'Рецензии', path: '/admin/posts', children: null },
		{ title: 'Список фильмов', path: '/admin/films', children: null },
		{ title: 'Режиссёры', path: '/admin/directors', children: null },
		{ title: 'Актеры', path: '/admin/actors', children: null },
		{ title: 'Жанры', path: '/admin/genres', children: null },
		{ title: 'Озвучка', path: '/admin/voiceovers', children: null },
		{ title: 'Пользователи', path: '/admin/users', children: null },
		{ title: 'Сотрудники', path: '/admin/employees', children: null },
		{ title: 'Роли', path: '/admin/roles', children: null },
	];

	const { theme } = useAppSelector((s) => s.theme);
	const [color, setColor] = useState(theme);
	useEffect(() => {
		setColor(getCurrentColor());
	}, [theme]);

	return (
		<nav className="bg-secondary flex flex-col border-solid h-screen">
			{open ? (
				<NavLink to="/">
					<div className={cn('h-[64px] w-[270px] items-center flex justify-center')}>
						{color == 'white' ? <LogoDark height={35} /> : <Logo height={35} />}
					</div>
				</NavLink>
			) : (
				<NavLink to="/">
					<div className="h-[64px] w-[75px] flex justify-center  items-center">
						<LogoMini height={35} />
					</div>
				</NavLink>
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
