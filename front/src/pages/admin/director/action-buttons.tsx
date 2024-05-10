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

import { useSuccessToast } from '@/hooks/use-success-toast';

import { useErrorToast } from '@/hooks/use-error-toast';
import { DirectorInterface } from '@/types/director';
import { useDeleteDirectorMutation } from '@/redux/api/director';
import { directorFormTab } from './director-form-tab';

export const ActionsDropdown = ({ director }: { director: DirectorInterface }) => {
	const [formOpen, setFormOpen] = useState(false);
	const [deleteDirector, { error, isSuccess, isLoading }] = useDeleteDirectorMutation();

	const deleteSuccessMsg = useMemo(
		() => `Режиссер "${director.last_name} ${director.first_name}" удален`,
		[]
	);

	const handleGenreDelete = useCallback(() => {
		if (director.id_director) {
			deleteDirector(director.id_director);
		}
	}, [director.id_director, deleteDirector]);

	useErrorToast(handleGenreDelete, error);
	useSuccessToast(deleteSuccessMsg, isSuccess);
	return (
		<Fragment>
			<DialogWindow
				open={formOpen}
				className="focus:outline-none outline-none "
				setOpen={setFormOpen}
				trigger={null}
				content={
					<CustomTabs tabs={directorFormTab(director)} setDialogOpen={setFormOpen} />
				}
			/>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0 text-[#8A9099]  ">
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
						<p className="hover:text-accent-foreground text-muted-foreground">
							Изменить
						</p>
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
