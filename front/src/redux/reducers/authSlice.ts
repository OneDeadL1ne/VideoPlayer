import { createSlice } from '@reduxjs/toolkit'
import { AuthInterface } from '@/types/auth'
import { jwtDecode } from 'jwt-decode'
import { removeCookie, removeCookieValue } from '@/utils/helpers'

const initialState: AuthInterface = {
    isLogin: false,
    user: null,
}



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (_, action) => {
            
            removeCookieValue("accessToken")
            document.cookie = `accessToken=${action.payload}; Max-Age=43200`
        },
        setRefreshToken: (_, action) => {
            document.cookie = `refreshToken=${action.payload}`
        },
        setUser:(_,action)=>{
            
            _.isLogin=true
            const user:{id:number} = jwtDecode(action.payload)
            
            _.user=user.id
            
        },
        setLogout:(_)=>{
            _.isLogin=false
            removeCookie()
            
            _.user=null
        }
        
    },
})

export const { setAccessToken, setRefreshToken,setUser,setLogout } = authSlice.actions
export default authSlice.reducer
