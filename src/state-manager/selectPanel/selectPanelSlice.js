import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    expanded: true
}

const selectPanelSlice = createSlice({
    name: 'selectPanel',
    initialState: initialState,
    reducers: {
        expandSelectPanel: (state) => {
            state.expanded = true
        },
        compressSelectPanel: (state) => {
            state.expanded = false
        }
    }
})

export const { expandSelectPanel, compressSelectPanel } = selectPanelSlice.actions
export default selectPanelSlice.reducer