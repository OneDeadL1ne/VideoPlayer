import { RoleInterface } from '@/types/role.ts';
import AddRoleForm from './add-role-form.tsx';

export const roleFormTab = (role?: RoleInterface) => [
	{
		value: 'role-creation',
		head: `${role ? 'Изменение роли' : 'Добавление'}`,
		isDialog: true,
		content: <AddRoleForm role={role} />,
	},
];
