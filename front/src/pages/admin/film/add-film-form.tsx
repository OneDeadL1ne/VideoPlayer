import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';

import { z } from 'zod';

import CustomForm, { useForm } from '@/components/form/form.tsx';

import { LoadingSpinner } from '@/components/loaders/spinner.tsx';
import { Button } from '@/components/ui/button.tsx';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';

import { useErrorToast } from '@/hooks/use-error-toast.tsx';
import { useSuccessToast } from '@/hooks/use-success-toast.tsx';

import { InputField } from '@/components/input/input-field';
import { FilmInterface } from '@/types/film';
import { useCreateFilmMutation, useUpdateFilmMutation } from '@/redux/api/film';
import { Textarea } from '@/components/ui/textarea';
import { useGetActorsQuery } from '@/redux/api/actor';

import { Switch } from '@/components/ui/switch';
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/components/ui/select';

import { useGetAgeLimitsQuery } from '@/redux/api/age';
import { MultiSelect, type Option } from '@/components/multi-select';
import { useGetDirectorsQuery } from '@/redux/api/director';
import { useGetGenresQuery } from '@/redux/api/genre';
import { useGetVoicesQuery } from '@/redux/api/voice';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
	film_title: z.string(),
	film_length_seconds: z.string(),
	description: z.string(),
	rating: z.string(),
	subtitles: z.boolean(),
	release_year: z.string(),
	release_year_russia: z.string(),
	is_subscribe: z.boolean(),
	is_deleted: z.boolean(),
	id_age_limit: z.string(),

	actor_ids: z.array(z.string()).refine((value) => value.some((item) => item)),
	director_ids: z.array(z.string()).refine((value) => value.some((item) => item)),
	voiceover_ids: z.array(z.string()).refine((value) => value.some((item) => item)),
	genre_ids: z.array(z.string()).refine((value) => value.some((item) => item)),
});

interface AddFilmFormProps {
	film?: FilmInterface;
	setDialogOpen?: Dispatch<SetStateAction<boolean>>;
}

const AddFilmForm = ({ film, setDialogOpen }: AddFilmFormProps) => {
	const { data: actors = [] } = useGetActorsQuery();
	const { data: directors = [] } = useGetDirectorsQuery();
	const { data: genres = [] } = useGetGenresQuery();
	const { data: voiceovers = [] } = useGetVoicesQuery();
	const { data: agelimits = [] } = useGetAgeLimitsQuery();
	const { toast } = useToast();
	const [selectedActors, setSelectedActors] = useState<string[]>(
		film ? [...film.actors.map((actor) => actor.id_actor.toString())] : []
	);

	const [selectedDirectors, setSelectedDirectors] = useState<string[]>(
		film ? [...film.directors.map((director) => director.id_director.toString())] : []
	);
	const [selectedVoiceovers, setSelectedVoiceovers] = useState<string[]>(
		film ? [...film.voiceovers.map((voiceover) => voiceover.id_voiceover.toString())] : []
	);
	const [selectedGenres, setSelectedGenres] = useState<string[]>(
		film ? [...film.genres.map((genre) => genre.id_genre.toString())] : []
	);

	const mappedActors: Option[] = useMemo(
		() =>
			actors.map((actor) => ({
				label: `${actor.first_name.replace(/['"]/g, '')} ${actor.last_name.replace(
					/['"]/g,
					''
				)}`,
				value: actor.id_actor.toString(),
			})),
		[actors]
	);

	const mappedDirectors: Option[] = useMemo(
		() =>
			directors.map((director) => ({
				label: `${director.first_name.replace(/['"]/g, '')} ${director.last_name.replace(
					/['"]/g,
					''
				)}`,
				value: director.id_director.toString(),
			})),
		[directors]
	);
	const mappedGenres: Option[] = useMemo(
		() =>
			genres.map((genre) => ({
				label: genre.genre_name.replace(/['"]/g, ''),
				value: genre.id_genre.toString(),
			})),
		[genres]
	);
	const mappedVoiceovers: Option[] = useMemo(
		() =>
			voiceovers.map((voiceover) => ({
				label: voiceover.voiceover_name.replace(/['"]/g, ''),
				value: voiceover.id_voiceover.toString(),
			})),
		[voiceovers]
	);
	const form = useForm({
		schema: formSchema,
		defaultValues: !film
			? {
					film_title: '',
					description: '',
					film_length_seconds: '',
					rating: '',
					id_age_limit: '',
					genre_ids: [],
					voiceover_ids: [],
					director_ids: [],
					actor_ids: [],
					release_year: '',
					release_year_russia: '',
					is_deleted: false,
					is_subscribe: false,
					subtitles: false,
			  }
			: {
					film_title: film.film_title,
					description: film.description,
					film_length_seconds: film.film_length_seconds.toString(),
					rating: film.rating.toString(),
					id_age_limit: String(film.age_limit?.id_age_limit),
					genre_ids: selectedGenres,
					voiceover_ids: selectedVoiceovers,
					director_ids: selectedDirectors,
					actor_ids: selectedActors,
					release_year: film.release_year.toString(),
					release_year_russia: film.release_year_russia.toString(),
					is_deleted: film.is_deleted,
					is_subscribe: film.is_subscribe,
					subtitles: film.subtitles,
			  },
	});

	const [addFilm, { isLoading: isAdding, error: addError, isSuccess: addSuccess }] =
		useCreateFilmMutation();

	const [updateFilm, { isLoading: isUpdating, error: updateError, isSuccess: updateSuccess }] =
		useUpdateFilmMutation();

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		const newFilm: FilmInterface = {
			film_title: data.film_title,
			actor_ids: data.actor_ids.map(Number), //selectedActors.map(Number),
			description: data.description,
			voiceover_ids: data.voiceover_ids.map(Number),
			director_ids: data.director_ids.map(Number),
			film_length_seconds: Number(data.film_length_seconds),
			genre_ids: data.genre_ids.map(Number),
			is_processed: 1,
			is_subscribe: data.is_subscribe,
			rating: Number(data.rating),
			subtitles: data.subtitles,
			release_year: Number(data.release_year),
			release_year_russia: Number(data.release_year_russia),
			is_deleted: data.is_deleted,
			id_age_limit: Number(data.id_age_limit),
			actors: [],
			directors: [],
			genres: [],
			voiceovers: [],
		};

		if (film?.id_film) {
			updateFilm({ id_film: film.id_film, ...newFilm });
		} else {
			addFilm(newFilm);
		}
	};

	const addSuccessMsg = useMemo(() => {
		return 'Фильм добавлен';
	}, []);

	const updateSuccessMsg = useMemo(() => {
		return 'Фильм изменен ';
	}, []);

	useSuccessToast(addSuccessMsg, addSuccess, setDialogOpen);
	useSuccessToast(updateSuccessMsg, updateSuccess, setDialogOpen);
	useErrorToast(void 0, addError);
	useErrorToast(void 0, updateError);

	useEffect(() => {
		form.setValue('voiceover_ids', selectedVoiceovers);
		if (selectedVoiceovers.length != 0) {
			form.clearErrors();
		}
	}, [selectedVoiceovers]);

	useEffect(() => {
		form.setValue('genre_ids', selectedGenres);
		if (selectedGenres.length != 0) {
			form.clearErrors();
		}
	}, [selectedGenres]);

	useEffect(() => {
		form.setValue('director_ids', selectedDirectors);
		if (selectedDirectors.length != 0) {
			form.clearErrors();
		}
	}, [selectedDirectors]);

	useEffect(() => {
		form.setValue('actor_ids', selectedActors);
		if (selectedActors.length != 0) {
			form.clearErrors();
		}
	}, [selectedActors]);

	return (
		<CustomForm className="mt-3 px-8 pb-8" form={form} onSubmit={handleSubmit}>
			<ScrollArea className="w-full h-[550px] px-1 ">
				<div className="grid grid-cols-2 gap-7 grid-flow-row">
					<div>
						<FormField
							control={form.control}
							name="film_title"
							render={({ field }) => (
								<InputField
									className="text-accent-foreground ml-1  mt-3	 "
									classNameInput="border border-input"
									label={'Название'}
									isRequired
									{...field}
									disabled={isAdding || isUpdating}
								/>
							)}
						/>
						<FormField
							control={form.control}
							name="film_length_seconds"
							render={({ field }) => (
								<InputField
									className="text-accent-foreground ml-1 mt-3	 "
									classNameInput="border border-input"
									label={'Продолжительность фильма (в сек.)'}
									min={0}
									type="number"
									{...field}
									disabled={isAdding || isUpdating}
								/>
							)}
						/>

						<FormField
							control={form.control}
							name="rating"
							render={({ field }) => (
								<InputField
									className="text-accent-foreground ml-1 mt-3	 "
									classNameInput="border border-input"
									label={'Рейтинг'}
									isRequired
									step={0.1}
									max={5}
									min={0}
									type="number"
									{...field}
									disabled={isAdding || isUpdating}
								/>
							)}
						/>
						<FormField
							control={form.control}
							name="release_year"
							render={({ field }) => (
								<InputField
									className="text-accent-foreground ml-1 mt-3 	 "
									classNameInput="border border-input"
									label={'Год релиза (мировой)'}
									min={0}
									type="number"
									{...field}
									disabled={isAdding || isUpdating}
								/>
							)}
						/>
						<FormField
							control={form.control}
							name="genre_ids"
							render={() => (
								<FormItem className="w-full ml-1  mt-3 ">
									<FormLabel className="text-accent-foreground">Жанры</FormLabel>
									<div className=" ">
										<MultiSelect
											className=""
											options={mappedGenres}
											onValueChange={(values) => {
												setSelectedGenres(values);
											}}
											defaultValue={selectedGenres}
											placeholder="Выберите Жанры "
											variant="default"
											maxCount={1}
										/>
									</div>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="voiceover_ids"
							render={() => (
								<FormItem className="w-full ml-1  mt-3 ">
									<FormLabel className="text-accent-foreground">
										Озвучки
									</FormLabel>
									<div className=" ">
										<MultiSelect
											className=""
											options={mappedVoiceovers}
											onValueChange={(values) => {
												setSelectedVoiceovers(values);
											}}
											defaultValue={selectedVoiceovers}
											placeholder="Выберите озвучки "
											variant="default"
											maxCount={1}
										/>
									</div>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="id_age_limit"
							render={() => (
								<FormItem className=" mt-3 ml-1">
									<FormLabel className="text-accent-foreground">
										Возрастное ограничение
									</FormLabel>

									{agelimits.length > 0 && (
										<Select
											onValueChange={(value) => {
												form.setValue('id_age_limit', value);
											}}
											defaultValue={form.getValues('id_age_limit').toString()}
										>
											<FormControl>
												<SelectTrigger className="bg-secondary text-accent-foreground focus-visible:border-black ">
													<SelectValue
														placeholder={'Возраст'}
														className="text-accent-foreground "
													>
														{
															agelimits.find((x) => {
																if (
																	x.id_age_limit ==
																	Number(
																		form.getValues(
																			'id_age_limit'
																		)
																	)
																) {
																	return '0';
																}

																return (
																	x.id_age_limit ==
																	Number(
																		form.getValues(
																			'id_age_limit'
																		)
																	)
																);
															})?.age_limit_name
														}
													</SelectValue>
												</SelectTrigger>
											</FormControl>
											<SelectContent className="bg-accent border-0 outline-none">
												{agelimits.map((age) => (
													<SelectItem
														className="text-muted-foreground hover:text-accent-foreground"
														key={age.id_age_limit}
														value={String(age.id_age_limit)}
													>
														{age.age_limit_name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									)}
								</FormItem>
							)}
						/>
					</div>
					<div>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem className="mt-3 mr-2">
									<FormLabel className="text-accent-foreground">
										Описание
									</FormLabel>
									<FormControl>
										<Textarea
											className="min-h-[213px] text-accent-foreground  bg-secondary 	"
											placeholder="Описание"
											required
											{...field}
											disabled={isAdding || isUpdating}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="release_year_russia"
							render={({ field }) => (
								<InputField
									className="text-accent-foreground ml-1 mt-3 mr-2	 "
									classNameInput="border border-input"
									label={'Год релиза (РФ)'}
									min={0}
									type="number"
									{...field}
									disabled={isAdding || isUpdating}
								/>
							)}
						/>
						<FormField
							control={form.control}
							name="director_ids"
							render={() => (
								<FormItem className="w-full mt-3 mr-2">
									<FormLabel className="text-accent-foreground">
										Режиссеры
									</FormLabel>
									<div className=" mr-2">
										<MultiSelect
											className=""
											options={mappedDirectors}
											onValueChange={(values) => {
												setSelectedDirectors(values);
											}}
											defaultValue={selectedDirectors}
											placeholder="Выберите режиссеров "
											variant="default"
											maxCount={1}
										/>
									</div>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="actor_ids"
							render={() => (
								<FormItem className="w-full mt-3 ">
									<FormLabel className="text-accent-foreground">Актеры</FormLabel>
									<div className="mr-2">
										<MultiSelect
											options={mappedActors}
											onValueChange={(values) => {
												setSelectedActors(values);
											}}
											defaultValue={selectedActors}
											placeholder="Выберите акторов"
											variant="default"
											maxCount={1}
										/>
									</div>
								</FormItem>
							)}
						/>
					</div>
				</div>
				<div>
					<FormField
						control={form.control}
						name="is_subscribe"
						render={({ field }) => (
							<FormItem className="flex mt-3 ml-1 mr-2 flex-row items-center justify-between rounded-lg border p-4">
								<div className="space-y-0.5">
									<FormLabel className="text-accent-foreground">
										Подписка
									</FormLabel>
								</div>
								<FormControl>
									<Switch
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="subtitles"
						render={({ field }) => (
							<FormItem className="flex mt-3 ml-1 mr-2 flex-row items-center justify-between rounded-lg border p-4">
								<div className="space-y-0.5">
									<FormLabel className="text-accent-foreground">
										Субтитры
									</FormLabel>
								</div>
								<FormControl>
									<Switch
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
				<Button
					className="mt-5 mr-4 ml-1 text-white"
					type="submit"
					onClick={() => {
						form.clearErrors();
						if (Object.keys(form.formState.errors).length != 0) {
							toast({
								variant: 'destructive',
								title: 'Ошибка',
								duration: 700,
							});
						}
					}}
					disabled={isAdding || isUpdating}
				>
					{isAdding || isUpdating ? <LoadingSpinner /> : !film ? 'Добавить' : 'Изменить'}
				</Button>
			</ScrollArea>
		</CustomForm>
	);
};

export default AddFilmForm;
