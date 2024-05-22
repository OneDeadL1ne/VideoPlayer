import { FilmActorInterface } from './actor';
import { DirectorInterface } from './director';
import { GenreInterface } from './genre';
import { VoiceInterface } from './voice';

export interface FilmInterface {
	id_film?: number;
	film_title: string;
	film_length_seconds: number;
	description: string;
	rating: number;
	subtitles: boolean;
	release_year: number;
	release_year_russia: number;
	is_subscribe: boolean;
	is_deleted: boolean;
	is_processed: number;
	id_age_limit: number;
	age_limit?: AgeLimitInterface;
	trailer_path?: string | null;
	film_path?: string | null;
	preview_path?: string | null;
	actor_ids: number[];

	director_ids: number[];

	voiceover_ids: number[];

	genre_ids: number[];
	actors: FilmActorInterface[];
	genres: GenreInterface[];
	directors: DirectorInterface[];
	voiceovers: VoiceInterface[];
}

export interface CreateFilm {
	id_film?: number;
	film_title: string;

	film_length_seconds: number;

	description: string;

	rating?: number;

	subtitles: boolean;

	release_year?: number;

	release_year_russia?: number;

	is_subscribe: boolean;

	is_deleted: boolean;

	id_age_limit: number;
}

export interface AgeLimitInterface {
	id_age_limit: number;
	age_limit_name: string;
}
