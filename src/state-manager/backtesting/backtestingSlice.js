import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isBacktestingForChooseAssetExists: false,
    showModal: false,
    showModalExistingBacktesting: false,
    backtestModeOn: false,
    backtestingInfo: []
}

const backtestingSlice = createSlice({
    name: 'backtesting',
    initialState: initialState,
    reducers: {
        fetchBacktesting: (state, action) => {
            state.isBacktestingForChooseAssetExists = true
            state.showModal = false
            state.showModalExistingBacktesting = state.showModalExistingBacktesting
            state.backtestModeOn = true
            state.backtestingInfo = action.payload
        },
        enableBacktestingModalWindow: (state) => {
            state.isBacktestingForChooseAssetExists = state.isBacktestingForChooseAssetExists
            state.showModal = true
            state.showModalExistingBacktesting = state.showModalExistingBacktesting
            state.backtestModeOn = false
            state.backtestingInfo = state.backtestingInfo
        },
        disableBacktestingModalWindow: (state) => {
            state.isBacktestingForChooseAssetExists = false
            state.showModal = false
            state.showModalExistingBacktesting = state.showModalExistingBacktesting
            state.backtestModeOn = false
            state.backtestingInfo = state.backtestingInfo
        },
        enableBacktestingExistsModalWindow: (state, action) => {
            state.isBacktestingForChooseAssetExists = state.isBacktestingForChooseAssetExists
            state.showModal = false
            state.showModalExistingBacktesting = true
            state.backtestModeOn = false
            state.backtestingInfo = action.payload
        },
        disableBacktestingExistsModalWindow: (state) => {
            state.isBacktestingForChooseAssetExists = state.isBacktestingForChooseAssetExists
            state.showModal = false
            state.showModalExistingBacktesting = false
            state.backtestModeOn = false
            state.backtestingInfo = []
        },
        createNewBacktesting: (state, action) => {
            state.isBacktestingForChooseAssetExists = true
            state.showModal = true
            state.showModalExistingBacktesting = state.showModalExistingBacktesting
            state.backtestModeOn = true
            state.backtestingInfo = action.payload
        },
        quitFromExistingBacktesting: (state) => {
            state.isBacktestingForChooseAssetExists = false
            state.showModal = false
            state.showModalExistingBacktesting = state.showModalExistingBacktesting
            state.backtestModeOn = false
            state.backtestingInfo = []
        }
    }
})

export const {
    fetchBacktesting, enableBacktestingModalWindow,
    disableBacktestingModalWindow, enableBacktestingExistsModalWindow,
    disableBacktestingExistsModalWindow, createNewBacktesting, 
    quitFromExistingBacktesting
} = backtestingSlice.actions
export default backtestingSlice.reducer