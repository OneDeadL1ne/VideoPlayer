import { useEffect, useState } from 'react';
import AccountMenu from '../account-menu/account-menu';
import DebouncedInput from '../search-input';

export default function Header() {
	const [search, setSearch] = useState<string | number>('');
	useEffect(() => {
		if (search.toString().length != 0) {
			console.log(search);
		}
	}, [search]);
	return (
		<div className="bg-white  w-full flex h-[55px] ">
			<div className="w-1/4 flex items-center ml-5 text-primary ">
				<p className="">Ностальгия</p>
			</div>
			<div className="w-1/2 flex items-center">
				<DebouncedInput
					className="flex  justify-center items-center"
					value={search}
					onChange={(search) => {
						console.log(search);
					}}
				/>
			</div>

			<div className="w-1/4 flex justify-end items-center">
				<AccountMenu />
			</div>
		</div>
	);
}
