import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    choosenColor: '#000000'
}

const choosenColorSlice = createSlice({
    name: 'choosenColor',
    initialState: initialState,
    reducers: {
        selectColor: (state, action) => {
            state.choosenColor = action.payload
        }
    }
})

export const { selectColor } = choosenColorSlice.actions
export default choosenColorSlice.reducer