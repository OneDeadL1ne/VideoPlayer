import { ColumnDef } from '@tanstack/react-table';
import { ActionsDropdown } from './action-buttons.tsx';

import { VoiceInterface } from '@/types/voice.ts';

export const voicesTableColumns: ColumnDef<VoiceInterface>[] = [
	{
		header: 'Номер',
		accessorKey: 'id_voiceover',
	},
	{
		accessorKey: 'voiceover_name',
		header: 'Название',
	},
	{
		id: 'actions',
		cell: ({ row }) => <ActionsDropdown voice={row.original} />,
	},
];
