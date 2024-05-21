import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    usersInfo: null,
    error: null,
}

const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        usersSlicer: (state, action) => {
            state.loading = false
            state.error = null
            state.usersInfo = action.payload
        },
        logOutSlicer: (state) => {
            state.loading = false
            state.error = null
            state.usersInfo = null
        }
    }
})

export const { usersSlicer, logOutSlicer } = usersSlice.actions
export default usersSlice.reducer