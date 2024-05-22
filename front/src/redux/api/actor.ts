import { FetchResultInterface } from '@/types/fetch';
import { api } from './';

import { ActorInterface } from '@/types/actor';

const actorApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getActors: builder.query<Array<ActorInterface>, void>({
			query: () => ({ url: `actor`, method: 'GET' }),
			providesTags: ['Actor'],
		}),
		getActor: builder.mutation<ActorInterface, number>({
			query: (id: number) => ({ url: `actor/${id}`, method: 'GET' }),
			invalidatesTags: ['Actor'],
		}),
		createActor: builder.mutation<
			FetchResultInterface<ActorInterface>,
			Partial<ActorInterface>
		>({
			query: (body) => ({
				url: 'actor',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Actor'],
		}),

		updateActor: builder.mutation<ActorInterface, Partial<ActorInterface>>({
			query: (body) => ({
				url: `actor`,
				method: 'PATCH',
				body,
			}),
			invalidatesTags: ['Actor'],
		}),
		imageActor: builder.mutation<
			FetchResultInterface<ActorInterface>,
			{ id_actor: number; formData: FormData }
		>({
			query: ({ id_actor, formData }) => ({
				url: `actor/upload?id_actor=${id_actor}`,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['Actor'],
		}),
		deleteActor: builder.mutation<FetchResultInterface, number>({
			query: (id) => ({
				url: `actor/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Actor'],
		}),
		deleteAvatarActor: builder.mutation<FetchResultInterface, number>({
			query: (id) => ({
				url: `actor/image?id_actor=${id}`,
				method: 'PATCH',
			}),
			invalidatesTags: ['Actor'],
		}),
	}),
	overrideExisting: true,
});

export const {
	useCreateActorMutation,
	useGetActorMutation,
	useGetActorsQuery,
	useImageActorMutation,
	useUpdateActorMutation,
	useDeleteActorMutation,
	useDeleteAvatarActorMutation,
} = actorApi;
