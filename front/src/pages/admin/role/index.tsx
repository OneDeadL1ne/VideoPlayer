import { PageLayout } from '@/components/admin/page-layout';
import CustomTabs from '@/components/custom-tabs/custom-tabs';
import DataTable from '@/components/data-table/data-table';

import { genresTableColumns } from './roles-columns';
import { ErrorCustomAlert } from '@/components/custom-alert/custom-alert';
import DialogWindow from '@/components/dialog-window/dialog-window';
import { useState } from 'react';

import { useGetRolesQuery } from '@/redux/api/role';
import { roleFormTab } from './role-form-tab';

export default function TableUserPage() {
	const [formOpen, setFormOpen] = useState(false);

	const { data: roles, error, isFetching, refetch } = useGetRolesQuery();

	return (
		<PageLayout
			title={'Роли'}
			onRefreshClick={refetch}
			isLoading={isFetching}
			actionButton={
				<DialogWindow
					open={formOpen}
					setOpen={setFormOpen}
					content={<CustomTabs tabs={roleFormTab()} setDialogOpen={setFormOpen} />}
				/>
			}
		>
			{error ? (
				<ErrorCustomAlert error={error} />
			) : (
				<DataTable
					data={roles!}
					columns={genresTableColumns}
					isLoading={isFetching}
					hasBackground
				/>
			)}
		</PageLayout>
	);
}
