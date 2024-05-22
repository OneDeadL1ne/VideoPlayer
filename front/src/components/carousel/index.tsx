import {
	Carousel,
	CarouselContent,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';

import { FilmInterface } from '@/types/film';

import CustomCard from '../custom-card/CustomCard';

export interface CarouselProps<T> {
	title?: string;
	type?: 'films' | 'genres' | 'default';
	data: Array<T | undefined>;
	disabledButtons?: boolean;
	loop?: boolean;
}

export function CustomCarousel<T>({
	title,
	//type = 'default',
	data = [],
	//disabledButtons = false,
	loop = true,
}: CarouselProps<T>) {
	return (
		<div className="w-screen">
			{title && (
				<div className="flex @[450px]:inline-block   justify-center items-center">
					<p className="text-primary text-2xl @[450px]:text-5xl @[450px]:ml-7  font-semibold ">
						{title}
					</p>
				</div>
			)}
			<div className="w-full mx-auto flex justify-center lg:max-w-screen-md mt-5 ">
				<Carousel className="" opts={{ align: 'center', loop: loop }}>
					<CarouselContent className="-ml-1 ">
						{data.map((item, index) => {
							const film = item as FilmInterface;
							return <CustomCard index={index} film={film} key={index} />;
						})}
					</CarouselContent>
					<CarouselNext />
					<CarouselPrevious />
				</Carousel>
			</div>
		</div>
	);
}
