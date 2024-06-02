import { useEffect, useRef, useState } from 'react';
import { CarouselItem } from '../ui/carousel';
import { FilmInterface } from '@/types/film';

import { VideoPlayer } from '../Video';
import { Card, CardContent } from '../ui/card';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Play } from 'lucide-react';
import { LoadingSpinner } from '../spinner/spinner';
import { GenreInterface } from '@/types/genre';

export default function CustomCard({
	index,
	film,
	genre,
	type,
}: {
	type: 'genres' | 'films';
	index: number;
	film?: FilmInterface;
	genre?: GenreInterface;
}) {
	const { theme } = useAppSelector((s) => s.theme);

	const navigate = useNavigate();

	const [isHovered, setIsHovered] = useState(false);
	const [hoveredForFiveSeconds, setHoveredForFiveSeconds] = useState(false);
	const timerRef = useRef<number | null>(null);

	useEffect(() => {
		if (isHovered) {
			timerRef.current = window.setTimeout(() => {
				setHoveredForFiveSeconds(true);
			}, 2000);
		} else {
			if (timerRef.current !== null) {
				clearTimeout(timerRef.current);
			}
			setHoveredForFiveSeconds(false);
		}

		return () => {
			if (timerRef.current !== null) {
				clearTimeout(timerRef.current);
			}
		};
	}, [isHovered]);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	if (genre && type == 'genres') {
		return (
			<CarouselItem key={index} className=" basis-1/2  md:basis-1/3 lg:basis-1/4 ">
				<Card
					onClick={() => {
						navigate(`/genre/${genre.id_genre}`);
					}}
					className="bg-secondary cursor-pointer  border-0  h-[100px] flex justify-center items-center	"
				>
					<CardContent className={'  rounded-lg p-0'}>
						<p className="text-accent-foreground text-xl @[450px]:text-2xl text-center ">
							{genre.genre_name}
						</p>
					</CardContent>
				</Card>
			</CarouselItem>
		);
	}
	if (film && type == 'films')
		return (
			<CarouselItem
				key={index}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onMouseOver={handleMouseEnter}
				onMouseOut={handleMouseLeave}
				onFocus={handleMouseEnter}
				onBlur={handleMouseLeave}
				onTouchStart={handleMouseEnter}
				onTouchEnd={handleMouseLeave}
				className="relative h-full w-full bg-transparent   lg:basis-full "
			>
				<Card className="relative  bg-transparent border-0  	">
					{film.trailer_path && (
						<div className="h-1/6">
							<VideoPlayer
								src={film.trailer_path}
								preview={film.preview_path!}
								play={hoveredForFiveSeconds}
							/>
						</div>
					)}

					<CardContent
						className={
							theme == 'dark'
								? `absolute  top-0 h-full w-full rounded-lg`
								: `absolute  top-0 h-full w-full rounded-lg`
						}
					>
						{/* <div className="flex gap-3">
							<p className="text-xl @[400px]:text-4xl">{film.film_title}</p>
							<p className="">{film.release_year}</p>
						</div>

						<p className="text-[12px] mt-2">
							{film.genres.map((genre) => `${genre.genre_name} `)}
						</p> */}
						<div className="absolute inset-0 flex items-center justify-center">
							{!hoveredForFiveSeconds && (
								<div className=" flex  w-full items-center justify-center  ">
									<div className="text-primary">
										{isHovered ? (
											<LoadingSpinner />
										) : (
											<Play
												className="h-10 w-10"
												fill="#ff6b00"
												strokeWidth={3.5}
											/>
										)}
									</div>
								</div>
							)}
						</div>

						{hoveredForFiveSeconds && (
							<div className="absolute bottom-0 right-3 pb-5  @[400px]:pb-5">
								<Button
									onClick={() => {
										navigate(`/film/${film.id_film}`);
									}}
									size="sm"
									className="text-white"
								>
									Подробонее...
								</Button>
							</div>
						)}
					</CardContent>
				</Card>
			</CarouselItem>
		);
}
