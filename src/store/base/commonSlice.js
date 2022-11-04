import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    currentRouteKey: '',
}

export const commonSlice = createSlice({
	name: 'base/common',
	initialState,
	reducers: {
        setCurrentRouteKey: (state, action) => {
            state.currentRouteKey = action.payload
        }
	},
})

export const { setCurrentRouteKey } = commonSlice.actions

export default commonSlice.reducer