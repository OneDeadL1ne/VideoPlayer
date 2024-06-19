import React, { useEffect, useState } from 'react';

import SidebarLink from '../links/nav-link.tsx';

import { cn } from '@/lib/utils.ts';
import Logo from '@/assets/Logo.svg?react';
import LogoDark from '@/assets/LogoDark.svg?react';
import LogoMini from '@/assets/LogoMini.svg?react';
import { useAppSelector } from '@/hooks/reduxHooks.ts';
import { getCurrentColor } from '@/utils/helpers.ts';
import { NavLink } from 'react-router-dom';
import Film from '@/assets/film.svg?react';
import FilmDark from '@/assets/filmDark.svg?react';
import Director from '@/assets/director.svg?react';
import DirectorDark from '@/assets/directorDark.svg?react';
import Actor from '@/assets/actor.svg?react';
import ActorDark from '@/assets/actorDark.svg?react';
import Genre from '@/assets/genre.svg?react';
import GenreDark from '@/assets/genreDark.svg?react';
import Voice from '@/assets/voice.svg?react';
import VoiceDark from '@/assets/voiceDark.svg?react';
import User from '@/assets/user.svg?react';
import UserDark from '@/assets/userDark.svg?react';

export interface SingleLink {
	path: string;
	title: string;
	childrenLight: React.ReactNode;
	childrenDark: React.ReactNode;
}

export interface NavbarProps {
	open: boolean;
}

export function Navbar({ open }: NavbarProps) {
	const { theme } = useAppSelector((s) => s.theme);
	const [color, setColor] = useState(theme);

	const links: (SingleLink | false)[] = [
		{
			title: 'Список фильмов',
			path: '/admin/films',
			childrenLight: <Film />,
			childrenDark: <FilmDark />,
		},
		{
			title: 'Режиссёры',
			path: '/admin/directors',
			childrenLight: <Director />,
			childrenDark: <DirectorDark />,
		},
		{
			title: 'Актеры',
			path: '/admin/actors',
			childrenLight: <Actor />,
			childrenDark: <ActorDark />,
		},
		{
			title: 'Жанры',
			path: '/admin/genres',
			childrenLight: <Genre />,
			childrenDark: <GenreDark />,
		},
		{
			title: 'Озвучка',
			path: '/admin/voiceovers',
			childrenLight: <Voice />,
			childrenDark: <VoiceDark />,
		},
		// {
		// 	title: 'Пользователи',
		// 	path: '/admin/users',
		// 	childrenLight: <User />,
		// 	childrenDark: <UserDark />,
		// },
	];

	useEffect(() => {
		setColor(getCurrentColor());
	}, [theme]);

	return (
		<nav className="bg-secondary flex flex-col border-solid border-r-[2px] border-muted-foreground h-screen">
			{open ? (
				<NavLink to="/">
					<div
						className={cn('h-[64px] w-[270px] items-center -ml-3 flex justify-center')}
					>
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
								{theme == 'dark' ? link.childrenDark : link.childrenLight}
							</SidebarLink>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
