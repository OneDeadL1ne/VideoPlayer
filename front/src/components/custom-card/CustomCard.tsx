import { useEffect, useRef, useState } from 'react';
import { CarouselItem } from '../ui/carousel';
import { FilmInterface } from '@/types/film';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/audio.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

import { MediaPlayer, MediaPlayerInstance, MediaProvider } from '@vidstack/react';

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
	current,
	genre,
	type,
}: {
	type: 'genres' | 'films';
	index: number;
	current: number;
	film?: FilmInterface;
	genre?: GenreInterface;
}) {
	const { theme } = useAppSelector((s) => s.theme);
	const player = useRef<MediaPlayerInstance>(null);
	const navigate = useNavigate();

	const [play, setPlay] = useState(false);

	const variants = {
		open: { opacity: 1 },
		closed: { opacity: 0 },
	};

	//console.log(index);
	useEffect(() => {
		if (play) {
			setPlay(!play);
			player.current?.provider?.pause();
			player.current?.provider?.setCurrentTime(0);
		}
	}, [current]);

	useEffect(() => {
		let time;
		if (play) {
			player.current?.provider?.play();
		}
		if (!play) {
			player.current?.provider?.pause();
			player.current?.provider?.setCurrentTime(0);
			return clearTimeout(time);
		}
	}, [play]);

	// const handleMouseEnter = () => {
	// 	setPlay(true);
	// };

	// const handleMouseLeave = () => {
	// 	setPlay(false);
	// };

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
				// onMouseEnter={() => {
				// 	setPlay((prev) => !prev);
				// }}
				// onMouseLeave={() => {
				// 	setPlay((prev) => !prev);
				// }}
				onClick={() => {
					setPlay((prev) => !prev);
				}}
				className="relative h-full w-full bg-transparent    hover:cursor-pointer lg:basis-full "
			>
				<Card className="relative h-full bg-transparent border-0 ">
					<div className="absolute h-full z-50	">
						<motion.div
							className="h-full"
							animate={!play ? 'open' : 'closed'}
							variants={variants}
						>
							<img
								src={film.preview_path!}
								alt={'1'}
								className={`w-full   @[500px]:h-full object-cover rounded-lg duration-700 
								`}
							/>
						</motion.div>
					</div>

					<div className={`h-1/6 `}>
						<MediaPlayer
							className={`rounded-lg `}
							viewType="video"
							preferNativeHLS={true}
							streamType="on-demand"
							logLevel="silent"
							crossOrigin
							playsInline
							ref={player}
							src={film.trailer_path!}
							volume={play ? 0.3 : 0.0}
						>
							<MediaProvider />
						</MediaPlayer>
					</div>

					<CardContent
						className={
							theme == 'dark'
								? `absolute  top-0 h-full w-full rounded-lg`
								: `absolute  top-0 h-full w-full rounded-lg`
						}
					>
						<div className="absolute inset-0 z-50 flex items-center justify-center">
							{!play && (
								<div className=" flex  w-full items-center justify-center  ">
									<button className="text-primary bg-transparent hover:bg-transparent border-0 hover:border-0 hover:outline-none hover:outline-transparent hover:ring-transparent ">
										{play ? (
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
							<div className="absolute bottom-0 right-3 pb-5 z-50  @[400px]:pb-5">
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
