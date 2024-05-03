import { CustomCarousel } from '@/components/carousel';

export default function HomePage() {
	const items = [
		{ name: 'Боевик' },
		{ name: 'Боевик' },
		{ name: 'Боевик' },
		{ name: 'Боевик' },
		{ name: 'Боевик' },
		{ name: 'Боевик' },
	];
	return (
		<div className="grid grid-flow-row  ">
			<div className="flex justify-center  items-center @container">
				<div className="">{/* <CustomCarousel data={items} type="films" /> */}</div>
			</div>
			<div className="flex justify-start  items-center @container">
				<div className="">
					<CustomCarousel data={items} type="default" title="Новинки" />
				</div>
			</div>
			<div className="flex justify-start  items-center @container">
				<div className="">
					<CustomCarousel data={items} type="genres" title="Жанры" />
				</div>
			</div>
		</div>
	);
}
