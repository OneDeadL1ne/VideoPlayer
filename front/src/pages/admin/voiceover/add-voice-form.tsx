import { Dispatch, SetStateAction, useMemo } from 'react';

import { z } from 'zod';

import { ErrorCustomAlert } from '@/components/custom-alert/custom-alert.tsx';
import CustomForm, { useForm } from '@/components/form/form.tsx';

import { LoadingSpinner } from '@/components/loaders/spinner.tsx';
import { Button } from '@/components/ui/button.tsx';
import { FormField } from '@/components/ui/form.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';

import { useErrorToast } from '@/hooks/use-error-toast.tsx';
import { useSuccessToast } from '@/hooks/use-success-toast.tsx';

import { InputField } from '@/components/input/input-field';
import { VoiceInterface } from '@/types/voice';
import { useCreateVoiceMutation, useUpdateVoiceMutation } from '@/redux/api/voice';

const formSchema = z.object({
	voiceover_name: z.string().min(1, ''),
});

interface AddGenreFormProps {
	voice?: VoiceInterface;
	setDialogOpen?: Dispatch<SetStateAction<boolean>>;
}

const AddGenreForm = ({ voice, setDialogOpen }: AddGenreFormProps) => {
	const form = useForm({
		schema: formSchema,
		defaultValues: !voice ? { voiceover_name: '' } : { voiceover_name: voice.voiceover_name },
	});

	const [AddVoice, { isLoading: isAdding, error: addError, isSuccess: addSuccess }] =
		useCreateVoiceMutation();

	const [updateVoice, { isLoading: isUpdating, error: updateError, isSuccess: updateSuccess }] =
		useUpdateVoiceMutation();

	const handleSubmit = (data: { voiceover_name: string }) => {
		if (voice) {
			updateVoice({ id_voiceover: voice.id_voiceover, ...data });
		} else {
			AddVoice(data);
		}
	};

	const addSuccessMsg = useMemo(() => {
		return 'Озвучка добавлена';
	}, []);

	const updateSuccessMsg = useMemo(() => {
		return 'Озвучка изменена ';
	}, []);

	useSuccessToast(addSuccessMsg, addSuccess, setDialogOpen);
	useSuccessToast(updateSuccessMsg, updateSuccess, setDialogOpen);
	useErrorToast(void 0, addError);

	return (
		<CustomForm className="mt-3 px-8 pb-8" form={form} onSubmit={handleSubmit}>
			<ScrollArea className="w-full h-[150px] px-8">
				<FormField
					control={form.control}
					name="voiceover_name"
					render={({ field }) => (
						<InputField
							className="text-accent-foreground "
							classNameInput="border border-input"
							label={'Название'}
							isRequired
							{...field}
							disabled={isAdding || isUpdating}
						/>
					)}
				/>

				{addError && <ErrorCustomAlert error={addError} className="mt-3" />}
				{updateError && <ErrorCustomAlert error={updateError} className="mt-3" />}
				<Button className="mt-5 mr-4" type="submit" disabled={isAdding || isUpdating}>
					{isAdding || isUpdating ? <LoadingSpinner /> : !voice ? 'Добавить' : 'Изменить'}
				</Button>
			</ScrollArea>
		</CustomForm>
	);
};

export default AddGenreForm;
