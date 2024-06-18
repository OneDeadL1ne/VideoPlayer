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
		<div className="@container flex">
			<div className=" gap-10">
				<div>
					<p>Список фильмов</p>
					<div className="grid grid-flow-row grid-cols-3 ">
						{films?.length != 0 &&
							films?.map((film, index) => {
								if (!film.trailer_path || !film.preview_path || !film.film_path) {
									return;
								}
								return (
									<div className="h-[230px] w-[400px] " key={index}>
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
				{filmsIsSubscribe.length != 0 && (
					<div>
						<p>Список фильмов с подпиской</p>
						<div>
							{filmsIsSubscribe?.length != 0 &&
								filmsIsSubscribe?.map((film, index) => {
									if (
										!film.trailer_path ||
										!film.preview_path ||
										!film.film_path
									) {
										return;
									}
									return (
										<div className="h-[250px] w-[430px]" key={index}>
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
	);
}
