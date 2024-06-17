import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';

import { FilmInterface } from '@/types/film';

import CustomCard from '../custom-card/CustomCard';
import { GenreInterface } from '@/types/genre';
import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface CarouselProps<T> {
	title?: string;
	type?: 'films' | 'genres' | 'default';
	data: Array<T | undefined>;
	disabledButtons?: boolean;
	loop?: boolean;
	path?: string;
}

export function CustomCarousel<T>({
	title,
	type = 'default',
	data = [],
	//disabledButtons = false,
	loop = true,
	path,
}: CarouselProps<T>) {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);

	const navigate = useNavigate();

	useEffect(() => {
		if (!api) {
			return;
		}

		setCurrent(api.selectedScrollSnap() + 1);

		api.on('select', () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	if (type == 'genres') {
		return (
			<div className="w-screen	 mt-10">
				{title && (
					<div className="flex @[450px]:inline-block   justify-center items-center ">
						<p className="text-primary text-4xl @[450px]:text-5xl @[450px]:ml-7  font-semibold ">
							{title}
						</p>
					</div>
				)}
				<div className=" lg:max-w-screen-2xl mt-5 pl-5 pr-5">
					<Carousel className="" opts={{ align: 'start', loop: loop }} setApi={setApi}>
						<CarouselContent className="">
							{data.map((item) => {
								const genre = item as GenreInterface;
								return (
									<CarouselItem
										key={genre.id_genre}
										className=" basis-1/2  md:basis-1/3 lg:basis-4/12 "
									>
										<CustomCard
											current={current}
											index={genre.id_genre}
											genre={genre}
											type="genres"
											key={genre.id_genre}
										/>
									</CarouselItem>
								);
							})}
						</CarouselContent>
					</Carousel>
				</div>
			</div>
		);
	}
	if (type == 'films') {
		return (
			<div className="w-screen">
				<div className="w-full mx-auto flex  justify-center lg:max-w-screen-md mt-5 ">
					<Carousel className="" opts={{ align: 'center', loop: loop }} setApi={setApi}>
						<CarouselContent className="-ml-2 mr-2 ">
							{data.map((item, index) => {
								const film = item as FilmInterface;

								return (
									<CarouselItem
										key={film.id_film}
										className="relative h-full w-full bg-transparent    hover:cursor-pointer lg:basis-full "
									>
										<CustomCard
											current={current}
											index={index}
											videoId={index.toString()}
											film={film}
											type="films"
											key={film.id_film}
										/>
									</CarouselItem>
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
	return (
		<div className="w-screen">
			{title && (
				<div
					className="flex @[450px]:inline-block justify-center items-center hover:cursor-pointer group underline decoration-[#ff6b00]/50 hover:decoration-[#ff6b00]"
					onClick={() => {
						if (path) {
							navigate('/films');
						}
					}}
				>
					<div className="flex">
						<p className="flex flex-row text-primary items-center text-4xl @[450px]:text-5xl @[450px]:ml-7  font-semibold ">
							{title}
						</p>
						<ChevronRight className="hidden  group-hover:opacity-100  opacity-0 duration-100 text-primary size-14  @[450px]:inline-block" />
					</div>
				</div>
			)}
			<div className="w-full mx-auto flex  justify-center lg:max-w-max mt-5 ">
				<Carousel className="" opts={{ align: 'center', loop: loop }} setApi={setApi}>
					<CarouselContent className="-ml-2 mr-2 ">
						{data.map((item, index) => {
							const film = item as FilmInterface;

							return (
								<CarouselItem
									key={film.id_film}
									className=" basis-[100%]  md:basis-1/2 lg:basis-1/3 "
								>
									<CustomCard
										videoId={film.id_film?.toString()}
										current={current}
										index={index}
										film={film}
										type="films"
										key={film.id_film}
									/>
								</CarouselItem>
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
