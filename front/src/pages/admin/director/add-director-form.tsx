import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';

import { z } from 'zod';

import CustomForm, { useForm } from '@/components/form/form.tsx';

import { LoadingSpinner } from '@/components/loaders/spinner.tsx';
import { Button } from '@/components/ui/button.tsx';
import { FormField } from '@/components/ui/form.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';

import { InputField } from '@/components/input/input-field';

import CropperImage from '@/components/cropper/cropper';
import DialogWindow from '@/components/dialog-window/dialog-window';
import { Edit2, Trash2 } from 'lucide-react';
import { useErrorToast } from '@/hooks/use-error-toast';
import { useSuccessToast } from '@/hooks/use-success-toast';
import PlusButton from '@/components/plus-button/plus-button';
import { CustomAvatar } from '@/components/custom-avatar/CustomAvatar';
import { DirectorInterface } from '@/types/director';
import {
	useCreateDirectorMutation,
	useDeleteAvatarDirectorMutation,
	useImageDirectorMutation,
	useUpdateDirectorMutation,
} from '@/redux/api/director';

interface AddDirectorFormProps {
	director?: DirectorInterface;
	setDialogOpen?: Dispatch<SetStateAction<boolean>>;
}

const formSchema = z.object({
	first_name: z.string().min(1, ''),
	last_name: z.string().min(1, ''),
	patronymic: z.string(),
});

const AddDirectorForm = ({ director, setDialogOpen }: AddDirectorFormProps) => {
	const [photo, setPhoto] = useState<File | Blob | null>(null);
	const [avatar, setAvatar] = useState<File | Blob | null>(null);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [imageUrl, setImageUrl] = useState('');
	const [crop, setCrop] = useState(director?.avatar_url ? director.avatar_url : '');
	const [open, setOpen] = useState(false);
	const form = useForm({
		schema: formSchema,
		defaultValues: !director
			? { first_name: '', last_name: '', patronymic: '' }
			: {
					first_name: director?.first_name,
					last_name: director?.last_name,
					patronymic: director?.patronymic,
			  },
	});

	const [
		addDirector,
		{ data: newDirector, isLoading: isAdding, error: addError, isSuccess: addSuccess },
	] = useCreateDirectorMutation();
	const [addPhoto, { isSuccess: photoSuccess }] = useImageDirectorMutation();
	const [resetPhoto, { isSuccess: resetSuccess }] = useDeleteAvatarDirectorMutation();

	const [
		updateDirector,
		{ isLoading: isUpdating, error: updateError, isSuccess: updateSuccess },
	] = useUpdateDirectorMutation();

	const handleSubmit = (data: { first_name: string; last_name: string; patronymic: string }) => {
		if (director?.id_director) {
			updateDirector({ id_director: director.id_director, ...data });
		} else {
			addDirector(data);
		}
	};

	const addSuccessMsg = useMemo(() => {
		return 'Актер добавлен';
	}, []);

	const updateSuccessMsg = useMemo(() => {
		return 'Актер изменен';
	}, []);

	useEffect(() => {
		if (addSuccess && newDirector.data?.id_director && avatar && photo) {
			const formData = new FormData();
			formData.append('files', photo);
			formData.append('files', avatar);
			addPhoto({ id_director: newDirector.data?.id_director, formData: formData });
		}
	}, [addSuccess]);

	const update = (updateSuccess && photoSuccess) || (updateSuccess && resetSuccess);

	useSuccessToast(addSuccessMsg, addSuccess, setDialogOpen);
	useSuccessToast(updateSuccessMsg, update, setDialogOpen);
	useErrorToast(() => handleSubmit(form.getValues()), addError);
	useErrorToast(() => handleSubmit(form.getValues()), updateError);
	return (
		<CustomForm className="mt-3 px-8 pb-8" form={form} onSubmit={handleSubmit}>
			<ScrollArea className="w-full h-[350px] px-1 ">
				<FormField
					control={form.control}
					name="first_name"
					render={({ field }) => (
						<InputField
							className="text-accent-foreground ml-1 	 "
							classNameInput="border border-input"
							label={'Имя'}
							isRequired
							{...field}
							disabled={isAdding || isUpdating}
						/>
					)}
				/>

				<FormField
					control={form.control}
					name="last_name"
					render={({ field }) => (
						<InputField
							className="text-accent-foreground ml-1 mt-3 "
							classNameInput="border border-input"
							label={'Фамилия'}
							isRequired
							{...field}
							disabled={isAdding || isUpdating}
						/>
					)}
				/>
				<FormField
					control={form.control}
					name="patronymic"
					render={({ field }) => (
						<InputField
							className="text-accent-foreground ml-1 mt-3 "
							classNameInput="border border-input"
							label={'Отчество'}
							{...field}
							disabled={isAdding || isUpdating}
						/>
					)}
				/>

				<div className="h-[100px] w-fit mt-3 ml-1  ">
					<p className="text-accent-foreground">Изображение</p>

					<DialogWindow
						open={open}
						trigger={
							<div className={`mt-6 ${crop && 'hidden'}`}>
								<PlusButton type="button" />
							</div>
						}
						setOpen={setOpen}
						className={`ml-1   sm:max-w-[400px]`}
						content={
							<CropperImage
								setUrl={setImageUrl}
								open={open}
								photo={photo!}
								image={director?.photo_url ? director.photo_url : ''}
								cropped={crop}
								setOpen={setOpen}
								updateCrop={setCrop}
								setAvatar={setAvatar}
								setPhoto={setPhoto}
							/>
						}
					/>
					{crop && (
						<div className="flex items-center">
							<div
								className="relative flex justify-start items-center group hover:cursor-pointer"
								onClick={(e) => {
									e.preventDefault();

									setOpen(true);
								}}
							>
								<div className="absolute z-10 ml-[26px] object-cover  opacity-0 group-hover:opacity-100">
									<Edit2 className="text-white inset-0" />
								</div>

								<CustomAvatar
									avatar_url={crop}
									className=" h-20 w-20  object-cover"
								/>
							</div>
							<div className="ml-5">
								<Button
									className="bg-accent"
									type="button"
									onClick={() => {
										if (director?.id_director && crop && director.photo_url) {
											resetPhoto(director?.id_director);
											setCrop('');

											setAvatar(null);
											setPhoto(null);
										}

										if (!director?.id_director && crop && avatar && photo) {
											setCrop('');

											setAvatar(null);
											setPhoto(null);
										}
									}}
								>
									<Trash2 color="red" />
								</Button>
							</div>
						</div>
					)}
				</div>

				<Button
					className="mt-3 ml-1 text-white"
					type="submit"
					onClick={() => {
						if (director?.id_director && avatar && photo) {
							const formData = new FormData();
							formData.append('files', photo);
							formData.append('files', avatar);
							addPhoto({ id_director: director?.id_director, formData: formData });
						}
					}}
					disabled={isAdding || isUpdating}
				>
					{isAdding || isUpdating ? (
						<LoadingSpinner className="text-white" />
					) : !director ? (
						'Добавить'
					) : (
						'Изменить'
					)}
				</Button>
			</ScrollArea>
		</CustomForm>
	);
};

export default AddDirectorForm;
