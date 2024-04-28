import AccountMenu from '../account-menu/account-menu';

export default function Header() {
	return (
		<div className="bg-white  w-full grid grid-cols-3 h-[55px] gap-5">
			<div className="flex items-center ml-5 text-primary">Ностальгия</div>
			<div className="flex justify-center items-center">Поиск</div>
			<div className="flex justify-end items-center">
				<AccountMenu />
			</div>
		</div>
	);
}
