import { useEffect, useState } from 'react';

import { useAppDispatch } from './reduxHooks';
import { setTheme } from '@/redux/reducers/themeSlice';

type Theme = 'dark' | 'light' | string;

type useThemeReturn = [string, (e: boolean) => void];

export const useTheme = (initialTheme: Theme): useThemeReturn => {
	const [theme, setIsTheme] = useState<Theme>(initialTheme);
	const dispatch = useAppDispatch();

	const handleChange = (e: boolean) => {
		setIsTheme(e ? 'dark' : 'light');
	};

	useEffect(() => {
		document.body.setAttribute('data-theme', theme);
		document.querySelector('html')?.setAttribute('data-color-scheme', theme);
		dispatch(setTheme(theme));
		localStorage.setItem('color-scheme', theme);
	}, [theme]);

	return [theme, handleChange];
};
