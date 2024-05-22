import { Dispatch, SetStateAction, useMemo } from 'react';

import { z } from 'zod';

import CustomForm, { useForm } from '@/components/form/form.tsx';

import { LoadingSpinner } from '@/components/loaders/spinner.tsx';
import { Button } from '@/components/ui/button.tsx';
import { FormField } from '@/components/ui/form.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';

import { useErrorToast } from '@/hooks/use-error-toast.tsx';
import { useSuccessToast } from '@/hooks/use-success-toast.tsx';

import { GenreInterface } from '@/types/genre.ts';
import { useCreateGenreMutation, useUpdateGenreMutation } from '@/redux/api/genre';
import { InputField } from '@/components/input/input-field';

const formSchema = z.object({
	genre_name: z.string().min(1, ''),
});

interface AddGenreFormProps {
	genre?: GenreInterface;
	setDialogOpen?: Dispatch<SetStateAction<boolean>>;
}

const AddGenreForm = ({ genre, setDialogOpen }: AddGenreFormProps) => {
	const form = useForm({
		schema: formSchema,
		defaultValues: !genre ? { genre_name: '' } : { genre_name: genre.genre_name },
	});

	const [addGenre, { isLoading: isAdding, error: addError, isSuccess: addSuccess }] =
		useCreateGenreMutation();

	const [updateGenre, { isLoading: isUpdating, error: updateError, isSuccess: updateSuccess }] =
		useUpdateGenreMutation();

	const handleSubmit = (data: { genre_name: string }) => {
		if (genre) {
			updateGenre({ id_genre: genre.id_genre, ...data });
		} else {
			addGenre(data);
		}
	};

	const addSuccessMsg = useMemo(() => {
		return 'Жанр добавлен';
	}, []);

	const updateSuccessMsg = useMemo(() => {
		return 'Жанр изменен ';
	}, []);

	useSuccessToast(addSuccessMsg, addSuccess, setDialogOpen);
	useSuccessToast(updateSuccessMsg, updateSuccess, setDialogOpen);
	useErrorToast(void 0, addError);
	useErrorToast(void 0, updateError);

	return (
		<CustomForm className="mt-3 px-8 pb-8 border-0" form={form} onSubmit={handleSubmit}>
			<ScrollArea className="w-full h-[150px]   border-0 ">
				<FormField
					control={form.control}
					name="genre_name"
					render={({ field }) => (
						<InputField
							className="text-accent-foreground ml-1 "
							classNameInput="border border-input"
							label={'Название'}
							isRequired
							{...field}
							disabled={isAdding || isUpdating}
						/>
					)}
				/>

				<Button
					className="mt-5 ml-1 text-white "
					type="submit"
					disabled={isAdding || isUpdating}
				>
					{isAdding || isUpdating ? (
						<LoadingSpinner className="text-white" />
					) : !genre ? (
						'Добавить'
					) : (
						'Изменить'
					)}
				</Button>
			</ScrollArea>
		</CustomForm>
	);
};

export default AddGenreForm;
