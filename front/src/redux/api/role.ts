import { FetchResultInterface } from '@/types/fetch';
import { api } from './';
import { RoleInterface } from '@/types/role';

const roleApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getRoles: builder.query<Array<RoleInterface>, void>({
			query: () => ({ url: `role`, method: 'GET' }),
			providesTags: ['Role'],
		}),
		getRole: builder.mutation<RoleInterface, number>({
			query: (id: number) => ({ url: `role/${id}`, method: 'GET' }),
			invalidatesTags: ['Role'],
		}),
		createRole: builder.mutation<FetchResultInterface<RoleInterface>, RoleInterface>({
			query: (body) => ({
				url: 'role',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Role'],
		}),

		updateRole: builder.mutation<RoleInterface, Partial<RoleInterface>>({
			query: (body) => ({
				url: `role`,
				method: 'PATCH',
				body,
			}),
			invalidatesTags: ['Role'],
		}),
		delereRole: builder.mutation<FetchResultInterface, number>({
			query: (id) => ({
				url: `role/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Role'],
		}),
	}),
	overrideExisting: true,
});

export const {
	useCreateRoleMutation,
	useDelereRoleMutation,
	useGetRoleMutation,
	useGetRolesQuery,
	useUpdateRoleMutation,
} = roleApi;
