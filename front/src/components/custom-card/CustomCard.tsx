import React, { useEffect, useState } from 'react';
import { CarouselItem } from '../ui/carousel';
import { FilmInterface } from '@/types/film';

import { VideoPlayer } from '../Video';
import { Card, CardContent } from '../ui/card';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getCurrentColor } from '@/utils/helpers';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

export default function CustomCard({ index, film }: { index: number; film: FilmInterface }) {
	const [visible, setVisible] = useState(false);

	const { theme } = useAppSelector((s) => s.theme);
	//const [color, setColor] = useState(theme);
	// useEffect(() => {
	// 	setColor(getCurrentColor());
	// }, [theme]);

	const navigate = useNavigate();

	return (
		<CarouselItem
			key={index}
			onMouseEnter={() => setTimeout(() => setVisible(true), 500)}
			onMouseLeave={() => setVisible(false)}
			//onClick={() => navigate(`/film/${film.id_film}`)}
			className="relative h-full bg-transparent  md:basis-1/2 lg:basis-full "
		>
			<Card className="relative bg-transparent border-0	">
				{/* <img
					src={film.preview_path!}
					alt={film.film_title}
					className={`h-full object-cover rounded-lg duration-200 ${
						!visible ? 'opacity-100' : 'hidden'
					} `}
				/> */}

				{film.trailer_path && (
					<div>
						<VideoPlayer
							src={film.trailer_path}
							preview={film.preview_path!}
							play={visible}
						/>
					</div>
				)}

				<CardContent
					className={
						theme == 'dark'
							? `absolute  opacity-0 hover:opacity-100 duration-500 border-solid  bg-gradient-to-r from-black/90 from-5% to-transparent top-0 h-full w-full rounded-lg`
							: `absolute  opacity-0 hover:opacity-100 duration-500 border-solid  bg-gradient-to-r from-white/90 from-5% to-transparent top-0 h-full w-full rounded-lg`
					}
				>
					<div className="text-accent-foreground  pt-10 p-5">
						<p className="font-semibold text-4xl">{film.film_title}</p>
						<div className="flex gap-3 mt-2">
							<p className="">{film.release_year}</p>
							<p className="">{film.genres.map((genre) => `${genre.genre_name} `)}</p>
						</div>

						<div>
							<Button
								onClick={() => {
									navigate(`/film/${film.id_film}`);
								}}
								className="text-white"
							>
								Смотреть
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</CarouselItem>
	);
}
