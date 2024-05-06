import { PageLayout } from '@/components/admin/page-layout';
import CustomTabs from '@/components/custom-tabs/custom-tabs';
import DataTable from '@/components/data-table/data-table';
import { useGetGenresQuery } from '@/redux/api/genre';
import { genresTableColumns } from './genres-columns';
import { ErrorCustomAlert } from '@/components/custom-alert/custom-alert';
import DialogWindow from '@/components/dialog-window/dialog-window';
import { useState } from 'react';
import { genreFormTab } from './genre-form-tab';

export default function TableDirectorPage() {
	const [formOpen, setFormOpen] = useState(false);
	//const { data: genres } = useGetGenresQuery();
	const { data: genres, error, isFetching, refetch } = useGetGenresQuery();

	return (
		<PageLayout
			title={'Режиссёры'}
			onRefreshClick={refetch}
			isLoading={isFetching}
			actionButton={
				<DialogWindow
					open={formOpen}
					setOpen={setFormOpen}
					content={<CustomTabs tabs={genreFormTab()} setDialogOpen={setFormOpen} />}
				/>
			}
		>
			{error ? (
				<ErrorCustomAlert error={error} />
			) : (
				<DataTable
					data={genres!}
					columns={genresTableColumns}
					isLoading={isFetching}
					hasBackground
				/>
			)}
		</PageLayout>
	);
}
