import CustomCard from '@/components/custom-card/CustomCard';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useGetFilmsQuery } from '@/redux/api/film';

export default function FilmsPage() {
	const { user } = useAppSelector((s) => s.auth);
	const { data } = useGetFilmsQuery({ id_user: 5 });

	return (
		<div className="flex gap-10">
			{data?.map((film, index) => {
				if (user == null && film.is_subscribe) {
					return <>фильм доступен только по подписке {film.film_title}</>;
				}
				if (!user?.is_subscription && film.is_subscribe) {
					return <>фильм доступен только по подписке {film.film_title}</>;
				}
				return (
					<CustomCard
						videoId={film.id_film?.toString()}
						current={0}
						index={index}
						film={film}
						type="films"
						key={film.id_film}
					/>
				);
			})}
		</div>
	);
}
