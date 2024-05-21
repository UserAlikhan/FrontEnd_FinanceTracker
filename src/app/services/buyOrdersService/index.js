import { apolloClient } from "../../graphql"
import { CREATE_BUY_ORDER, GET_ALL_USERS_ACTIVE_ORDERS_ON_SPECIFIC_ASSET_AND_BACKTESTING, GET_ALL_USERS_BUY_ORDERS_CLOSED_BY_STOP_LOSS_ON_SPECIFIC_ASSET_AND_BACKTESTING, GET_ALL_USERS_BUY_ORDERS_CLOSED_BY_TAKE_PROFIT_ON_SPECIFIC_ASSET_AND_BACKTESTING, UPDATE_BUY_ORDER } from "./queries"

class ButOrdersService {
    async getAllUsersActiveOrdersOnSpecificAssetAndBacktesting(userId, abbreviation, backtestingId) {
        try {
            const response = await apolloClient.query({
                query: GET_ALL_USERS_ACTIVE_ORDERS_ON_SPECIFIC_ASSET_AND_BACKTESTING,
                variables: { userId, abbreviation, backtestingId }
            })

            if (response) return response.data
        } catch (error) {
            throw new Error(error)
        } 
    }

    async getAllUserBuyOrdersClosedByTakeProfitOnSpecificAssetAndBacktesting(
        userId, abbreviation, backtestingId
    ) {
        try {
            const response = await apolloClient.query({
                query: GET_ALL_USERS_BUY_ORDERS_CLOSED_BY_TAKE_PROFIT_ON_SPECIFIC_ASSET_AND_BACKTESTING,
                variables: { userId, abbreviation, backtestingId }
            })

            if (response.data) return response.data.getAllUsersBuyOrdersClosedByTakeProfitOnSpecificAssetAndBacktesting
        } catch (error) {
            throw new Error(error)
        } 
    }

    async getAllUserBuyOrdersClosedByStopLossOnSpecificAssetAndBacktesting(
        userId, abbreviation, backtestingId
    ) {
        try {
            const response = await apolloClient.query({
                query: GET_ALL_USERS_BUY_ORDERS_CLOSED_BY_STOP_LOSS_ON_SPECIFIC_ASSET_AND_BACKTESTING,
                variables: { userId, abbreviation, backtestingId }
            })

            if (response.data) return response.data.getAllUsersBuyOrdersClosedByStopLossOnSpecificAssetAndBacktesting
        } catch (error) {
            throw new Error(error)
        } 
    }

    async createBuyOrder(openPrice, orderBody, userId, abbreviation, backtestingId) {
        try {
            const response = await apolloClient.mutate({
                mutation: CREATE_BUY_ORDER,
                variables: { openPrice, orderBody, userId, abbreviation, backtestingId }
            })

            if (response) return response.data
        } catch (error) {
            throw new Error(error)
        } 
    }

    async updateBuyOrder({id, openPrice, closePrice, orderBody, orderStatus, 
        orderCloseType, userId, abbreviation, backtestingId
    }) {
        try {
            const response = await apolloClient.mutate({
                mutation: UPDATE_BUY_ORDER,
                variables: { id, openPrice, closePrice, orderBody, orderStatus,
                    orderCloseType, userId, abbreviation, backtestingId
                }
            })

            if (response) return response.data
        } catch (error) {
            throw new Error(error)
        }
    }
}

export default new ButOrdersService()