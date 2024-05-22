import { api } from './';
import { AgeLimitInterface } from '@/types/film';

const ageApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getAgeLimits: builder.query<Array<AgeLimitInterface>, void>({
			query: () => ({ url: `agelimit`, method: 'GET' }),
			providesTags: ['AgeLimit'],
		}),
	}),
	overrideExisting: true,
});

export const { useGetAgeLimitsQuery } = ageApi;
