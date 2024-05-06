import { ColumnDef } from '@tanstack/react-table';
import { ActionsDropdown } from './action-buttons.tsx';

import { RoleInterface } from '@/types/role.ts';

export const genresTableColumns: ColumnDef<RoleInterface>[] = [
	{
		header: 'Номер',
		accessorKey: 'id_role',
	},
	{
		accessorKey: 'role_name',
		header: 'Название',
	},
	{
		id: 'actions',
		cell: ({ row }) => <ActionsDropdown role={row.original} />,
	},
];
