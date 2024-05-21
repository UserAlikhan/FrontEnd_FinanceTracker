import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    enableInteractiveText: false,
    showModal: false,
    isNewObject: false,
    chartIdOfTheDrawingObject: 1,
    idx_interactiveText_1: [],
    interactiveText_1: [],
    idx_interactiveText_3: [],
    interactiveText_3: [],
}

const interactiveTextSlice = createSlice({
    name: "interactiveText",
    initialState: initialState,
    reducers: {
        fetchInteractiveText: (state, action) => {
            state.enableInteractiveText = false
            state.showModal = false
            state.isNewObject = false
            state.chartIdOfTheDrawingObject = state.chartIdOfTheDrawingObject
            state.idx_interactiveText_1 = action.payload.idx_interactiveText_1
            state.interactiveText_1 = action.payload.interactiveText_1
            state.idx_interactiveText_3 = action.payload.idx_interactiveText_3
            state.interactiveText_3 = action.payload.interactiveText_3
        },
        enableInteractiveText: (state) => {
            state.enableInteractiveText = true
            state.showModal = state.showModal
            state.isNewObject = state.isNewObject
            state.chartIdOfTheDrawingObject = state.chartIdOfTheDrawingObject
            state.idx_interactiveText_1 = state.idx_interactiveText_1
            state.interactiveText_1 = state.interactiveText_1
            state.idx_interactiveText_3 = state.idx_interactiveText_3
            state.interactiveText_3 = state.interactiveText_3
        },
        disableInteractiveText: (state) => {
            state.enableInteractiveText = false
            state.showModal = state.showModal
            state.isNewObject = state.isNewObject
            state.chartIdOfTheDrawingObject = state.chartIdOfTheDrawingObject
            state.idx_interactiveText_1 = state.idx_interactiveText_1
            state.interactiveText_1 = state.interactiveText_1
            state.idx_interactiveText_3 = state.idx_interactiveText_3
            state.interactiveText_3 = state.interactiveText_3
        },
        enableModalWindow: (state, action) => {
            state.enableInteractiveText = true
            state.showModal = true
            state.isNewObject = state.isNewObject
            state.chartIdOfTheDrawingObject = action.payload ? action.payload : 1
            state.idx_interactiveText_1 = state.idx_interactiveText_1
            state.interactiveText_1 = state.interactiveText_1
            state.idx_interactiveText_3 = state.idx_interactiveText_3
            state.interactiveText_3 = state.interactiveText_3
        },
        disableModalWindow: (state) => {
            state.enableInteractiveText = false
            state.showModal = false
            state.isNewObject = state.isNewObject
            state.chartIdOfTheDrawingObject = state.chartIdOfTheDrawingObject
            state.idx_interactiveText_1 = state.idx_interactiveText_1
            state.interactiveText_1 = state.interactiveText_1
            state.idx_interactiveText_3 = state.idx_interactiveText_3
            state.interactiveText_3 = state.interactiveText_3
        },
        updateInteractiveText1: (state, action) => {
            state.enableInteractiveText = false
            state.showModal = state.showModal
            state.isNewObject = false
            state.chartIdOfTheDrawingObject = state.chartIdOfTheDrawingObject
            state.idx_interactiveText_1 = action.payload.idx
                ? [...state.idx_interactiveText_1, action.payload.idx]
                : [...state.idx_interactiveText_1]
            state.interactiveText_1 = action.payload.interactiveText_1
            state.idx_interactiveText_3 = state.idx_interactiveText_3
            state.interactiveText_3 = state.interactiveText_3
        },
        updateInteractiveText3: (state, action) => {
            state.enableInteractiveText = false
            state.showModal = state.showModal
            state.isNewObject = false
            state.chartIdOfTheDrawingObject = state.chartIdOfTheDrawingObject
            state.idx_interactiveText_1 = state.idx_interactiveText_1
            state.interactiveText_1 = state.interactiveText_1
            state.idx_interactiveText_3 = action.payload.idx
                ? [...state.idx_interactiveText_3, action.payload.idx]
                : [...state.idx_interactiveText_3]
            state.interactiveText_3 = action.payload.interactiveText_3
        },
        deleteInteractiveText1: (state, action) => {
            state.enableInteractiveText = false
            state.showModal = false
            state.isNewObject = false
            state.chartIdOfTheDrawingObject = state.chartIdOfTheDrawingObject
            state.idx_interactiveText_1 = state.idx_interactiveText_1.filter((each) => each !== action.payload.id)
            state.interactiveText_1 = state.interactiveText_1.filter(
                (each) => {
                    return each.position[0] !== action.payload.interactiveText_1.position[0] 
                        && each.position[1] !== action.payload.interactiveText_1.position[1]
                }
            )
            state.idx_interactiveText_3 = state.idx_interactiveText_3
            state.interactiveText_3 = state.interactiveText_3
        },
        deleteInteractiveText3: (state, action) => {
            state.enableInteractiveText = false
            state.showModal = false
            state.isNewObject = false
            state.chartIdOfTheDrawingObject = state.chartIdOfTheDrawingObject
            state.idx_interactiveText_1 = state.idx_interactiveText_1
            state.interactiveText_1 = state.interactiveText_1
            state.idx_interactiveText_3 = state.idx_interactiveText_3.filter((each) => each !== action.payload.id)
            state.interactiveText_3 = state.interactiveText_3.filter(
                (each) => {
                    return each.position[0] !== action.payload.interactiveText_3.position[0] 
                        && each.position[1] !== action.payload.interactiveText_3.position[1]
                }
            )
        },
        deselectInteractiveText: (state) => {
            state.enableInteractiveText = false
            state.showModal = false
            state.isNewObject = false
            state.chartIdOfTheDrawingObject = state.chartIdOfTheDrawingObject
            state.idx_interactiveText_1 = state.idx_interactiveText_1
            state.interactiveText_1 = state.interactiveText_1.map((each) => each.selected = false)
            state.idx_interactiveText_3 = state.idx_interactiveText_3
            state.interactiveText_3 = state.interactiveText_3.map((each) => each.selected = false)
        },
        setNewInteractiveText: (state) => {
            state.enableInteractiveText = state.enableInteractiveText
            state.showModal = state.showModal
            state.isNewObject = true
            state.chartIdOfTheDrawingObject = state.chartIdOfTheDrawingObject
            state.idx_interactiveText_1 = state.idx_interactiveText_1
            state.interactiveText_1 = state.interactiveText_1
            state.idx_interactiveText_3 = state.idx_interactiveText_3
            state.interactiveText_3 = state.interactiveText_3
        },
        undoNewInteractiveText: (state) => {
            state.enableInteractiveText = state.enableInteractiveText
            state.showModal = state.showModal
            state.isNewObject = false
            state.chartIdOfTheDrawingObject = state.chartIdOfTheDrawingObject
            state.idx_interactiveText_1 = state.idx_interactiveText_1
            state.interactiveText_1 = state.interactiveText_1
            state.idx_interactiveText_3 = state.idx_interactiveText_3
            state.interactiveText_3 = state.interactiveText_3
        }
    }
})

export const { 
    fetchInteractiveText, enableInteractiveText,
    disableInteractiveText, enableModalWindow,
    disableModalWindow, updateInteractiveText1,
    updateInteractiveText3, deleteInteractiveText1,
    deleteInteractiveText3, deselectInteractiveText,
    setNewInteractiveText, undoNewInteractiveText
} = interactiveTextSlice.actions
export default interactiveTextSlice.reducer