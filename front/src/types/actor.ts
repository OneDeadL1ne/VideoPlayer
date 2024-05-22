export interface ActorInterface {
	id_actor: number;
	last_name: string;
	first_name: string;
	patronymic?: string;
	photo_url?: string | null;
	avatar_url?: string | null;
}

export interface FilmActorInterface extends ActorInterface {
	ActorFilm: ActorFilm;
}

export interface ActorFilm {
	position_role: number;
}
