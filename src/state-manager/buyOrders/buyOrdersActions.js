import { checkAndRemoveOrders } from "../../app/helper/checkAndRemoveOrders"
import buyOrdersService from "../../app/services/buyOrdersService"
import { closeBuyOrder, fetchBuyOrders, updateBuyOrder, updateOrdersClosedByStopLoss, updateOrdersClosedByTakeProfit } from "./buyOrdersSlice"

export const fetchBuyOrdersAction = (userId, abbreviation, backtestingId) => {
    return (async (dispatch) => {
        try {
            const buyOrders = await buyOrdersService
                .getAllUsersActiveOrdersOnSpecificAssetAndBacktesting(userId, abbreviation, backtestingId)
            console.log('buyOrders ', buyOrders.getAllUsersActiveOrdersOnSpecificAssetAndBacktesting[0])
            if (buyOrders.getAllUsersActiveOrdersOnSpecificAssetAndBacktesting) {
                const convertedToObjectBuyOrders = JSON.parse(
                    buyOrders?.getAllUsersActiveOrdersOnSpecificAssetAndBacktesting[0]?.orderBody
                )

                console.log('convertedToObjectBuyOrders ', convertedToObjectBuyOrders)
                const idxForBuyOrders = buyOrders
                    .getAllUsersActiveOrdersOnSpecificAssetAndBacktesting[0].id
                
                console.log('idxForBuyOrders ', idxForBuyOrders)
                dispatch(fetchBuyOrders({
                    buyOrdersList_1: convertedToObjectBuyOrders,
                    idx_buyOrders_1: idxForBuyOrders
                }))
            }
        } catch (error) {
            throw new Error(error)
        }
    })
}

export const fetchClosedByTakeProfitOrders = (userId, abbreviation, backtestingId) => {
    return (async (dispatch) => {
        try {
            const buyOrders = await buyOrdersService
                .getAllUserBuyOrdersClosedByTakeProfitOnSpecificAssetAndBacktesting(userId, abbreviation, backtestingId)

            if (buyOrders) {
                // const convertedToObjectBuyOrders = buyOrders.orderBody.map((buyOrder) => {
                //         return JSON.parse(buyOrder)
                //     }
                // )

                dispatch(updateOrdersClosedByTakeProfit(buyOrders))
            }
        } catch (error) {
            throw new Error(error)
        }
    })
}
export const fetchClosedByStopLossOrders = (userId, abbreviation, backtestingId) => {
    return (async (dispatch) => {
        try {
            const buyOrders = await buyOrdersService
                .getAllUserBuyOrdersClosedByStopLossOnSpecificAssetAndBacktesting(userId, abbreviation, backtestingId)

            if (buyOrders) {
                // const convertedToObjectBuyOrders = buyOrders.orderBody.map((buyOrder) => {
                //         return JSON.parse(buyOrder)
                //     }
                // )

                dispatch(updateOrdersClosedByStopLoss(buyOrders))
            }
        } catch (error) {
            throw new Error(error)
        }
    })
}

export const updateBuyOrdersAction = (openPrice, closePrice, orderBody, orderStatus, 
    orderCloseType, userId, abbreviation, backtestingId, isNewObject, objIdx
) => {
    console.log('parameters ', openPrice, closePrice, orderBody, orderStatus, 
    orderCloseType, userId, abbreviation, backtestingId, isNewObject, objIdx)

    return (async (dispatch) => {
        try {
            if (isNewObject) {
                const last3Objects = orderBody.slice(-3)
                console.log('last3Objects ', last3Objects)

                const createdObject = await buyOrdersService.createBuyOrder(
                    openPrice,
                    JSON.stringify(last3Objects),
                    userId, abbreviation, backtestingId
                )
                console.log('createdObject ', createdObject)
                if (createdObject) {
                    dispatch(updateBuyOrder({
                        idx_buyOrders_1: createdObject?.createBuyOrder.id,
                        buyOrdersList_1: orderBody
                    }))
                }
            } else {
                const last3Objects = orderBody.slice(-3)

                const updatedObject = await buyOrdersService.updateBuyOrder({
                    id: objIdx,
                    openPrice: openPrice,
                    orderBody: JSON.stringify(last3Objects),
                    userId: userId, 
                    abbreviation: abbreviation, 
                    backtestingId: backtestingId
                })

                if (updatedObject) {
                    dispatch(updateBuyOrder({
                        buyOrdersList_1: orderBody
                    }))
                }
            }
        } catch (error) {
            throw new Error(error)
        }
    })
}

export const checkBuyOrders = (state, lastPrice, userId, abbreviation, backtestingId) => {
    return (async (dispatch) => {
        try {
            const removedOrder = checkAndRemoveOrders(state, lastPrice)
            console.log('removedOrder ', removedOrder)
            if (removedOrder[0] && removedOrder[0]?.lable === 'Take_Profit') {
                const openPrice = removedOrder[0]?.objectBody?.filter((obj) => obj.text.split(' ')[0] === 'Take_Profit')[0]?.yValue
    
                const updatedObject = await buyOrdersService.updateBuyOrder({
                    id: removedOrder[0]?.id,
                    openPrice: openPrice,
                    closePrice: lastPrice,
                    orderBody: JSON.stringify(removedOrder[0]?.objectBody),
                    orderStatus: "closed",
                    orderCloseType: "take_profit",
                    userId: userId, 
                    abbreviation: abbreviation, 
                    backtestingId: backtestingId
                })

                if (updatedObject) {
                    dispatch(closeBuyOrder({
                        id: removedOrder[0]?.id,
                        buyOrdersList_1: removedOrder[0]?.objectBody
                    }))
                }
            } else if (removedOrder[0] && removedOrder[0]?.lable === 'Stop_Loss') {
                const openPrice = removedOrder[0]?.objectBody?.filter((obj) => obj.text.split(' ')[0] === 'Stop_Loss')[0]?.yValue
    
                const updatedObject = await buyOrdersService.updateBuyOrder({
                    id: removedOrder[0]?.id,
                    openPrice: openPrice,
                    closePrice: lastPrice,
                    orderBody: JSON.stringify(removedOrder[0]?.objectBody),
                    orderStatus: "closed",
                    orderCloseType: "stop_loss",
                    userId: userId, 
                    abbreviation: abbreviation, 
                    backtestingId: backtestingId
                })

                if (updatedObject) {
                    dispatch(closeBuyOrder({
                        id: removedOrder[0]?.id,
                        buyOrdersList_1: removedOrder[0]?.objectBody
                    }))
                }
            }
        } catch (error) {
            throw new Error(error)
        }
    })
    // return (async (dispatch) => {
        
    // })
}