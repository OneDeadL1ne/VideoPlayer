import { CityPayload, Cities } from '@/types/city'
import { apiYandex } from '.'
import {
    
} from '@/types/auth'

const cityApi = apiYandex.injectEndpoints({
    endpoints: (builder) => ({
        getCity: builder.mutation<Cities,CityPayload>({
            query: (body) => ({
                url: `suggest?text=Россия ${body.name}&apikey=32289c50-d3de-4b3a-8164-4db04cd3eedd&types=locality&highlight=0&results=${body.result}`,
                method: 'GET',
            }),
        }),
       
        
    }),
})

export const { useGetCityMutation } =
cityApi
