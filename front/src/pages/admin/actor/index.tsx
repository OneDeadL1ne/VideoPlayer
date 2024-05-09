import { PageLayout } from '@/components/admin/page-layout';
import CustomTabs from '@/components/custom-tabs/custom-tabs';
import DataTable from '@/components/data-table/data-table';

import { ErrorCustomAlert } from '@/components/custom-alert/custom-alert';
import DialogWindow from '@/components/dialog-window/dialog-window';
import { useState } from 'react';

import { useGetActorsQuery } from '@/redux/api/actor';
import { actorsTableColumns } from './actor-columns';
import { actorFormTab } from './actor-form-tab';

export default function TableActorPage() {
	const [formOpen, setFormOpen] = useState(false);

	const { data: actors, error, isFetching, refetch } = useGetActorsQuery();

	return (
		<PageLayout
			title={'Актеры'}
			onRefreshClick={refetch}
			isLoading={isFetching}
			actionButton={
				<DialogWindow
					open={formOpen}
					setOpen={setFormOpen}
					content={<CustomTabs tabs={actorFormTab()} setDialogOpen={setFormOpen} />}
				/>
			}
		>
			{error ? (
				<ErrorCustomAlert error={error} />
			) : (
				<DataTable
					data={actors!}
					columns={actorsTableColumns}
					isLoading={isFetching}
					hasBackground
				/>
			)}
		</PageLayout>
	);
}
