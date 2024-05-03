import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

import { Card, CardContent } from '../ui/card';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export interface CarouselProps<T> {
	title?: string;
	type?: 'films' | 'genres' | 'default';
	data: Array<T>;
	disabledButtons?: boolean;
	loop?: boolean;
}

export function CustomCarousel<T>({
	title,
	type = 'default',
	data = [],
	disabledButtons = false,
	loop = true,
}: CarouselProps<T>) {
	const [activeIndex, setActiveIndex] = useState(0);
	return (
		<div className="w-screen">
			{title && (
				<div className="flex @[450px]:inline-block   justify-center items-center">
					<p className="text-primary text-2xl @[450px]:text-5xl @[450px]:ml-7  font-semibold ">
						{title}
					</p>
				</div>
			)}
			<div className="w-full lg:max-w-screen-2xl mx-auto">
				<Carousel className="relative" opts={{ align: 'start' }}>
					<CarouselContent>
						{Array.from({ length: 7 }).map((_, index) => (
							<CarouselItem key={index} className=" md:basis-1/2 lg:basis-1/2">
								<div className="p-1">
									<NavLink to={`/film/${index}`}>
										<Card className=" md:h-full bg-transparent outline-transparent	border-0 shadow-none">
											<CardContent className="aspect-banner ">
												<img
													src="http://localhost:3000/Preview.svg"
													className={`select-none h-full w-full  pointer-events-none   rounded-xl   object-cover`}
													alt="test"
												/>
											</CardContent>
										</Card>
									</NavLink>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		</div>
	);
}
