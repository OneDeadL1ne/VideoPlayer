import { ColumnDef } from '@tanstack/react-table';
import { ActionsDropdown } from './action-buttons.tsx';

import { DirectorInterface } from '@/types/director.ts';
import { CustomAvatar } from '@/components/custom-avatar/CustomAvatar.tsx';

export const directorsTableColumns: ColumnDef<DirectorInterface>[] = [
	{
		header: 'Номер',
		accessorKey: 'id_director',
	},
	{
		accessorKey: 'avatar_url',
		header: 'Фото',
		cell: ({ row }) => <CustomAvatar avatar_url={row.original.avatar_url!} />,
	},
	{
		accessorKey: 'last_name',
		header: 'Фамилия',
	},
	{
		accessorKey: 'first_name',
		header: 'Имя',
	},
	{
		accessorKey: 'patronymic',
		header: 'Отчество',
	},
	{
		id: 'actions',
		cell: ({ row }) => <ActionsDropdown director={row.original} />,
	},
];
