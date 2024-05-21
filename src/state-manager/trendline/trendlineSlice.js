import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    enableTrendLine: false,
    isNewObject: false,
    idx_trends_1: [],
    trends_1: [],
    trends_3: [],
    idx_trends_3: []
}

const trendlineSlice = createSlice({
    name: 'trendline',
    initialState: initialState,
    reducers: {
        fetchTrendlines: (state, action) => {
            state.enableTrendLine = false
            state.trends_1 = action.payload.trends_1
            state.idx_trends_1 = action.payload.idx_trends_1
            state.trends_3 = action.payload.trends_3
            state.idx_trends_3 = action.payload.idx_trends_3
        },
        enableTrendline: (state) => {
            state.enableTrendLine = true
            state.trends_1 = state.trends_1
            state.trends_3 = state.trends_3
        },
        disableTrendline: (state) => {
            state.enableTrendLine = false
            state.trends_1 = state.trends_1
            state.trends_3 = state.trends_3
        },
        updateTrendline1: (state, action) => {
            state.enableTrendLine = false
            state.trends_1 = action.payload.trends_1
            state.idx_trends_1 = action.payload.idx 
                ? [...state.idx_trends_1, action.payload.idx]
                : [...state.idx_trends_1]
            state.trends_3 = state.trends_3
            state.idx_trends_3 = state.idx_trends_3
        },
        updateTrendline3: (state, action) => {
            state.enableTrendLine = false
            state.trends_1 = state.trends_1
            state.idx_trends_1 = state.idx_trends_1
            state.trends_3 = action.payload.trends_3
            state.idx_trends_3 = action.payload.idx
                ? [...state.idx_trends_3, action.payload.idx]
                : [...state.idx_trends_3]
        },
        deleteTrendline1: (state, action) => {
            state.enableTrendLine = false
            state.trends_1 = state.trends_1.filter(
                (each) => {
                    return each.start[0] !== action.payload.trends_1.start[0] && each.start[1] !== action.payload.trends_1.start[1]
                        && each.end[0] !== action.payload.trends_1.end[0] && each.end[1] !== action.payload.trends_1.end[1]
                }
            )
            state.idx_trends_1 = state.idx_trends_1.filter((each) => each !== action.payload.id)
            state.trends_3 = state.trends_3
            state.idx_trends_3 = state.idx_trends_3
        },
        deleteTrendline3: (state, action) => {
            state.enableTrendLine = false   
            state.trends_1 = state.trends_1
            state.idx_trends_1 = state.idx_trends_1
            state.trends_3 = state.trends_3.filter(
                (each) => {
                    return each.start[0] !== action.payload.trends_3.start[0] && each.start[1] !== action.payload.trends_3.start[1]
                        && each.end[0] !== action.payload.trends_3.end[0] && each.end[1] !== action.payload.trends_3.end[1]
                }
            )
            state.idx_trends_3 = state.idx_trends_3.filter((each) => each !== action.payload.id)
        },
        deselectTrendline: (state) => {
            state.enableTrendLine = false
            state.trends_1 = state.trends_1.map(each => each.selected = false)
            state.trends_3 = state.trends_3.map(each => each.selected = false)
        },
        setNewTrendline: (state) => {
            state.enableTrendLine = state.enableTrendLine
            state.trends_1 = state.trends_1
            state.idx_trends_1 = state.idx_trends_1
            state.trends_3 = state.trends_3
            state.idx_trends_3 = state.idx_trends_3
            state.isNewObject = true
        },
        undoNewTrendline: (state) => {
            state.enableTrendLine = state.enableTrendLine
            state.trends_1 = state.trends_1
            state.idx_trends_1 = state.idx_trends_1
            state.trends_3 = state.trends_3
            state.idx_trends_3 = state.idx_trends_3
            state.isNewObject = false
        }
    }
})

export const { 
    enableTrendline, disableTrendline, 
    updateTrendline1, updateTrendline3,
    deleteTrendline1, deleteTrendline3,
    deselectTrendline, fetchTrendlines,
    setNewTrendline, undoNewTrendline,
} = trendlineSlice.actions
export default trendlineSlice.reducer