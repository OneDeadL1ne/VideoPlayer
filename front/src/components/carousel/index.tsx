import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
//import Preview from '@/assets/Preview.svg?react';

export function FilmsCarousel() {
	return (
		<Carousel
			opts={{ align: 'center', containScroll: 'trimSnaps', loop: true }}
			className="relative w-full max-w-96  @[500px]:max-w-xl    @[1000px]:max-w-6xl "
		>
			<CarouselContent className="-ml-1">
				{Array.from({ length: 7 }).map((_, index) => (
					<CarouselItem key={index} className="w-[300px] md:basis-1/2 lg:basis-1/2">
						<div className="p-1 ">
							<Card className=" ">
								<CardContent className="flex aspect-square items-center justify-center"></CardContent>
							</Card>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<div className="hidden @[1000px]:inline-flex">
				<div className="flex justify-center items-center ">
					<div className="absolute @ top-[50%]">
						<CarouselPrevious className="h-10 w-10 bg-[#A8ABAF]  outline-[#A8ABAF] hover:bg-[#BCBCBC]" />

						<CarouselNext className="h-10 w-10 bg-[#A8ABAF]  outline-[#A8ABAF] hover:bg-[#BCBCBC]" />
					</div>
				</div>
			</div>
		</Carousel>
	);
}
