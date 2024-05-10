import { PageLayout } from '@/components/admin/page-layout';
import CustomTabs from '@/components/custom-tabs/custom-tabs';
import DataTable from '@/components/data-table/data-table';

import { ErrorCustomAlert } from '@/components/custom-alert/custom-alert';
import DialogWindow from '@/components/dialog-window/dialog-window';
import { useState } from 'react';

import { useGetDirectorsQuery } from '@/redux/api/director';
import { directorsTableColumns } from './director-columns';
import { directorFormTab } from './director-form-tab';

export default function TableActorPage() {
	const [formOpen, setFormOpen] = useState(false);

	const { data: directors, error, isFetching, refetch } = useGetDirectorsQuery();

	return (
		<PageLayout
			title={'Режиссеры'}
			onRefreshClick={refetch}
			isLoading={isFetching}
			actionButton={
				<DialogWindow
					open={formOpen}
					setOpen={setFormOpen}
					content={<CustomTabs tabs={directorFormTab()} setDialogOpen={setFormOpen} />}
				/>
			}
		>
			{error ? (
				<ErrorCustomAlert error={error} />
			) : (
				<DataTable
					data={directors!}
					columns={directorsTableColumns}
					isLoading={isFetching}
					hasBackground
				/>
			)}
		</PageLayout>
	);
}
