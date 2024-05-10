import AddDirectorForm from './add-director-form.tsx';

import { DirectorInterface } from '@/types/director.ts';

export const directorFormTab = (director?: DirectorInterface) => [
	{
		value: 'director-creation',
		head: `${director ? 'Изменение Режиссер' : 'Добавление'}`,
		isDialog: true,
		content: <AddDirectorForm director={director} />,
	},
];
