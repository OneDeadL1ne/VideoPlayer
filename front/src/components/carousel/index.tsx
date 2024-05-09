import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';

import { CustomCard } from '../custom-card/CustomCard';

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
	//const [activeIndex, setActiveIndex] = useState(0);
	return (
		<div className="w-screen">
			{title && (
				<div className="flex @[450px]:inline-block   justify-center items-center">
					<p className="text-primary text-2xl @[450px]:text-5xl @[450px]:ml-7  font-semibold ">
						{title}
					</p>
				</div>
			)}
			<div className="w-full lg:max-w-screen-xl mx-auto">
				<Carousel className="relative" opts={{ align: 'start', loop: loop }}>
					<CarouselContent>
						{data.map((item, index) => (
							<CarouselItem key={index} className=" md:basis-1/2 lg:basis-1/2">
								<CustomCard index={index} item={item} type="genres" />
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselNext />
					<CarouselPrevious />
				</Carousel>
			</div>
		</div>
	);
}
