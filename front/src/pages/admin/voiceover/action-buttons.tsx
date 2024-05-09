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
import { voiceFormTab } from './voice-form-tab';
import { useSuccessToast } from '@/hooks/use-success-toast';

import { useErrorToast } from '@/hooks/use-error-toast';
import { VoiceInterface } from '@/types/voice';
import { useDelereVoiceMutation } from '@/redux/api/voice';

export const ActionsDropdown = ({ voice }: { voice: VoiceInterface }) => {
	const [formOpen, setFormOpen] = useState(false);
	const [deleteVoice, { error, isSuccess, isLoading }] = useDelereVoiceMutation();

	const deleteSuccessMsg = useMemo(() => `Озвучка "${voice.voiceover_name}" удалена`, []);

	const handleGenreDelete = useCallback(() => {
		if (voice.id_voiceover) {
			deleteVoice(voice.id_voiceover);
		}
	}, [voice.id_voiceover, deleteVoice]);

	useErrorToast(handleGenreDelete, error);
	useSuccessToast(deleteSuccessMsg, isSuccess);
	return (
		<Fragment>
			<DialogWindow
				open={formOpen}
				setOpen={setFormOpen}
				trigger={null}
				content={<CustomTabs tabs={voiceFormTab(voice)} setDialogOpen={setFormOpen} />}
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
