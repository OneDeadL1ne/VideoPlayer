import { CustomCarousel } from '@/components/carousel';

import { useAppSelector } from '@/hooks/reduxHooks';
import { useGetFilmsQuery } from '@/redux/api/film';
import { useGetGenresQuery } from '@/redux/api/genre';

export default function HomePage() {
	const { user } = useAppSelector((s) => s.auth);

	const { data: genres, isLoading: Loading, error: isError } = useGetGenresQuery();
	const { data } = useGetFilmsQuery({ id_user: user?.id_user });
	const films = data?.filter((x) => x.preview_path != null && x.trailer_path?.length != null);
	document.title = 'Ностальгия';

	return (
		<div className="grid grid-flow-row  ">
			<div className="flex justify-center  items-center @container">
				<div className="">
					{films?.length != 0 && (
						<CustomCarousel data={films!} type="films" loop={true} />
					)}
				</div>
			</div>
			<div className="flex justify-start  items-center @container">
				{/* <CustomCarousel data={items} type="default" title="Новинки" /> */}
			</div>
			<div className="flex justify-start  items-center @container ">
				{!isError && (
					<>
						{!Loading && (
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
