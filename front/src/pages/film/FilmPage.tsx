import { VideoPlayer } from '@/components/Video';
import { CustomAvatar } from '@/components/custom-avatar/CustomAvatar';
import { Card } from '@/components/ui/card';
import { useGetFilmQuery } from '@/redux/api/film';
import { useParams } from 'react-router-dom';

export function FilmPage() {
	const { id } = useParams();
	const { data } = useGetFilmQuery(Number(id));
	const film = data?.data;
	document.title = film?.film_title || '';
	return (
		<div className="bg-accent text-accent-foreground p-10">
			<Card className="grid  grid-rows-2  bg-secondary border-accent  p-10 gap-10  ">
				<div className="flex justify-center ">
					{/* {film?.preview_path && (
						<img
							src={film?.preview_path}
							alt={`${film?.film_title}`}
							className="object-cover "
						/>
					)} */}
					{film?.film_path && (
						<VideoPlayer src={film.film_path} preview={film.preview_path!} />
					)}
				</div>
				<div className="text-accent-foreground">
					<p className="text-4xl font-bold">{film?.film_title}</p>
					<div className="flex items-center gap-1 mt-5">
						<p className="text-xl text-primary">Год выпуска:</p>
						<p>{film?.release_year}</p>
					</div>

					<p className="text-sm mt-5">{film?.description}</p>
					<div className="flex items-center gap-1 mt-5">
						<p className="text-xl text-primary">Жанры:</p>
						{film?.genres.map((genre, i) => (
							<p key={i}>{genre.genre_name},</p>
						))}
					</div>
					<div className=" items-center gap-1 mt-3">
						<p className="text-xl text-primary">Режиссер</p>
						<div className="flex items-center mt-3">
							{film?.directors.map((director, i) => (
								<CustomAvatar avatar_url={director.avatar_url} key={i} />
							))}
						</div>
					</div>
					<div className=" items-center gap-1 mt-3">
						<p className="text-xl text-primary">Актеры</p>
						<div className="flex items-center gap-2 mt-3">
							{film?.actors.map((actor, i) => (
								<CustomAvatar
									avatar_url={actor.avatar_url}
									key={i}
									className=" outline-1 outline-primary"
								/>
							))}
						</div>
					</div>
				</div>
			</Card>

			{/* {film?.film_path ? (
					<VideoPlayer src={film.film_path} preview={film.preview_path!} />
				) : film?.trailer_path ? (
					<VideoPlayer src={film.trailer_path} preview={film.preview_path!} />
				) : (
					<>1</>
				)} */}
		</div>
	);
}
