import { FetchResultInterface } from '@/types/fetch';
import { api } from './';
import { GenreInterface } from '@/types/genre';

const genreApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getGenres: builder.query<Array<GenreInterface>, void>({
			query: () => ({ url: `genre`, method: 'GET' }),
			providesTags: ['Genre'],
		}),
		getGenre: builder.mutation<GenreInterface, number>({
			query: (id: number) => ({ url: `genre/${id}`, method: 'GET' }),
			invalidatesTags: ['Genre'],
		}),
		createGenre: builder.mutation<
			FetchResultInterface<GenreInterface>,
			Partial<GenreInterface>
		>({
			query: (body) => ({
				url: 'genre',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Genre'],
		}),

		updateGenre: builder.mutation<GenreInterface, Partial<GenreInterface>>({
			query: (body) => ({
				url: `genre`,
				method: 'PATCH',
				body,
			}),
			invalidatesTags: ['Genre'],
		}),
		delereGenre: builder.mutation<FetchResultInterface, number>({
			query: (id) => ({
				url: `genre/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Genre'],
		}),
	}),
	overrideExisting: true,
});

export const {
	useDelereGenreMutation,
	useCreateGenreMutation,
	useGetGenreMutation,
	useGetGenresQuery,
	useUpdateGenreMutation,
} = genreApi;
