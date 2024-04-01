import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getJWTtokens } from '@/utils/helpers'

export const api = createApi({
    reducerPath: 'api',
    refetchOnReconnect: true,
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API,
        prepareHeaders: async (headers) => {
            const { accessToken} = getJWTtokens()

            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`)
            } else {
                // if (refreshToken) {
                //     const refreshHeaders = new Headers()
                //     refreshHeaders.append('Content-Type', 'application/json')

                //     const requestOptions = {
                //         method: 'POST',
                //         headers: refreshHeaders,
                //         body: JSON.stringify({
                //             refresh_token: refreshToken,
                //         }),
                //     }

                //     const response = await fetch(
                //         `${import.meta.env.VITE_API}/auth/refresh`,
                //         requestOptions
                //     )

                //     if (response.ok) {
                //         const newAccessToken = await response.text()
                //         document.cookie = `accessToken=${newAccessToken}; Max-Age=43200`
                //         headers.set('Authorization', `Bearer ${newAccessToken}`)
                //     }
                // }
            }

            return headers
        },
    }),
    tagTypes: [
        
    ],
    endpoints: () => ({}),
})

export const apiYandex = createApi({
    reducerPath: 'apiYandex',
    
    refetchOnReconnect: true,
    
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://suggest-maps.yandex.ru/v1',
        mode: "cors", 
        prepareHeaders: async (headers) => {
            
    
            
            //headers.set('Access-Control-Allow-Origin', '*')
            
            return headers
        },
        
    }),
    tagTypes: [
        
    ],
    endpoints: () => ({}),
})