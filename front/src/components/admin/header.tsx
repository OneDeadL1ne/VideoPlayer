import { Dispatch, SetStateAction } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AccountMenu from '../account-menu/AccountMenu';
import SwithTheme from '../SwithTheme';

interface HeaderProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export function Header({ open, setOpen }: HeaderProps) {
	return (
		<div className="grid grid-cols-[50px_auto] items-center min-w-full bg-secondary h-16 border-solid border-muted border-l-[2px] border-b-[2px] ">
			<div
				className="items-center cursor-pointer justify-center ml-3"
				onClick={() => setOpen(!open)}
			>
				{open ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
			</div>

			<div className="flex items-center place-items-end justify-end gap-3 p-[10px]">
				<SwithTheme />
				<AccountMenu />
			</div>
		</div>
	);
}
