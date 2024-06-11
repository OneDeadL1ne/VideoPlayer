import { useEffect, useRef, useState } from 'react';
import { CarouselItem } from '../ui/carousel';
import { FilmInterface } from '@/types/film';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/audio.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

import { MediaPlayer, MediaPlayerInstance, MediaProvider, Poster } from '@vidstack/react';

import { Card, CardContent } from '../ui/card';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Play } from 'lucide-react';
import { LoadingSpinner } from '../spinner/spinner';
import { GenreInterface } from '@/types/genre';
import { motion } from 'framer-motion';
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
	const player = useRef<MediaPlayerInstance>(null);
	const navigate = useNavigate();

	const [isHovered, setIsHovered] = useState(false);
	const [play, setPlay] = useState(false);
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

	useEffect(() => {
		let time;
		if (hoveredForFiveSeconds) {
			player.current?.provider?.play();
			time = setTimeout(() => {}, 2000);
		}
		if (!hoveredForFiveSeconds) {
			player.current?.provider?.pause();
			player.current?.provider?.setCurrentTime(0);
			return clearTimeout(time);
		}
	}, [hoveredForFiveSeconds]);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		player.current?.provider?.pause();
		//player.current?.provider?.setup();

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
				//onMouseEnter={handleMouseEnter}
				//onMouseLeave={handleMouseLeave}
				//onMouseOver={handleMouseEnter}
				//onMouseOut={handleMouseLeave}
				//onFocus={handleMouseEnter}
				//onBlur={handleMouseLeave}
				//onTouchStart={handleMouseEnter}
				//onTouchEnd={handleMouseLeave}
				onClick={() => {
					setPlay((prev) => !prev);
					if (!play) {
						player.current?.provider?.play();
					}
					if (play) {
						player.current?.provider?.setup();
					}
				}}
				className="relative h-full w-full bg-transparent     lg:basis-full "
			>
				<Card className="relative  bg-transparent border-0 ">
					<div className="	">
						{/* {!play && ( */}
						<img
							src={film.preview_path!}
							alt={'1'}
							className={`w-full  {}  @[500px]:h-full object-cover rounded-lg duration-700 
								`}
						/>
						{/* )} */}
						{/* {hoveredForFiveSeconds && ( */}
						<div>
							<MediaPlayer
								//className={`  rounded-lg  ${!hoveredForFiveSeconds ? ' ' : ''}`}
								viewType="video"
								preferNativeHLS={true}
								streamType="on-demand"
								logLevel="silent"
								crossOrigin
								playsInline
								ref={player}
								src={film.trailer_path!}
								volume={hoveredForFiveSeconds ? 0.3 : 0.0}
							>
								<MediaProvider>
									{/* {film.preview_path && (
										<Poster
											className="absolute inset-0 block h-full w-full  rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
											src={film.preview_path}
											alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
										/>
									)} */}
								</MediaProvider>

								{/* Layouts */}
								{/* <DefaultAudioLayout
								icons={defaultLayoutIcons}
								colorScheme="system"
								smallLayoutWhen={smallAudioLayoutQuery}
							/>
							<DefaultVideoLayout
								icons={defaultLayoutIcons}
								colorScheme="system"
								smallLayoutWhen={smallVideoLayoutQuery}
							/> */}
							</MediaPlayer>
						</div>
						{/* )} */}
					</div>

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
							{!play && (
								<div className=" flex  w-full items-center justify-center  ">
									<button className="text-primary bg-transparent hover:bg-transparent border-0 hover:border-0 hover:outline-none hover:outline-transparent hover:ring-transparent ">
										{isHovered ? (
											<LoadingSpinner className="text-primary" />
										) : (
											<Play
												className="h-10 w-10"
												fill="#ff6b00"
												strokeWidth={3.5}
											/>
										)}
									</button>
								</div>
							)}
						</div>

						{play && (
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
