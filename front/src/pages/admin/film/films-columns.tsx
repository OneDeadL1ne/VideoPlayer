import { ColumnDef } from '@tanstack/react-table';
import { ActionsDropdown } from './action-buttons.tsx';

import { FilmInterface } from '@/types/film.ts';
import { CustomAvatar } from '@/components/custom-avatar/CustomAvatar.tsx';
import { Switch } from '@/components/ui/switch.tsx';
import { ConvertDescription, ConvertSeconds } from '@/utils/helpers.ts';

import { LoadingSpinner } from '@/components/spinner/spinner.tsx';
import { Label } from '@radix-ui/react-label';

export const genresTableColumns: ColumnDef<FilmInterface>[] = [
	{
		accessorKey: 'film_title',
		header: 'Название',
	},
	{
		accessorKey: 'description',
		header: 'Описание',
		cell: ({ row }) => {
			const description = row.original.description;

			return ConvertDescription(description);
		},
	},
	{
		accessorKey: 'directors',
		header: 'Режиссеры',
		cell: ({ row }) => {
			const director = row.original.directors[0];
			if (!director) {
				return <></>;
			}

			return <CustomAvatar avatar_url={director.avatar_url} />;
		},
	},
	{
		accessorKey: 'actors',
		header: 'Актеры',

		cell: ({ row }) => {
			const actors = row.original.actors;
			if (!actors) {
				return <></>;
			}
			return (
				<div className="flex gap-2">
					{actors &&
						actors.map((actor) => {
							if (actor.avatar_url) {
								return (
									<CustomAvatar
										key={actor.id_actor}
										avatar_url={actor.avatar_url}
									/>
								);
							}

							return <CustomAvatar key={actor.id_actor} avatar_url={null} />;
						})}
				</div>
			);
		},
	},
	{
		accessorKey: 'rating',
		header: 'Рейтинг',
	},
	{
		accessorKey: 'release_year',
		header: 'Год релиза',
	},
	{
		accessorKey: 'film_length_seconds',
		header: 'Длительность',
		cell: ({ row }) => {
			const film_length_seconds = row.original.film_length_seconds;

			return ConvertSeconds(film_length_seconds);
		},
	},
	{
		accessorKey: 'age_limit.age_limit_name',
		header: 'Возрастное ограничение',
		cell: ({ row }) => {
			const age_limit = row.original.age_limit!.age_limit_name;

			return `+${age_limit}`;
		},
	},
	{
		header: 'Статус',
		cell: ({ row }) => {
			const film = row.original;

			if (film.is_processed == 2) {
				return (
					<div className="flex gap-1 text-wrap text-accent-foreground items-center">
						<p>На</p>
						<p>обработке</p>
						<LoadingSpinner className="text-primary" />
					</div>
				);
			}
			if (film.is_processed == 1) {
				return (
					<div className="flex gap-1 text-wrap text-accent-foreground items-center">
						<p>Ожидает </p>
						<p>загрузки</p>
					</div>
				);
			}

			if (film.is_processed == 3) {
				return (
					<div className="flex gap-1 text-wrap text-destructive items-center">
						<p>Ошибка </p>
					</div>
				);
			}
			if (film.is_processed == 4) {
				return (
					<div className="flex text-green-500 items-center">
						<Label>Опубликован</Label>
					</div>
				);
			}
			return <></>;
		},
	},
	{
		accessorKey: 'is_subscribe',
		header: 'Подписка',
		cell: ({ row }) => {
			const is_subscribe = row.original.is_subscribe;

			return <Switch checked={is_subscribe} />;
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => <ActionsDropdown film={row.original} />,
	},
];
