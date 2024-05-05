import { getCurrentColorScheme } from '@/utils/helpers';
import { createSlice } from '@reduxjs/toolkit';

const initialState: { theme: string } = {
	theme: getCurrentColorScheme(),
};

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setTheme: (_, action) => {
			if (action.payload == 'dark') {
				document.getElementsByTagName('body')[0].style.background = '#36393f';
			}

			if (action.payload == 'light') {
				document.getElementsByTagName('body')[0].style.background = '#FFF';
			}
			_.theme = action.payload;
		},
	},
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
