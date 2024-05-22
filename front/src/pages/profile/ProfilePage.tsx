import CropperImage from '@/components/cropper/cropper';
import { CustomAvatar } from '@/components/custom-avatar/CustomAvatar';
import DialogWindow from '@/components/dialog-window/dialog-window';
import CustomForm, { useForm } from '@/components/form/form';
import { InputField } from '@/components/input/input-field';
import PlusButton from '@/components/plus-button/plus-button';
import { LoadingSpinner } from '@/components/spinner/spinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FormField } from '@/components/ui/form';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useErrorToast } from '@/hooks/use-error-toast';
import { useSuccessToast } from '@/hooks/use-success-toast';
import { useGetUserMutation, useUpdateUserMutation } from '@/redux/api/user';
import { setUser } from '@/redux/reducers/authSlice';
import { Edit2, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { z } from 'zod';

const formSchema = z.object({
	email: z.string().email().min(1, ''),
	first_name: z.string().min(1, ''),
	last_name: z.string().min(1, ''),
	patronymic: z.string(),
	nickname: z.string().min(1, ''),
	id_user: z.number(),
});

export default function ProfilePage() {
	const { user } = useAppSelector((s) => s.auth);
	const dispatch = useAppDispatch();

	const [photo, setPhoto] = useState<File | Blob | null>(null);
	const [avatar, setAvatar] = useState<File | Blob | null>(null);

	const [crop, setCrop] = useState(user?.avatar_url ? user.avatar_url : '');
	const [open, setOpen] = useState(false);
	const [edit, setEdit] = useState(false);
	const [imageUrl, setImageUrl] = useState(user?.photo_url ? user.photo_url : '');

	const [updateUser, { error, isLoading, isSuccess }] = useUpdateUserMutation();
	const [fetchUser, { data: userData, isSuccess: isUserSuccess }] = useGetUserMutation();

	const form = useForm({
		schema: formSchema,
		defaultValues: !user
			? { first_name: '', last_name: '', patronymic: '', email: '' }
			: {
					id_user: user.id_user,
					email: user.email,
					first_name: user.person?.first_name,
					last_name: user.person?.last_name,
					patronymic: user.person?.patronymic,
					nickname: user.nickname,
			  },
	});

	const updateSuccessMsg = useMemo(() => {
		return 'Пользователь изменен';
	}, []);

	const handleSubmit = (data: {
		id_user: number;
		email: string;
		first_name: string;
		last_name: string;
		patronymic: string;
		nickname: string;
	}) => {
		if (!edit) {
			updateUser(data);
		}
	};

	useSuccessToast(updateSuccessMsg, isSuccess);

	useErrorToast(() => handleSubmit(form.getValues()), error);

	useEffect(() => {
		if (isSuccess) {
			fetchUser();
		}
		if (isUserSuccess && userData) {
			dispatch(setUser(userData));
		}
	}, [isSuccess, isUserSuccess]);

	return (
		<div className="@container h-full flex justify-center  text-accent-foreground">
			<div className="h-full">
				<Card className="@[700px]:w-[700px]  mt-5 bg-secondary border-0">
					<CardContent className="grid @[700px]:grid-cols-2 grid-flow-row">
						<div className="h-full mt-3 ">
							<DialogWindow
								open={open}
								disabled={!edit}
								trigger={
									<div className={`text-center  mt-6  ${crop && 'hidden'}`}>
										{!imageUrl && (
											<p className="text-primary">Добавить Изображение</p>
										)}
										<div className="flex justify-center">
											<PlusButton type="button" disabled={!edit} />
										</div>
									</div>
								}
								setOpen={setOpen}
								className={`ml-1   sm:max-w-[400px]`}
								content={
									<CropperImage
										setUrl={setImageUrl}
										open={open}
										photo={photo!}
										image={user?.photo_url ? user.photo_url : ''}
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
										className={`relative flex justify-start items-center group ${
											edit && 'hover:cursor-pointer'
										}`}
										onClick={(e) => {
											e.preventDefault();
											if (edit) {
												setOpen(true);
											}
										}}
									>
										{edit && (
											<div className="absolute z-10 ml-[150px] object-cover  opacity-0 group-hover:opacity-100">
												<Edit2 className="text-white inset-0" />
											</div>
										)}
										{imageUrl && <img alt="avatar" src={imageUrl} />}
									</div>
								</div>
							)}
							{edit && (imageUrl || crop) && !open && (
								<div className="mt-3 flex items-center">
									<CustomAvatar avatar_url={crop} className="h-10 w-10" />
									<Button
										className=" ml-3 text-white"
										type="submit"
										onClick={() => {
											setImageUrl('');
											setCrop('');
											if (user?.id_user && crop && user.photo_url) {
												//resetPhoto(actor?.id_actor);
												setAvatar(null);
												setPhoto(null);
											}
											if (!user?.id_user && crop && avatar && photo) {
												setAvatar(null);
												setPhoto(null);
											}
										}}
									>
										<Trash2 color="red" />
									</Button>
								</div>
							)}
						</div>
						<CustomForm className="mt-3 px-8 pb-8" form={form} onSubmit={handleSubmit}>
							{edit ? (
								<div>
									<FormField
										control={form.control}
										name="nickname"
										render={({ field }) => (
											<>
												<p className="text-primary ml-1 mt-3">{'Ник'}</p>
												<InputField
													className="text-primary ml-1   "
													classNameInput="border border-2 text-accent-foreground	 border-primary"
													{...field}
													//disabled={isAdding || isUpdating}
													disabled={!edit}
												/>
											</>
										)}
									/>
									<FormField
										control={form.control}
										name="first_name"
										render={({ field }) => (
											<>
												<p className="text-primary ml-1 mt-3">{'Имя'}</p>
												<InputField
													className="text-primary ml-1   "
													classNameInput="border border-2 text-accent-foreground	 border-primary"
													{...field}
													//disabled={isAdding || isUpdating}
													disabled={!edit}
												/>
											</>
										)}
									/>

									<FormField
										control={form.control}
										name="last_name"
										render={({ field }) => (
											<>
												<p className="text-primary ml-1 mt-3">
													{'Фамилия'}
												</p>
												<InputField
													className="text-primary ml-1   "
													classNameInput="border border-2 text-accent-foreground	 border-primary"
													{...field}
													//disabled={isAdding || isUpdating}
													disabled={!edit}
												/>
											</>
										)}
									/>
									<FormField
										control={form.control}
										name="patronymic"
										render={({ field }) => (
											<>
												<p className="text-primary ml-1 mt-3">
													{'Отчетсво'}
												</p>
												<InputField
													className="text-primary ml-1   "
													classNameInput="border border-2 text-accent-foreground	 border-primary"
													{...field}
													//disabled={isAdding || isUpdating}
													disabled={!edit}
												/>
											</>
										)}
									/>
								</div>
							) : (
								<div>
									<FormField
										control={form.control}
										name="nickname"
										render={({ field }) => (
											<>
												<p className="text-primary ml-1 mt-3">{'Ник'}</p>
												<InputField
													className="text-primary ml-1   "
													classNameInput="border border-2 text-accent-foreground	 border-primary"
													{...field}
													//disabled={isAdding || isUpdating}
													disabled={!edit}
												/>
											</>
										)}
									/>

									<FormField
										control={form.control}
										name="first_name"
										render={({ field }) => (
											<>
												<p className="text-primary ml-1 mt-3">{'Имя'}</p>
												<InputField
													className="text-primary ml-1   "
													classNameInput="border border-2 text-accent-foreground	 border-primary"
													{...field}
													//disabled={isAdding || isUpdating}
													disabled={!edit}
												/>
											</>
										)}
									/>
									<FormField
										control={form.control}
										name="last_name"
										render={({ field }) => (
											<>
												<p className="text-primary ml-1 mt-3">
													{'Фамилия'}
												</p>
												<InputField
													className="text-primary ml-1   "
													classNameInput="border border-2 text-accent-foreground	 border-primary"
													{...field}
													//disabled={isAdding || isUpdating}
													disabled={!edit}
												/>
											</>
										)}
									/>
									<FormField
										control={form.control}
										name="patronymic"
										render={({ field }) => (
											<>
												<p className="text-primary ml-1 mt-3">
													{'Отчетсво'}
												</p>
												<InputField
													className="text-primary ml-1   "
													classNameInput="border border-2 text-accent-foreground	 border-primary"
													{...field}
													//disabled={isAdding || isUpdating}
													disabled={!edit}
												/>
											</>
										)}
									/>
								</div>
							)}

							<div className="mt-3">
								<Button
									onClick={() => {
										setEdit(!edit);
									}}
									className="text-white"
									disabled={isLoading}
									type="submit"
								>
									{isLoading ? (
										<LoadingSpinner />
									) : edit ? (
										'Сохранить'
									) : (
										'Изменить'
									)}
								</Button>
							</div>
						</CustomForm>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
