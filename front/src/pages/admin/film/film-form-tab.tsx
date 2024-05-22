import { FilmInterface } from '@/types/film.ts';
import AddFilmForm from './add-film-form';
import AddResourceForm from './add-resource-form';

export const filmFormTab = (film?: FilmInterface) => [
	{
		value: 'film-creation',
		head: `${film ? 'Изменение фильма' : 'Добавление'}`,
		isDialog: true,
		content: <AddFilmForm film={film} />,
	},
	{
		value: 'film-media',
		head: `Ресурсы`,
		isDialog: true,
		disabled: !film ? true : false,
		content: <AddResourceForm film={film} />,
	},
];
