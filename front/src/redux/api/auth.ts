import { api } from '.'
import {
    AuthPayloadInterface,
    RefreshPayloadInterface,
    TokenInterface,
} from '@/types/auth'

const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        auth: builder.mutation<TokenInterface, AuthPayloadInterface>({
            query: (body) => ({
                url: 'users/signin',
                method: 'POST',
                body,
            }),
        }),
        refreshToken: builder.mutation<string, RefreshPayloadInterface>({
            query: (body) => ({
                url: 'auth/refreshToken',
                method: 'POST',
                body,
                responseHandler: (response) => response.text(),
            }),
        }),
        
    }),
})

export const { useAuthMutation, useRefreshTokenMutation } =
    authApi
