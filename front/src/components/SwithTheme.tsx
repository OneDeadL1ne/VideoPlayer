import { getCurrentColorScheme } from '@/utils/helpers';
import { Switch } from './ui/switch';
import { useEffect, useState } from 'react';

export default function SwithTheme() {
	const [colorScheme, setColorScheme] = useState(() => getCurrentColorScheme());

	const handleColorSchemeChange = (variant: string) => {
		document.querySelector('html')?.setAttribute('data-color-scheme', variant);
		setColorScheme(variant);
		localStorage.setItem('color-scheme', variant);
	};

	return (
		<Switch
			checked={colorScheme == 'dark' ? true : false}
			value={colorScheme}
			onCheckedChange={(value) => {
				if (value) {
					handleColorSchemeChange('dark');
				}
				if (!value) {
					handleColorSchemeChange('light');
				}
			}}
		/>
	);
}
