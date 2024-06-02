import {
	Carousel,
	CarouselContent,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';

import { FilmInterface } from '@/types/film';

import CustomCard from '../custom-card/CustomCard';
import { GenreInterface } from '@/types/genre';

export interface CarouselProps<T> {
	title?: string;
	type?: 'films' | 'genres' | 'default';
	data: Array<T | undefined>;
	disabledButtons?: boolean;
	loop?: boolean;
}

export function CustomCarousel<T>({
	title,
	type = 'default',
	data = [],
	//disabledButtons = false,
	loop = true,
}: CarouselProps<T>) {
	if (type == 'genres') {
		return (
			<div className="w-screen	 mt-10">
				{title && (
					<div className="flex @[450px]:inline-block   justify-start items-center">
						<p className="text-primary text-3xl @[450px]:text-5xl @[450px]:ml-7  font-semibold ">
							{title}
						</p>
					</div>
				)}
				<div className=" lg:max-w-screen-2xl mt-5 pl-5 pr-5">
					<Carousel className="" opts={{ align: 'start', loop: loop }}>
						<CarouselContent className="">
							{data.map((item, index) => {
								const genre = item as GenreInterface;
								return (
									<CustomCard
										index={index}
										genre={genre}
										type="genres"
										key={index}
									/>
								);
							})}
						</CarouselContent>
					</Carousel>
				</div>
			</div>
		);
	}
	return (
		<div className="w-screen">
			{title && (
				<div className="flex @[450px]:inline-block   justify-center items-center">
					<p className="text-primary text-2xl @[450px]:text-5xl @[450px]:ml-7  font-semibold ">
						{title}
					</p>
				</div>
			)}
			<div className="w-full mx-auto flex  justify-center lg:max-w-screen-md mt-5 ">
				<Carousel className="" opts={{ align: 'center', loop: loop }}>
					<CarouselContent className="-ml-2 mr-2 ">
						{data.map((item, index) => {
							const film = item as FilmInterface;
							return (
								<CustomCard index={index} film={film} type="films" key={index} />
							);
						})}
					</CarouselContent>
					<CarouselNext />
					<CarouselPrevious />
				</Carousel>
			</div>
		</div>
	);
}
