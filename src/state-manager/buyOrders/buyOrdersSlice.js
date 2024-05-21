import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    enableBuyOrders: false,
    isNewObject: false,
    showModalBuyOrders: false,
    lastPrice: null,
    idx_buyOrders_1: [],
    buyOrdersList_1: [],
    ordersClosedByTakeProfit: [],
    ordersClosedByStopLoss: [],
    ordersCount: 0,
    showOrdersModal: false,
    alertToEdit: {}
}

const buyOrdersSlice = createSlice({
    name: 'buyOrders',
    initialState: initialState,
    reducers: {
        fetchBuyOrders: (state, action) => {
            state.enableBuyOrders = false
            state.isNewObject = false
            state.showModalBuyOrders = state.showModalBuyOrders
            state.lastPrice = state.lastPrice
            state.idx_buyOrders_1 = action.payload.idx_buyOrders_1 ? action.payload.idx_buyOrders_1 : []
            state.buyOrdersList_1 = action.payload.buyOrdersList_1 ? action.payload.buyOrdersList_1: []
            state.ordersClosedByTakeProfit = state.ordersClosedByTakeProfit
            state.ordersClosedByStopLoss = state.ordersClosedByStopLoss
            state.ordersCount = action.payload.buyOrdersList_1 
                ? action.payload.buyOrdersList_1.length 
                : state.ordersCount
            state.showOrdersModal = false
            state.alertToEdit = state.alertToEdit
        },
        setLastPrice: (state, action) => {
            state.enableBuyOrders = state.enableBuyOrders
            state.isNewObject = state.isNewObject
            state.showModalBuyOrders = state.showModalBuyOrders
            state.lastPrice = action.payload
            state.idx_buyOrders_1 = state.idx_buyOrders_1
            state.buyOrdersList_1 = state.buyOrdersList_1
            state.ordersClosedByTakeProfit = state.ordersClosedByTakeProfit
            state.ordersClosedByStopLoss = state.ordersClosedByStopLoss
            state.ordersCount = state.ordersCount
            state.showOrdersModal = state.showOrdersModal
            state.alertToEdit = state.alertToEdit
        },
        enableBuyOrders: (state) => {
            state.enableBuyOrders = true
            state.isNewObject = false
            state.showModalBuyOrders = state.showModalBuyOrders
            state.lastPrice = state.lastPrice
            state.idx_buyOrders_1 = state.idx_buyOrders_1
            state.buyOrdersList_1 = state.buyOrdersList_1
            state.ordersClosedByTakeProfit = state.ordersClosedByTakeProfit
            state.ordersClosedByStopLoss = state.ordersClosedByStopLoss
            state.ordersCount = state.ordersCount
            state.showOrdersModal = state.showOrdersModal
            state.alertToEdit = state.alertToEdit
        },
        disableBuyOrders: (state) => {
            state.enableBuyOrders = false
            state.isNewObject = false
            state.showModalBuyOrders = state.showModalBuyOrders
            state.lastPrice = state.lastPrice
            state.idx_buyOrders_1 = state.idx_buyOrders_1
            state.buyOrdersList_1 = state.buyOrdersList_1
            state.ordersClosedByTakeProfit = state.ordersClosedByTakeProfit
            state.ordersClosedByStopLoss = state.ordersClosedByStopLoss
            state.ordersCount = state.ordersCount
            state.showOrdersModal = state.showOrdersModal
            state.alertToEdit = state.alertToEdit
        },
        enableBuyOrdersModalWindow: (state) => {
            state.enableBuyOrders = false
            state.isNewObject = state.isNewObject
            state.showModalBuyOrders = true
            state.lastPrice = state.lastPrice
            state.idx_buyOrders_1 = state.idx_buyOrders_1
            state.buyOrdersList_1 = state.buyOrdersList_1
            state.ordersClosedByTakeProfit = state.ordersClosedByTakeProfit
            state.ordersClosedByStopLoss = state.ordersClosedByStopLoss
            state.ordersCount = state.ordersCount
            state.showOrdersModal = state.showOrdersModal
            state.alertToEdit = state.alertToEdit
        },
        disableBuyOrdersModalWindow: (state) => {
            state.enableBuyOrders = false
            state.isNewObject = state.isNewObject
            state.showModalBuyOrders = false
            state.lastPrice = state.lastPrice
            state.idx_buyOrders_1 = state.idx_buyOrders_1
            state.buyOrdersList_1 = state.buyOrdersList_1
            state.ordersClosedByTakeProfit = state.ordersClosedByTakeProfit
            state.ordersClosedByStopLoss = state.ordersClosedByStopLoss
            state.ordersCount = state.ordersCount
            state.showOrdersModal = state.showOrdersModal
            state.alertToEdit = state.alertToEdit
        },
        updateBuyOrder: (state, action) => {
            state.enableBuyOrders = state.enableBuyOrders
            state.isNewObject = state.isNewObject
            state.showModalBuyOrders = state.showModalBuyOrders
            state.lastPrice = state.lastPrice
            state.idx_buyOrders_1 = action.payload.idx_buyOrders_1 
                ? [...state.idx_buyOrders_1, action.payload.idx_buyOrders_1]
                : state.idx_buyOrders_1
            state.buyOrdersList_1 = action.payload.buyOrdersList_1
            state.ordersClosedByTakeProfit = state.ordersClosedByTakeProfit
            state.ordersClosedByStopLoss = state.ordersClosedByStopLoss
            state.ordersCount = action.payload.buyOrdersList_1.length
            state.showOrdersModal = state.showOrdersModal
            state.alertToEdit = state.alertToEdit
        },
        closeBuyOrder: (state, action) => {
            state.enableBuyOrders = false
            state.isNewObject = state.isNewObject
            state.showModalBuyOrders = state.showModalBuyOrders
            state.lastPrice = state.lastPrice
            state.idx_buyOrders_1 = state.idx_buyOrders_1.filter((each) => each !== action.payload.id)
            state.buyOrdersList_1 = state.buyOrdersList_1.filter(
                (each) => !action.payload.buyOrdersList_1.some((obj) => obj.text === each.text)
            )
            state.ordersClosedByTakeProfit = state.ordersClosedByTakeProfit
            state.ordersClosedByStopLoss = state.ordersClosedByStopLoss
            state.ordersCount = state.buyOrdersList_1.length
            state.showOrdersModal = state.showOrdersModal
            state.alertToEdit = state.alertToEdit
        },
        setNewBuyOrder: (state) => {
            state.enableBuyOrders = state.enableBuyOrders
            state.isNewObject = true
            state.showModalBuyOrders = state.showModalBuyOrders
            state.lastPrice = state.lastPrice
            state.idx_buyOrders_1 = state.idx_buyOrders_1
            state.buyOrdersList_1 = state.buyOrdersList_1
            state.ordersClosedByTakeProfit = state.ordersClosedByTakeProfit
            state.ordersClosedByStopLoss = state.ordersClosedByStopLoss
            state.ordersCount = state.ordersCount
            state.showOrdersModal = state.showOrdersModal
            state.alertToEdit = state.alertToEdit
        },
        undoNewBuyOrder: (state) => {
            state.enableBuyOrders = false
            state.isNewObject = false
            state.showModalBuyOrders = state.showModalBuyOrders
            state.lastPrice = state.lastPrice
            state.idx_buyOrders_1 = state.idx_buyOrders_1
            state.buyOrdersList_1 = state.buyOrdersList_1
            state.ordersClosedByTakeProfit = state.ordersClosedByTakeProfit
            state.ordersClosedByStopLoss = state.ordersClosedByStopLoss
            state.ordersCount = state.ordersCount
            state.showOrdersModal = state.showOrdersModal
            state.alertToEdit = state.alertToEdit
        },
        updateOrdersClosedByTakeProfit: (state, action) => {
            state.enableBuyOrders = false
            state.isNewObject = false
            state.showModalBuyOrders = state.showModalBuyOrders
            state.lastPrice = state.lastPrice
            state.idx_buyOrders_1 = state.idx_buyOrders_1
            state.buyOrdersList_1 = state.buyOrdersList_1
            state.ordersClosedByTakeProfit = action.payload
            state.ordersClosedByStopLoss = state.ordersClosedByStopLoss
            state.ordersCount = state.ordersCount
            state.showOrdersModal = state.showOrdersModal
            state.alertToEdit = state.alertToEdit
        },
        updateOrdersClosedByStopLoss: (state, action) => {
            state.enableBuyOrders = false
            state.isNewObject = false
            state.showModalBuyOrders = state.showModalBuyOrders
            state.lastPrice = state.lastPrice
            state.idx_buyOrders_1 = state.idx_buyOrders_1
            state.buyOrdersList_1 = state.buyOrdersList_1
            state.ordersClosedByTakeProfit = state.ordersClosedByTakeProfit
            state.ordersClosedByStopLoss = action.payload
            state.ordersCount = state.ordersCount
            state.showOrdersModal = state.showOrdersModal
            state.alertToEdit = state.alertToEdit
        },
    }
})

export const {
    fetchBuyOrders, setLastPrice,
    enableBuyOrders, disableBuyOrders, 
    enableBuyOrdersModalWindow, disableBuyOrdersModalWindow, 
    updateBuyOrder, closeBuyOrder, 
    setNewBuyOrder, undoNewBuyOrder,
    updateOrdersClosedByTakeProfit, updateOrdersClosedByStopLoss
} = buyOrdersSlice.actions
export default buyOrdersSlice.reducer