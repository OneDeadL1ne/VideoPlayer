import { CustomCarousel } from '@/components/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetGenresQuery } from '@/redux/api/genre';

export default function HomePage() {
	const items = [
		{ name: 'Боевик' },
		{ name: 'Боевик' },
		{ name: 'Боевик' },
		{ name: 'Боевик' },
		{ name: 'Боевик' },
		{ name: 'Боевик' },
	];

	const { data: genres, isLoading: Loading, error: isError } = useGetGenresQuery();

	return (
		<div className="grid grid-flow-row  ">
			<div className="flex justify-center  items-center @container">
				<div className="">{/* <CustomCarousel data={items} type="films" /> */}</div>
			</div>
			<div className="flex justify-start  items-center @container">
				<CustomCarousel data={items} type="default" title="Новинки" />
			</div>
			<div className="flex justify-start  items-center @container ">
				{!isError && (
					<>
						{Loading ? (
							<Skeleton />
						) : (
							<CustomCarousel
								data={genres!}
								type="genres"
								title="Жанры"
								loop={false}
							/>
						)}
					</>
				)}
			</div>
		</div>
	);
}
