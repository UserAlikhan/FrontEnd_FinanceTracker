import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    enableFibbonaci: false,
    isNewObject: false,
    idx_fibbonaci_1: [],
    fibbonaci_1: [],
    idx_fibbonaci_3: [],
    fibbonaci_3: [],
}

const fibbonaciSlice = createSlice({
    name: 'fibbonaci',
    initialState: initialState,
    reducers: {
        fetchFibbonaci: (state, action) => {
            state.enableFibbonaci = false
            state.isNewObject = false
            state.idx_fibbonaci_1 = action.payload.idx_fibbonaci_1
            state.fibbonaci_1 = action.payload.fibbonaci_1
            state.idx_fibbonaci_3 = action.payload.idx_fibbonaci_3
            state.fibbonaci_3 = action.payload.fibbonaci_3
        },
        enableFibbonaci: (state) => {
            state.enableFibbonaci = true
            state.isNewObject = state.isNewObject
            state.idx_fibbonaci_1 = state.idx_fibbonaci_1
            state.fibbonaci_1 = state.fibbonaci_1
            state.idx_fibbonaci_3 = state.idx_fibbonaci_3
            state.fibbonaci_3 = state.fibbonaci_3
        },
        disableFibbonaci: (state) => {
            state.enableFibbonaci = false
            state.isNewObject = state.isNewObject
            state.idx_fibbonaci_1 = state.idx_fibbonaci_1
            state.fibbonaci_1 = state.fibbonaci_1
            state.idx_fibbonaci_3 = state.idx_fibbonaci_3
            state.fibbonaci_3 = state.fibbonaci_3
        },
        updateFibbonaci1: (state, action) => {
            state.enableFibbonaci = false
            state.isNewObject = false
            state.idx_fibbonaci_1 = action.payload.idx
                ? [...state.idx_fibbonaci_1, action.payload.idx]
                : [...state.idx_fibbonaci_1]
            state.fibbonaci_1 = action.payload.fibbonaci_1
            state.idx_fibbonaci_3 = state.idx_fibbonaci_3
            state.fibbonaci_3 = state.fibbonaci_3
        },
        updateFibbonaci3: (state, action) => {
            state.enableFibbonaci = false
            state.isNewObject = false
            state.idx_fibbonaci_1 = state.idx_fibbonaci_1
            state.fibbonaci_1 = state.fibbonaci_1
            state.idx_fibbonaci_3 = action.payload.idx
                ? [...state.idx_fibbonaci_3, action.payload.idx]
                : [...state.idx_fibbonaci_3]
            state.fibbonaci_3 = action.payload.fibbonaci_3
        },
        deleteFibbonaci1: (state, action) => {
            state.enableFibbonaci = false
            state.isNewObject = false
            state.idx_fibbonaci_1 = state.idx_fibbonaci_1.filter((each) => each !== action.payload.id)
            state.fibbonaci_1 = state.fibbonaci_1.filter(
                (each) => {
                    return each.x1 !== action.payload.fibbonaci_1.x1 && each.y1 !== action.payload.fibbonaci_1.y1
                        && each.x2 !== action.payload.fibbonaci_1.x2 && each.y2 !== action.payload.fibbonaci_1.y2
                }
            )
            state.idx_fibbonaci_3 = state.idx_fibbonaci_3
            state.fibbonaci_3 = state.fibbonaci_3
        },
        deleteFibbonaci3: (state, action) => {
            state.enableFibbonaci = false
            state.isNewObject = false
            state.idx_fibbonaci_1 = state.idx_fibbonaci_1
            state.fibbonaci_1 = state.fibbonaci_1
            state.idx_fibbonaci_3 = state.idx_fibbonaci_3.filter((each) => each !== action.payload.id)
            state.fibbonaci_3 = state.fibbonaci_3.filter(
                (each) => {
                    return each.x1 !== action.payload.fibbonaci_3.x1 && each.y1 !== action.payload.fibbonaci_3.y1
                        && each.x2 !== action.payload.fibbonaci_3.x2 && each.y2 !== action.payload.fibbonaci_3.y2
                }
            )
        },
        deselectFibbonaci: (state) => {
            state.enableFibbonaci = false
            state.isNewObject = false
            state.idx_fibbonaci_1 = state.idx_fibbonaci_1
            state.fibbonaci_1 = state.fibbonaci_1.map((each) => each.selected = false)
            state.idx_fibbonaci_3 = state.idx_fibbonaci_3
            state.fibbonaci_3 = state.fibbonaci_3.map((each) => each.selected = false)
        },
        setNeWFibbonaci: (state) => {
            state.enableFibbonaci = state.enableFibbonaci
            state.isNewObject = true
            state.idx_fibbonaci_1 = state.idx_fibbonaci_1
            state.fibbonaci_1 = state.fibbonaci_1
            state.idx_fibbonaci_3 = state.idx_fibbonaci_3
            state.fibbonaci_3 = state.fibbonaci_3
        },
        undoNewFibbonaci: (state) => {
            state.enableFibbonaci = state.enableFibbonaci
            state.isNewObject = false
            state.idx_fibbonaci_1 = state.idx_fibbonaci_1
            state.fibbonaci_1 = state.fibbonaci_1
            state.idx_fibbonaci_3 = state.idx_fibbonaci_3
            state.fibbonaci_3 = state.fibbonaci_3
        }
    }
})

export const {
    fetchFibbonaci, enableFibbonaci,
    disableFibbonaci, updateFibbonaci1,
    updateFibbonaci3, deleteFibbonaci1,
    deleteFibbonaci3, deselectFibbonaci,
    setNeWFibbonaci, undoNewFibbonaci
} = fibbonaciSlice.actions
export default fibbonaciSlice.reducer