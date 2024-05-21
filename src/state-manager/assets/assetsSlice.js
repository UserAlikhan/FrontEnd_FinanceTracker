import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    assets: [],
    error: null
}

const assetsSlicer = createSlice({
    name: 'assets',
    initialState: initialState,
    reducers: {
        assetsFetching: (state) => {
            state.loading = true
            state.error = null
        },
        assetsFetched: (state, action) => {
            state.loading = false
            state.assets = action.payload
        },
        assetsFetchedWithError: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const { assetsFetching, assetsFetched, assetsFetchedWithError } = assetsSlicer.actions
export default assetsSlicer.reducer