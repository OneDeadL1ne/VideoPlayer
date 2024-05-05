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
		createUser: builder.mutation<FetchResultInterface<UserInterface>, UserInterface>({
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
				url: 'user/change_status',
				method: 'PATCH',
				body,
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
} = usersApi;
