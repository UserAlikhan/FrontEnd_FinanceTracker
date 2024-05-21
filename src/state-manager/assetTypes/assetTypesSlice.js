import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    assetTypes: [],
    error: null
}

const assetTypesSlice = createSlice({
    name: 'assetTypes',
    initialState: initialState,
    reducers: {
        assetTypesFetching: (state) => {
            state.loading = true
            state.error = null
        },
        assetTypesFetched: (state, action) => {
            state.loading = false
            state.assetTypes = action.payload
        },
        assetTypesFetchedWithError: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const { assetTypesFetching, assetTypesFetched, assetTypesFetchedWithError } = assetTypesSlice.actions
export default assetTypesSlice.reducer