import { useAppSelector } from '@/hooks/reduxHooks';
import { useGetFilmsUserMutation } from '@/redux/api/film';
import { useGetGenreIdQuery, useGetGenreMutation } from '@/redux/api/genre';
import { FilmInterface } from '@/types/film';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export function GenrePage() {
	const { id } = useParams();
	const { user } = useAppSelector((s) => s.auth);
	const [fetchGenre, { data: genreData, isSuccess: isGenreSuccess }] = useGetGenreMutation();
	const [fetchFilm, { data, isSuccess }] = useGetFilmsUserMutation();
	const [filmsIsSubscribe, setFilmsIsSubscribe] = useState<FilmInterface[] | []>([]);
	const [films, setFilms] = useState<FilmInterface[] | []>([]);
	useEffect(() => {
		if (!genreData && isGenreSuccess) {
			return;
		}

		if ((data && !user?.is_subscription) || (data && !user)) {
			setFilmsIsSubscribe(
				[...data].filter(
					(i) => i.is_subscribe && i.genres.filter((i) => i.id_genre == Number(id))
				)
			);
			setFilms(
				[...data].filter(
					(i) => !i.is_subscribe && i.genres.filter((i) => i.id_genre == Number(id))
				)
			);
		}
		if (data && user?.is_subscription && genreData) {
			setFilms([...data].filter((i) => i.genres.filter((i) => i.id_genre == Number(id))));
			setFilmsIsSubscribe([]);
		}
	}, [isGenreSuccess]);
	useEffect(() => {
		fetchFilm({ id_user: 5 });
		fetchGenre(Number(id));
	}, [user]);

	console.log(films, filmsIsSubscribe);
	return <div className="text-white">{id}</div>;
}
