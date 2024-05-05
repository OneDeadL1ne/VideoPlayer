import { Fragment, useCallback, useMemo, useState } from 'react';
import { MoreVertical } from 'lucide-react';

import CustomTabs from '@/components/custom-tabs/custom-tabs.tsx';
import DialogWindow from '@/components/dialog-window/dialog-window.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { GenreInterface } from '@/types/genre';
import { genreFormTab } from './genre-form-tab';
import { useSuccessToast } from '@/hooks/use-success-toast';
import { useDelereGenreMutation } from '@/redux/api/genre';
import { useErrorToast } from '@/hooks/use-error-toast';

export const ActionsDropdown = ({ genre }: { genre: GenreInterface }) => {
	const [formOpen, setFormOpen] = useState(false);
	const [deleteGenre, { error, isSuccess, isLoading }] = useDelereGenreMutation();

	const deleteSuccessMsg = useMemo(() => `Жанр "${genre.genre_name}" удален`, []);

	const handleGenreDelete = useCallback(() => {
		if (genre.id_genre) {
			deleteGenre(genre.id_genre);
		}
	}, [genre.id_genre, deleteGenre]);

	useErrorToast(handleGenreDelete, error);
	useSuccessToast(deleteSuccessMsg, isSuccess);
	return (
		<Fragment>
			<DialogWindow
				open={formOpen}
				setOpen={setFormOpen}
				trigger={null}
				content={<CustomTabs tabs={genreFormTab(genre)} setDialogOpen={setFormOpen} />}
			/>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0 text-[#8A9099]">
						<span className="sr-only">Закрыть</span>
						<MoreVertical className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="bg-accent outline-none border-0">
					<DropdownMenuItem
						className="  hover:cursor-pointer "
						onClick={() => {
							setFormOpen(true);
						}}
					>
						<p className="hover:text-primary text-accent-foreground">Изменить</p>
					</DropdownMenuItem>
					<DropdownMenuItem
						className="text-primary hover:cursor-pointer "
						onClick={handleGenreDelete}
						disabled={isLoading}
					>
						Удалить
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</Fragment>
	);
};
