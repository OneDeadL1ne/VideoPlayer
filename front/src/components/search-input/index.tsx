import React from 'react';

import { FilterIcon, Search } from 'lucide-react';
import { Button } from '../ui/button';

import { cn } from '@/lib/utils.ts';
import { Input } from '../ui/input';

type Props = {
	value: string | number;
	placeholder?: string;
	onChange: (value: string | number) => void;
	debounce?: number;
	suffixIconClick?: () => void;
	filtersEnabled?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

export const DebouncedInput: React.FC<Props> = ({
	value: initialValue,
	placeholder = 'Поиск',
	onChange,
	debounce = 500,
	suffixIconClick,
	filtersEnabled,
	...props
}) => {
	const [value, setValue] = React.useState<number | string>(initialValue);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setValue(event.target.value);

	React.useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value);
		}, debounce);

		return () => clearTimeout(timeout);
	}, [value]);

	return (
		<div className="w-full  text-accent-foreground  h-[35px] border-solid border-[2px] rounded-xl flex items-center justify-start  overflow-hidden">
			<div className=" ml-3 mr-3">
				<Search color="#8A9099" size={20} />
			</div>
			<div className="flex-auto">
				<Input
					className="w-full focus:outline-none  bg-transparent   outline-none  "
					{...props}
					value={value}
					onChange={handleInputChange}
					placeholder={placeholder}
				/>
			</div>
			{suffixIconClick && (
				<Button
					variant={'ghost'}
					className={cn('px-4 rounded-none', filtersEnabled && 'bg-primary')}
					onClick={suffixIconClick}
				>
					<FilterIcon />
				</Button>
			)}
		</div>
	);
};

export default DebouncedInput;
