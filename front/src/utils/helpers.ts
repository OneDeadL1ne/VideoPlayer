import { format } from 'date-fns';

export const getJWTtokens = () => {
	const accessToken = getCookieValue('accessToken');
	const refreshToken = getCookieValue('refreshToken');

	return {
		accessToken,
		refreshToken,
	};
};

// для форматирования даты с бэкенда в привычный формат. 2024-01-11T10:36:59.321Z ---> 11.01.2024
export const formatDate = (date?: string | Date | null, includeTime?: boolean) => {
	if (!date) {
		return '';
	}
	const newDate = new Date(date);
	return format(newDate, `dd.MM.yyyy${includeTime ? ' hh:mm' : ''}`);
};

export const formatInitials = (firstName: string, lastName: string, patronymic: string) => {
	const str = `${lastName} ${firstName} ${patronymic}`;

	return str
		.split(/\s+/)
		.map((w, i) => (i && w ? w.substring(0, 1).toUpperCase() + '.' : w))
		.join(' ');
};

export const getCookieValue = (key: string) => {
	const cookieValue = document.cookie
		.split('; ')
		.find((row) => row.startsWith(`${key}=`))
		?.split('=')[1];

	return cookieValue;
};

export const removeCookieValue = (key: string) => {
	document.cookie = `${key}=; Max-Age=-1`;
};

export const removeCookie = () => {
	document.cookie.split(';').forEach(function (c) {
		document.cookie = c
			.replace(/^ +/, '')
			.replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
	});
};

export const getCurrentColorScheme = () => localStorage.getItem('color-scheme') || 'light';

export const getCurrentColor = () => {
	const theme = localStorage.getItem('color-scheme') || 'light';

	if (theme == 'dark') {
		return 'white';
	}

	return 'black';
};

export const ConvertDescription = (description: string) => {
	const length = 10;
	const trimmedString =
		description.length > length ? description.substring(0, length - 3) + '...' : description;

	return trimmedString;
};

export const ConvertSeconds = (seconds: number) => {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);

	// Форматирование часов и минут для добавления в строку
	const formattedHours = String(hours).padStart(2); // Добавляем ведущий ноль, если часов меньше 10
	const formattedMinutes = String(minutes).padStart(2, '0'); // Добавляем ведущий ноль, если минут меньше 10

	return `${formattedHours} ч ${formattedMinutes} мин`;
};
