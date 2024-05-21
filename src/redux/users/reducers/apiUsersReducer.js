import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    users: [],
    error: null
}

const apiUsersSlicer = createSlice({
    name: 'apiUsers',
    initialState: initialState,
    reducers: {
        usersFetching: (state) => {
            state.loading = true
            state.error = null
        },
        usersFetched: (state, action) => {
            state.loading = false
            state.users = action.payload
        },
        usersFetchedWithError: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})
    

export const { usersFetching, usersFetched, usersFetchedWithError } = apiUsersSlicer.actions
export default apiUsersSlicer.reducer