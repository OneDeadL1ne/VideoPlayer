import { FetchResultInterface } from '@/types/fetch';
import { api } from './';
import { CreateFilm, FilmInterface } from '@/types/film';
import { FilmActorInterface } from '@/types/actor';

const filmApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getFilms: builder.query<Array<FilmInterface>, { id_user?: number }>({
			query: ({ id_user }) => ({
				url: `film/${id_user ? `?id_user=${id_user}` : ''}`,
				method: 'GET',
			}),
			providesTags: ['Film'],
		}),

		getFilm: builder.query<FetchResultInterface<FilmInterface>, number>({
			query: (id: number) => ({ url: `film/${id}`, method: 'GET' }),
			providesTags: ['Film'],
		}),
		getActorFilm: builder.query<FetchResultInterface<FilmActorInterface[]>, number>({
			query: (id: number) => ({ url: `film/${id}/actors`, method: 'GET' }),
			providesTags: ['Film'],
		}),

		createFilm: builder.mutation<FetchResultInterface<FilmInterface>, Partial<FilmInterface>>({
			query: (body) => ({
				url: 'film',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Film'],
		}),

		updateFilm: builder.mutation<FetchResultInterface<FilmInterface>, Partial<CreateFilm>>({
			query: (body) => ({
				url: `film`,
				method: 'PATCH',
				body,
			}),
			invalidatesTags: ['Film'],
		}),
		uploadFilm: builder.mutation<
			FetchResultInterface,
			{ id_film: number; type: 'trailer' | 'film' | 'preview'; formData: FormData }
		>({
			query: ({ id_film, type, formData }) => ({
				url: `film/upload?id_film=${id_film}&type=${type}`,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['Film'],
		}),

		deleteFilm: builder.mutation<FetchResultInterface, number>({
			query: (id) => ({
				url: `film/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Film'],
		}),
		// deleteAvatarDirector: builder.mutation<FetchResultInterface, number>({
		// 	query: (id) => ({
		// 		url: `director/image?id_director=${id}`,
		// 		method: 'PATCH',
		// 	}),
		// 	invalidatesTags: ['Director'],
		// }),
	}),
	overrideExisting: true,
});

export const {
	useCreateFilmMutation,
	useDeleteFilmMutation,
	useGetFilmQuery,
	useGetFilmsQuery,
	useUpdateFilmMutation,
	useUploadFilmMutation,
	useGetActorFilmQuery,
} = filmApi;
