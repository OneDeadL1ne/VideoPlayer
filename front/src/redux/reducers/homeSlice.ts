import { createSlice } from '@reduxjs/toolkit'

interface IHomePage  {
    tab:"calculator" | "traking" | string
}

const initialState: IHomePage = {
    tab:"calculator"
}



export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setTab: (_, action) => {
            
            _.tab = action.payload
            
        },
        
    },
})

export const { setTab } = homeSlice.actions
export default homeSlice.reducer
