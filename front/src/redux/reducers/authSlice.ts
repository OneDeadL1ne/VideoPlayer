import { AuthInterface } from '@/types/auth'
import { createSlice } from '@reduxjs/toolkit'


const initialState: AuthInterface = {
    isLogin: false,
    user: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (_, action) => {
            document.cookie = `accessToken=${action.payload}; Max-Age=43200; Path=/`
        },
        setRefreshToken: (_, action) => {
            document.cookie = `refreshToken=${action.payload}; Path=/`
        },
    },
})

export const { setAccessToken, setRefreshToken } = authSlice.actions
export default authSlice.reducer
