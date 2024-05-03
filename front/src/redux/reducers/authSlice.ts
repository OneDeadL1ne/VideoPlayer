import { AuthInterface } from '@/types/auth';
import { createSlice } from '@reduxjs/toolkit';

const initialState: AuthInterface = {
	isLogin: false,
	user: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAccessToken: (_, action) => {
			_.isLogin = true;
			document.cookie = `accessToken=${action.payload}; Max-Age=43200; Path=/`;
		},
		setRefreshToken: (_, action) => {
			document.cookie = `refreshToken=${action.payload}; Path=/`;
		},
		setLogout: (_) => {
			_.isLogin = false;
			_.user = null;
		},
		setUser: (_, action) => {
			_.isLogin = true;
			_.user = action.payload;
		},
	},
});

export const { setAccessToken, setRefreshToken, setLogout, setUser } = authSlice.actions;
export default authSlice.reducer;
