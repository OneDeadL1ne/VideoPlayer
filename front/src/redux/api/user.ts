import { FetchResultInterface } from '@/types/fetch';
import { api } from './';

import { UserInterface } from '@/types//user';

const usersApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getMyUser: builder.query<UserInterface, void>({
			query: () => ({ url: `user/my/:id`, method: 'GET' }),
			providesTags: ['User'],
		}),
		getUser: builder.mutation<UserInterface, void>({
			query: () => ({ url: `user/my/:id`, method: 'GET' }),
			invalidatesTags: ['User'],
		}),
		createUser: builder.mutation<FetchResultInterface<UserInterface>, Partial<UserInterface>>({
			query: (body) => ({
				url: 'user',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['User'],
		}),

		updateUser: builder.mutation<UserInterface, Partial<UserInterface>>({
			query: (body) => ({
				url: `user`,
				method: 'PATCH',
				body,
			}),
			invalidatesTags: ['User'],
		}),

		changeUserStatus: builder.mutation<FetchResultInterface, Partial<UserInterface>>({
			query: (body) => ({
				url: 'user/change_subscription',
				method: 'PATCH',
				body,
			}),
			invalidatesTags: ['User', 'Film'],
		}),

		imageUser: builder.mutation<
			FetchResultInterface<UserInterface>,
			{ id_user: number; formData: FormData }
		>({
			query: ({ id_user, formData }) => ({
				url: `user/upload?id_user=${id_user}`,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['User'],
		}),
		deleteAvatarUser: builder.mutation<FetchResultInterface, number>({
			query: (id) => ({
				url: `user/image?id_user=${id}`,
				method: 'PATCH',
			}),
			invalidatesTags: ['User'],
		}),
	}),
	overrideExisting: true,
});

export const {
	useGetMyUserQuery,
	useGetUserMutation,
	useCreateUserMutation,
	useUpdateUserMutation,
	useChangeUserStatusMutation,
	useDeleteAvatarUserMutation,
	useImageUserMutation,
} = usersApi;
