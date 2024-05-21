import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    choosenAsset: 'BTC'
}

const choosenAssetSlice = createSlice({
    name: 'choosenAsset',
    initialState: initialState,
    reducers: {
        selectAsset: (state, action) => {
            state.choosenAsset = action.payload
        }
    }
})

export const { selectAsset } = choosenAssetSlice.actions
export default choosenAssetSlice.reducer