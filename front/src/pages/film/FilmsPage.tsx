import CustomCard from '@/components/custom-card/CustomCard';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useGetFilmsUserMutation } from '@/redux/api/film';
import { FilmInterface } from '@/types/film';
import { useEffect, useState } from 'react';

export default function FilmsPage() {
	const { user } = useAppSelector((s) => s.auth);
	const [fetchFilm, { data, isSuccess }] = useGetFilmsUserMutation();
	const [filmsIsSubscribe, setFilmsIsSubscribe] = useState<FilmInterface[] | []>([]);
	const [films, setFilms] = useState<FilmInterface[] | []>([]);
	useEffect(() => {
		if ((data && !user?.is_subscription) || (data && !user)) {
			setFilmsIsSubscribe([...data].filter((i) => i.is_subscribe));
			setFilms([...data].filter((i) => !i.is_subscribe));
		}
		if (data && user?.is_subscription) {
			setFilms(data);
			setFilmsIsSubscribe([]);
		}
	}, [isSuccess]);
	useEffect(() => {
		fetchFilm({ id_user: 5 });
	}, [user]);

	return (
		<div className="@container flex  justify-center">
			<div className="flex justify-center items-center gap-10">
				<div className="flex flex-col justify-center items-center mt-5 ">
					<div className="flex">
						<p className="flex flex-row text-primary items-center text-4xl @[450px]:text-5xl   font-semibold ">
							Список фильмов
						</p>
					</div>

					<div className="grid grid-flow-row mt-3 @[900px]:grid-cols-2 @[1300px]:grid-cols-3 ">
						{films?.length != 0 &&
							films?.map((film, index) => {
								if (!film.trailer_path || !film.preview_path) {
									return;
								}
								return (
									<div
										className="@[350px]:h-[200px] @[450px]:h-[230px] @[350px]:w-[340px]  @[450px]:w-[400px] p-2 "
										key={index}
									>
										<CustomCard
											videoId={film.id_film?.toString()}
											current={0}
											index={index}
											film={film}
											type="films"
											key={film.id_film}
										/>
									</div>
								);
							})}
					</div>
					{filmsIsSubscribe.length != 0 && (
						<div className="flex flex-col justify-center items-center mt-5 ">
							<div className="flex justify-center">
								<p className="text-primary text-balance text-center text-4xl @[450px]:text-5xl   font-semibold ">
									Список фильмов с подпиской
								</p>
							</div>

							<div className="grid grid-flow-row mt-3 @[900px]:grid-cols-2 @[1300px]:grid-cols-3 ">
								{filmsIsSubscribe?.length != 0 &&
									filmsIsSubscribe?.map((film, index) => {
										if (!film.trailer_path || !film.preview_path) {
											return;
										}
										return (
											<div
												className="@[350px]:h-[200px] @[450px]:h-[230px] @[350px]:w-[340px]  @[450px]:w-[400px] p-2 "
												key={index}
											>
												<CustomCard
													videoId={film.id_film?.toString()}
													current={0}
													index={index}
													film={film}
													type="films"
													key={film.id_film}
												/>
											</div>
										);
									})}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
