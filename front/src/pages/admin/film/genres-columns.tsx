import { ColumnDef } from '@tanstack/react-table';
import { ActionsDropdown } from './action-buttons.tsx';

import { GenreInterface } from '@/types/genre.ts';

export const genresTableColumns: ColumnDef<GenreInterface>[] = [
	{
		header: 'Номер',
		accessorKey: 'id_genre',
	},
	{
		accessorKey: 'genre_name',
		header: 'Название',
	},
	{
		id: 'actions',
		cell: ({ row }) => <ActionsDropdown genre={row.original} />,
	},
];
