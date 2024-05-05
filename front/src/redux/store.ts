import { configureStore } from '@reduxjs/toolkit';

import { api } from './api';
import authReducer from './reducers/authSlice';
import themeSlice from './reducers/themeSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		theme: themeSlice,
		[api.reducerPath]: api.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

//setupListeners(store.dispatch)
