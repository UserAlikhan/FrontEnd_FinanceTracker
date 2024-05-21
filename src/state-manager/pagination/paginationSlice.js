import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    newsPagination: 1,
    cryptoPagination: 1
}

const paginationSlice = createSlice({
    name: 'pagination',
    initialState: initialState,
    reducers: {
        setPagination: (state, action) => {
            state.newsPagination = action.payload.newsPagination
                ? action.payload.newsPagination
                : state.newsPagination
            state.cryptoPagination = action.payload.cryptoPagination 
                ? action.payload.cryptoPagination 
                : state.cryptoPagination
        }
    }
})

export const { setPagination } = paginationSlice.actions
export default paginationSlice.reducer