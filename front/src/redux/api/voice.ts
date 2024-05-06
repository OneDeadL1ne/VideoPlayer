import { FetchResultInterface } from '@/types/fetch';
import { api } from './';
import { RoleInterface } from '@/types/role';
import { VoiceInterface } from '@/types/voice';

const voiceApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getVoices: builder.query<Array<VoiceInterface>, void>({
			query: () => ({ url: `voiceover`, method: 'GET' }),
			providesTags: ['Voice'],
		}),
		getVoice: builder.mutation<RoleInterface, number>({
			query: (id: number) => ({ url: `voiceover/${id}`, method: 'GET' }),
			invalidatesTags: ['Voice'],
		}),
		createVoice: builder.mutation<FetchResultInterface<VoiceInterface>, VoiceInterface>({
			query: (body) => ({
				url: 'voiceover',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Voice'],
		}),

		updateVoice: builder.mutation<VoiceInterface, Partial<VoiceInterface>>({
			query: (body) => ({
				url: `voiceover`,
				method: 'PATCH',
				body,
			}),
			invalidatesTags: ['Voice'],
		}),
		delereVoice: builder.mutation<FetchResultInterface, number>({
			query: (id) => ({
				url: `voiceover/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Voice'],
		}),
	}),
	overrideExisting: true,
});

export const {
	useCreateVoiceMutation,
	useDelereVoiceMutation,
	useGetVoiceMutation,
	useGetVoicesQuery,
	useUpdateVoiceMutation,
} = voiceApi;
