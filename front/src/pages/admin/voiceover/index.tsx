import { PageLayout } from '@/components/admin/page-layout';
import CustomTabs from '@/components/custom-tabs/custom-tabs';
import DataTable from '@/components/data-table/data-table';

import { ErrorCustomAlert } from '@/components/custom-alert/custom-alert';
import DialogWindow from '@/components/dialog-window/dialog-window';
import { useState } from 'react';
import { voiceFormTab } from './voice-form-tab';
import { useGetVoicesQuery } from '@/redux/api/voice';
import { voicesTableColumns } from './voice-columns';

export default function TableVoiceOverPage() {
	const [formOpen, setFormOpen] = useState(false);
	//const { data: genres } = useGetGenresQuery();
	const { data: voices, error, isFetching, refetch } = useGetVoicesQuery();

	return (
		<PageLayout
			title={'Озвучка'}
			onRefreshClick={refetch}
			isLoading={isFetching}
			actionButton={
				<DialogWindow
					open={formOpen}
					setOpen={setFormOpen}
					className="border-0"
					content={<CustomTabs tabs={voiceFormTab()} setDialogOpen={setFormOpen} />}
				/>
			}
		>
			{error ? (
				<ErrorCustomAlert error={error} />
			) : (
				<DataTable
					data={voices!}
					columns={voicesTableColumns}
					isLoading={isFetching}
					hasBackground
				/>
			)}
		</PageLayout>
	);
}
