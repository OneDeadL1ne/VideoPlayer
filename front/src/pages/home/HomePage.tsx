import { CustomCarousel } from '@/components/carousel';
import { Skeleton } from '@/components/ui/skeleton';

import { useAppSelector } from '@/hooks/reduxHooks';
import { useGetFilmsQuery } from '@/redux/api/film';
import { useGetGenresQuery } from '@/redux/api/genre';

export default function HomePage() {
	const { user } = useAppSelector((s) => s.auth);

	const { data: genres, isLoading: isGenreLoading, error: isGenreError } = useGetGenresQuery();
	const {
		data,
		isLoading: isFilmLoading,
		error: isFilmError,
	} = useGetFilmsQuery({ id_user: user?.id_user });
	const films = data?.filter((x) => x.preview_path != null && x.trailer_path?.length != null);
	document.title = 'Ностальгия';
	if (isFilmLoading && isGenreLoading) {
		return;
	}
	return (
		<div className="grid grid-flow-row  ">
			<div className="flex justify-center  items-center @container">
				<div className="">
					{!isFilmError && films && (
						<CustomCarousel data={films!} type="films" loop={true} />
					)}
				</div>
			</div>
			<div className="flex justify-start mt-10  items-center @container">
				{!isFilmError && films && (
					<CustomCarousel data={films} type="default" title="Фильмы" path="/films" />
				)}
			</div>
			<div className="flex justify-start  items-center @container ">
				{!isGenreError && (
					<CustomCarousel data={genres!} type="genres" title="Жанры" loop={false} />
				)}
			</div>
		</div>
	);
}
