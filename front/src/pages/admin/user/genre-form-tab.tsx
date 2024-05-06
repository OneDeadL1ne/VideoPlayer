import AddGenreForm from './add-genre-form.tsx';
import { GenreInterface } from '@/types/genre.ts';

export const genreFormTab = (genre?: GenreInterface) => [
	{
		value: 'genre-creation',
		head: `${genre ? 'Изменение жанра' : 'Добавление'}`,
		isDialog: true,
		content: <AddGenreForm genre={genre} />,
	},
];
