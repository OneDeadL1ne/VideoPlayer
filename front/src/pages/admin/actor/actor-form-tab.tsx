import { ActorInterface } from '@/types/actor.ts';

import AddActorForm from './add-actor-form.tsx';

export const actorFormTab = (actor?: ActorInterface) => [
	{
		value: 'genre-creation',
		head: `${actor ? 'Изменение актера' : 'Добавление'}`,
		isDialog: true,
		content: <AddActorForm actor={actor} />,
	},
];
