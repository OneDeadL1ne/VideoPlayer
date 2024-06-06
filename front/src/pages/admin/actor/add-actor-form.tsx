import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';

import { z } from 'zod';

import CustomForm, { useForm } from '@/components/form/form.tsx';

import { LoadingSpinner } from '@/components/loaders/spinner.tsx';
import { Button } from '@/components/ui/button.tsx';
import { FormField } from '@/components/ui/form.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';

import { InputField } from '@/components/input/input-field';
import { ActorInterface } from '@/types/actor';
import {
	useCreateActorMutation,
	useDeleteAvatarActorMutation,
	useImageActorMutation,
	useUpdateActorMutation,
} from '@/redux/api/actor';

import { CustomAvatar } from '@/components/custom-avatar/CustomAvatar';
import CropperImage from '@/components/cropper/cropper';
import DialogWindow from '@/components/dialog-window/dialog-window';
import { Edit2, Trash2 } from 'lucide-react';
import { useErrorToast } from '@/hooks/use-error-toast';
import { useSuccessToast } from '@/hooks/use-success-toast';
import PlusButton from '@/components/plus-button/plus-button';

interface AddActorFormProps {
	actor?: ActorInterface;
	setDialogOpen?: Dispatch<SetStateAction<boolean>>;
}

const formSchema = z.object({
	first_name: z.string().min(1, ''),
	last_name: z.string().min(1, ''),
	patronymic: z.string(),
});

const AddActorForm = ({ actor, setDialogOpen }: AddActorFormProps) => {
	const [photo, setPhoto] = useState<File | Blob | null>(null);
	const [avatar, setAvatar] = useState<File | Blob | null>(null);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [, setImageUrl] = useState('');
	const [crop, setCrop] = useState(actor?.avatar_url ? actor.avatar_url : '');
	const [open, setOpen] = useState(false);
	const form = useForm({
		schema: formSchema,
		defaultValues: !actor
			? { first_name: '', last_name: '', patronymic: '' }
			: {
					first_name: actor?.first_name,
					last_name: actor?.last_name,
					patronymic: actor?.patronymic,
			  },
	});

	const [
		addActor,
		{ data: newActor, isLoading: isAdding, error: addError, isSuccess: addSuccess },
	] = useCreateActorMutation();
	const [addPhoto, { isSuccess: photoSuccess }] = useImageActorMutation();
	const [resetPhoto, { isSuccess: resetSuccess }] = useDeleteAvatarActorMutation();

	const [updateActor, { isLoading: isUpdating, error: updateError, isSuccess: updateSuccess }] =
		useUpdateActorMutation();

	const handleSubmit = (data: { first_name: string; last_name: string; patronymic: string }) => {
		if (actor?.id_actor) {
			updateActor({ id_actor: actor.id_actor, ...data });
		} else {
			addActor(data);
		}
	};

	const addSuccessMsg = useMemo(() => {
		return 'Актер добавлен';
	}, []);

	const updateSuccessMsg = useMemo(() => {
		return 'Актер изменен';
	}, []);

	useEffect(() => {
		if (addSuccess && newActor.data?.id_actor && avatar && photo) {
			const formData = new FormData();
			formData.append('files', photo);
			formData.append('files', avatar);
			addPhoto({ id_actor: newActor.data?.id_actor, formData: formData });
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
								image={actor?.photo_url ? actor.photo_url : ''}
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
										if (actor?.id_actor && crop && actor.photo_url) {
											resetPhoto(actor?.id_actor);
											setCrop('');

											setAvatar(null);
											setPhoto(null);
										}
										if (!actor?.id_actor && crop && avatar && photo) {
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
						if (actor?.id_actor && avatar && photo) {
							const formData = new FormData();
							formData.append('files', photo);
							formData.append('files', avatar);
							addPhoto({ id_actor: actor?.id_actor, formData: formData });
						}
					}}
					disabled={isAdding || isUpdating}
				>
					{isAdding || isUpdating ? (
						<LoadingSpinner className="text-white" />
					) : !actor ? (
						'Добавить'
					) : (
						'Изменить'
					)}
				</Button>
			</ScrollArea>
		</CustomForm>
	);
};

export default AddActorForm;
