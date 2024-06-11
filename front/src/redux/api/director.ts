import { FetchResultInterface } from '@/types/fetch';
import { api } from './';
import { DirectorInterface } from '@/types/director';

const directorApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getDirectors: builder.query<Array<DirectorInterface>, void>({
			query: () => ({ url: `director`, method: 'GET' }),
			providesTags: ['Director'],
		}),
		getDirector: builder.mutation<DirectorInterface, number>({
			query: (id: number) => ({ url: `director/${id}`, method: 'GET' }),
			invalidatesTags: ['Director'],
		}),
		createDirector: builder.mutation<
			FetchResultInterface<DirectorInterface>,
			Partial<DirectorInterface>
		>({
			query: (body) => ({
				url: 'director',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Director'],
		}),

		updateDirector: builder.mutation<DirectorInterface, Partial<DirectorInterface>>({
			query: (body) => ({
				url: `director`,
				method: 'PATCH',
				body,
			}),
			invalidatesTags: ['Director'],
		}),
		imageDirector: builder.mutation<
			FetchResultInterface<DirectorInterface>,
			{ id_director: number; formData: FormData }
		>({
			query: ({ id_director, formData }) => ({
				url: `director/upload?id_director=${id_director}`,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['Director'],
		}),
		deleteAvatarDirector: builder.mutation<FetchResultInterface, number>({
			query: (id) => ({
				url: `director/image?id_director=${id}`,
				method: 'PATCH',
			}),
			invalidatesTags: ['Director'],
		}),
		deleteDirector: builder.mutation<FetchResultInterface, number>({
			query: (id) => ({
				url: `director/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Director'],
		}),
	}),
	overrideExisting: true,
});

export const {
	useCreateDirectorMutation,
	useDeleteAvatarDirectorMutation,
	useDeleteDirectorMutation,
	useGetDirectorMutation,
	useGetDirectorsQuery,
	useImageDirectorMutation,
	useUpdateDirectorMutation,
} = directorApi;
