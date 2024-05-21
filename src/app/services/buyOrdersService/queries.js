import { gql } from "@apollo/client";

export const GET_ALL_USERS_ACTIVE_ORDERS_ON_SPECIFIC_ASSET_AND_BACKTESTING = gql`
    query getAllUsersActiveOrdersOnSpecificAssetAndBacktesting($userId: String!, $abbreviation: String!, $backtestingId: String!) {
        getAllUsersActiveOrdersOnSpecificAssetAndBacktesting(userId: $userId, abbreviation: $abbreviation, backtestingId: $backtestingId) {
            id
            openPrice
            closePrice
            orderBody
            orderStatus
            orderCloseType
            userId
            abbreviation
            backtestingId
        }
    }
`

export const GET_ALL_USERS_BUY_ORDERS_CLOSED_BY_TAKE_PROFIT_ON_SPECIFIC_ASSET_AND_BACKTESTING = gql`
    query getAllUsersBuyOrdersClosedByTakeProfitOnSpecificAssetAndBacktesting($userId: String!, $abbreviation: String!, $backtestingId: String!) {
        getAllUsersBuyOrdersClosedByTakeProfitOnSpecificAssetAndBacktesting(userId: $userId, abbreviation: $abbreviation, backtestingId: $backtestingId) {
            id
            openPrice
            closePrice
            orderStatus
            orderCloseType
            userId
            abbreviation
            backtestingId
            backtesting {
                startDate
                endDate
            }
        }
    }
`

export const GET_ALL_USERS_BUY_ORDERS_CLOSED_BY_STOP_LOSS_ON_SPECIFIC_ASSET_AND_BACKTESTING = gql`
    query getAllUsersBuyOrdersClosedByStopLossOnSpecificAssetAndBacktesting($userId: String!, $abbreviation: String!, $backtestingId: String!) {
        getAllUsersBuyOrdersClosedByStopLossOnSpecificAssetAndBacktesting(userId: $userId, abbreviation: $abbreviation, backtestingId: $backtestingId) {
            id
            openPrice
            closePrice
            orderStatus
            orderCloseType
            userId
            abbreviation
            backtestingId
            backtesting {
                startDate
                endDate
            }
        }
    }
`

export const CREATE_BUY_ORDER = gql`
    mutation createBuyOrder($openPrice: Float!, $orderBody: String!, $userId: String!, $abbreviation: String!, $backtestingId: String!) {
        createBuyOrder(createBuyOrderData: {openPrice: $openPrice, orderBody: $orderBody, userId: $userId, abbreviation: $abbreviation, backtestingId: $backtestingId}) {
            id
            openPrice
            closePrice
            orderBody
            orderStatus
            orderCloseType
            userId
            abbreviation
            backtestingId
        }
    }
`

export const UPDATE_BUY_ORDER = gql`
    mutation updateBuyOrder($id: String!, $openPrice: Float!, $closePrice: Float, $orderBody: String!, 
        $orderStatus: String, $orderCloseType: String, $userId: String!, $abbreviation: String!,
        $backtestingId: String!
    ) {
        updateBuyOrder(updateBuyOrderData: {id: $id, openPrice: $openPrice, closePrice: $closePrice, 
            orderBody: $orderBody, orderStatus: $orderStatus, orderCloseType: $orderCloseType, 
            userId: $userId, abbreviation: $abbreviation, backtestingId: $backtestingId}
        ) {
            id
            openPrice
            closePrice
            orderBody
            orderStatus
            orderCloseType
            userId
            abbreviation
            backtestingId
        }
    }
`