import { PageLayout } from '@/components/admin/page-layout';
import CustomTabs from '@/components/custom-tabs/custom-tabs';
import DataTable from '@/components/data-table/data-table';
import { genresTableColumns } from './films-columns';
import { ErrorCustomAlert } from '@/components/custom-alert/custom-alert';
import DialogWindow from '@/components/dialog-window/dialog-window';
import { useState } from 'react';
import { filmFormTab } from './film-form-tab';
import { useGetFilmsQuery } from '@/redux/api/film';
import { useAppSelector } from '@/hooks/reduxHooks';

export default function TableFilmPage() {
	const [formOpen, setFormOpen] = useState(false);
	const { user } = useAppSelector((s) => s.auth);
	const {
		data: films,
		error,
		isFetching,
		refetch,
	} = useGetFilmsQuery({ id_user: user?.id_user });

	return (
		<PageLayout
			title={'Список фильмов'}
			onRefreshClick={refetch}
			isLoading={isFetching}
			actionButton={
				<DialogWindow
					size="lg"
					open={formOpen}
					setOpen={setFormOpen}
					content={<CustomTabs tabs={filmFormTab()} setDialogOpen={setFormOpen} />}
				/>
			}
		>
			{error ? (
				<ErrorCustomAlert error={error} />
			) : (
				<DataTable
					data={films!}
					columns={genresTableColumns}
					isLoading={isFetching}
					hasBackground
				/>
			)}
		</PageLayout>
	);
}
