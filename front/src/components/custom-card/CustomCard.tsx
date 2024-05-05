import { NavLink } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { GenreInterface } from '@/types/genre';

export interface CardProps<T> {
	index: number;
	current?: number;
	type?: 'films' | 'genres' | 'default';
	item: T;
}

export function CustomCard<T>({ item, type = 'default' }: CardProps<T>) {
	if (type == 'genres') {
		const genre = item as GenreInterface;

		return (
			<NavLink to={`/genre/${genre.id_genre}`} className="p-1 h-[300px]">
				<Card className=" md:h-full   outline-transparent	border-0 shadow-none">
					<CardContent className="aspect-banner flex items-center justify-center ">
						<p>{genre.genre_name}</p>
					</CardContent>
				</Card>
			</NavLink>
		);
	}

	if (type == 'films') {
		const film = item as GenreInterface;

		return (
			<>
				<NavLink to={`/film/${film.id_genre}`}>
					<Card className=" md:h-full  outline-transparent	border-0 shadow-none">
						<CardContent className="aspect-banner flex items-center justify-center ">
							<p>{film.genre_name}</p>
						</CardContent>
					</Card>
				</NavLink>
			</>
		);
	}

	return <></>;
}
