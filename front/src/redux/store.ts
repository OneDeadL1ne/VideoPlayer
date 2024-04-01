import { configureStore } from '@reduxjs/toolkit'

import { api, apiYandex } from './api'
import authReducer from './reducers/authSlice'
import homeReducer from './reducers/homeSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        home: homeReducer,
        [api.reducerPath]: api.reducer,
        [apiYandex.reducerPath]: apiYandex.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware).concat(apiYandex.middleware),
        
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

//setupListeners(store.dispatch)
