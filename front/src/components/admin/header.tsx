import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AccountMenu from '../account-menu/AccountMenu';
import SwithTheme from '../SwithTheme';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getCurrentColor } from '@/utils/helpers';

interface HeaderProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export function Header({ open, setOpen }: HeaderProps) {
	const { theme } = useAppSelector((s) => s.theme);
	const [color, setColor] = useState(theme);

	useEffect(() => {
		setColor(getCurrentColor());
	}, [theme]);

	return (
		<div className="grid grid-cols-[50px_auto] items-center min-w-full bg-secondary h-16 border-solid border-muted-foreground  border-b-[2px] ">
			<div
				className="items-center cursor-pointer justify-center ml-3"
				onClick={() => setOpen(!open)}
			>
				{open ? (
					<ChevronLeft color={color} size={20} />
				) : (
					<ChevronRight color={color} size={20} />
				)}
			</div>

			<div className="flex items-center place-items-end justify-end  gap-3 p-[10px]">
				<SwithTheme />
				<div>
					<AccountMenu />
				</div>
			</div>
		</div>
	);
}
