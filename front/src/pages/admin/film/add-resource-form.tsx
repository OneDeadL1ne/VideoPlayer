import { FilmInterface } from '@/types/film';

import { Dispatch, SetStateAction, useMemo, useState } from 'react';

import { z } from 'zod';

import CustomForm, { useForm } from '@/components/form/form.tsx';

import { LoadingSpinner } from '@/components/loaders/spinner.tsx';
import { Button } from '@/components/ui/button.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';

import { useErrorToast } from '@/hooks/use-error-toast.tsx';
import { useSuccessToast } from '@/hooks/use-success-toast.tsx';

import { useUploadFilmMutation } from '@/redux/api/film';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { VideoPlayer } from '@/components/Video';
import { Select, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { SelectTrigger } from '@radix-ui/react-select';

const formSchema = z.object({
	genre_name: z.string().min(1, ''),
});

interface AddFilmFormProps {
	film?: FilmInterface;
	setDialogOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function AddResourceForm({ film, setDialogOpen }: AddFilmFormProps) {
	const form = useForm({
		schema: formSchema,
		defaultValues: !film ? { genre_name: '' } : { genre_name: film.film_title },
	});

	const [movie, setMovie] = useState<File | null>(null);
	const [trailer, setTrailer] = useState<File | null>(null);
	const [preview, setPreview] = useState<File | null>(null);

	// const dropzone = {
	// 	// accept: {
	// 	// 	'video/*':// ['.jpg', '.jpeg', '.png'],
	// 	// },
	// 	multiple: true,
	// 	maxFiles: 1,
	// 	maxSize: 1 * 1024 * 1024 * 1024,
	// } satisfies DropzoneOptions;

	const [addFile, { isLoading: isAdding, error: addError, isSuccess: addSuccess }] =
		useUploadFilmMutation();

	// const [updateGenre, { isLoading: isUpdating, error: updateError, isSuccess: updateSuccess }] =
	// 	useUpdateGenreMutation();

	const handleSubmit = () => {};

	const addSuccessMsg = useMemo(() => {
		return 'Ресурсы обновлены';
	}, []);

	// const updateSuccessMsg = useMemo(() => {
	// 	return 'Ресурсы обновлены изменен ';
	// }, []);

	useSuccessToast(addSuccessMsg, addSuccess);
	useSuccessToast('Загружается', isAdding, setDialogOpen);
	useErrorToast(void 0, addError);

	const play = () => {
		if (film?.film_path) {
			return film.film_path;
		}
		if (film?.trailer_path) {
			return film.trailer_path;
		}
		return '';
	};
	const [value, setValue] = useState(play());

	return (
		<CustomForm className="mt-3 px-8 pb-8 border-0" form={form} onSubmit={handleSubmit}>
			<ScrollArea className="w-full h-[400px]   border-0 ">
				<div className="grid grid-flow-row grid-cols-2">
					<div>
						<div className="text-accent-foreground">
							<Label>Фильм</Label>
							<div className="flex items-center">
								<Input
									type="file"
									className="border-[2px] w-[200px] text-accent-foreground"
									onChange={(e) => {
										e.preventDefault();

										const file = e.target.files?.[0];

										if (!file) return;

										setMovie(file);
									}}
								/>

								<Button
									className=" ml-2 text-white "
									id="film"
									type="button"
									name="film"
									onClick={(e) => {
										e.preventDefault();

										const formData = new FormData();
										if (film?.id_film && movie) {
											formData.append('files', movie);
											addFile({
												id_film: film.id_film,
												type: 'film',
												formData: formData,
											});
										}
									}}
									disabled={isAdding}
								>
									{isAdding ? (
										<LoadingSpinner className="text-white" />
									) : (
										'Обновить'
									)}
								</Button>
							</div>
						</div>
						<div className="text-accent-foreground mt-3">
							<Label>Трейлер</Label>
							<div className="flex">
								<Input
									type="file"
									className="border-[2px] w-[200px] text-accent-foreground"
									onChange={(e) => {
										e.preventDefault();

										const file = e.target.files?.[0];

										if (!file) return;

										setTrailer(file);
									}}
								/>

								<Button
									className=" ml-2 text-white "
									id="trailer"
									type="button"
									name="trailer"
									onClick={(e) => {
										e.preventDefault();

										const formData = new FormData();
										if (film?.id_film && trailer) {
											formData.append('files', trailer);
											addFile({
												id_film: film.id_film,
												type: 'trailer',
												formData: formData,
											});
										}
									}}
									disabled={isAdding}
								>
									{isAdding ? (
										<LoadingSpinner className="text-white" />
									) : (
										'Обновить'
									)}
								</Button>
							</div>
						</div>
						<div className="text-accent-foreground mt-3">
							<Label>Картинка</Label>
							<div className="flex">
								<Input
									type="file"
									className="border-[2px] w-[200px] text-accent-foreground"
									onChange={(e) => {
										e.preventDefault();

										const file = e.target.files?.[0];

										if (!file) return;

										setPreview(file);
									}}
								/>

								<Button
									className=" ml-2 text-white "
									id="preview"
									type="button"
									name="preview"
									onClick={(e) => {
										e.preventDefault();

										const formData = new FormData();
										if (film?.id_film && preview) {
											console.log(preview);
											formData.append('files', preview);
											addFile({
												id_film: film.id_film,
												type: 'preview',
												formData: formData,
											});
										}
									}}
									disabled={isAdding}
								>
									{isAdding ? (
										<LoadingSpinner className="text-white" />
									) : (
										'Обновить'
									)}
								</Button>
							</div>
						</div>
					</div>
					<div>
						{value.length != 0 && (
							<div className="flex items-center">
								<Label className="text-accent-foreground text-xl">
									{film?.film_title}
								</Label>
								<Select
									onValueChange={(value) => {
										setValue(value);
									}}
									defaultValue={play()}
								>
									<SelectTrigger className="ml-2 bg-primary text-white focus-visible:border-input  flex-row items-center justify-between rounded-lg border pr-4 pl-4 p-1	">
										<SelectValue className="text-accent-foreground" />
									</SelectTrigger>

									<SelectContent className="bg-secondary">
										{film?.film_path && (
											<SelectItem
												value={film.film_path}
												className="text-accent-foreground"
											>
												Фильм
											</SelectItem>
										)}
										{film?.trailer_path && (
											<SelectItem
												value={film.trailer_path}
												className="text-accent-foreground"
											>
												Трейлер
											</SelectItem>
										)}
									</SelectContent>
								</Select>
							</div>
						)}

						<div className="mt-3">
							{(film?.film_path || film?.trailer_path) && (
								<VideoPlayer preview={film.preview_path!} src={value} />
							)}
						</div>
					</div>
				</div>
			</ScrollArea>
		</CustomForm>
	);
}
