import { useEffect, useState } from 'react';

import DebouncedInput from '../search-input';
import Logo from '@/assets/Logo.svg?react';
import LogoDark from '@/assets/LogoDark.svg?react';
import LogoMini from '@/assets/LogoMini.svg?react';
import { NavLink } from 'react-router-dom';
import SwithTheme from '../SwithTheme';
import { useAppSelector } from '@/hooks/reduxHooks';

import AuthDialog from '../dialog/AuthDialog';
import AccountMenu from '../account-menu/AccountMenu';
import { getCurrentColor } from '@/utils/helpers';

export default function Header() {
	const [search, setSearch] = useState<string | number>('');
	const { isLogin } = useAppSelector((s) => s.auth);
	const { theme } = useAppSelector((s) => s.theme);
	const [color, setColor] = useState(theme);
	useEffect(() => {
		if (search.toString().length != 0) {
			console.log(search);
		}
	}, [search]);

	useEffect(() => {
		setColor(getCurrentColor());
	}, [theme]);

	return (
		<div
			className={`@container w-full h-[55px]  
			   bg-secondary flex `}
		>
			<div className="w-1/4 flex items-center ml-5 ">
				<div className="hidden @[750px]:inline-flex">
					<NavLink to="/">
						{color == 'white' ? <LogoDark height={35} /> : <Logo height={35} />}
					</NavLink>
				</div>
				<div className=" inline-flex @[750px]:hidden">
					<NavLink to="/">
						<LogoMini height={40} />
					</NavLink>
				</div>
			</div>
			<div className="w-1/2 flex items-center">
				<DebouncedInput
					className="flex  justify-center items-center"
					value={search}
					onChange={(search) => {
						setSearch(search);
					}}
				/>
			</div>
			<div className="w-1/4 flex justify-end items-center">
				<SwithTheme />
			</div>
			<div className="w-1/4 flex justify-end items-center">
				{isLogin ? <AccountMenu /> : <AuthDialog />}
			</div>
		</div>
	);
}
