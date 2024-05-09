import { ColumnDef } from '@tanstack/react-table';
import { ActionsDropdown } from './action-buttons.tsx';
import { ActorInterface } from '@/types/actor.ts';
import { AvatarActor } from '@/components/avatar/avatar.tsx';

export const actorsTableColumns: ColumnDef<ActorInterface>[] = [
	{
		header: 'Номер',
		accessorKey: 'id_actor',
	},
	{
		accessorKey: 'avatar_url',
		header: 'Фото',
		cell: ({ row }) => <AvatarActor avatar_url={row.original.avatar_url!} />,
	},
	{
		accessorKey: 'last_name',
		header: 'Фимилия',
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
		cell: ({ row }) => <ActionsDropdown actor={row.original} />,
	},
];
