'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/hooks/useTheme';
import { getCurrentColor, getCurrentColorScheme } from '@/utils/helpers';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/reduxHooks';

export function ModeToggle() {
	const [mode, handleChange] = useTheme(getCurrentColorScheme());
	const { theme } = useAppSelector((s) => s.theme);
	const [color, setColor] = useState(theme);
	useEffect(() => {
		setColor(getCurrentColor());
	}, [theme]);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="size-8">
					{mode == 'light' ? (
						<SunIcon
							color={color}
							className="rotate-0 h-4 w-4 scale-100 transition-all dark:-rotate-90 dark:scale-0"
						/>
					) : (
						<MoonIcon
							className="rotate-0 h-4 w-4 scale-100 transition-all dark:-rotate-90 dark:scale-0"
							color={color}
						/>
					)}

					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="bg-accent border-0 ">
				<DropdownMenuItem onClick={() => handleChange(false)} className="cursor-pointer">
					<SunIcon className="mr-2 size-4" color={color} />
					<span className="text-muted-foreground hover:text-accent-foreground">
						Светлая
					</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleChange(true)} className="cursor-pointer">
					<MoonIcon className="mr-2 size-4" color={color} />
					<span className="text-muted-foreground hover:text-accent-foreground">
						Темная
					</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
