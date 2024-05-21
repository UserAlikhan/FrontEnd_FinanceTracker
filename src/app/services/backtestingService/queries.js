import { gql } from "@apollo/client";

export const GET_USERS_ACTIVE_BACKTESTING_ON_A_SPECIFIC_ASSET = gql`
    query getUsersActiveBacktestingOnASpecificAsset($userId: String!, $abbreviation: String!) {
        getUsersActiveBacktestingOnASpecificAsset(userId: $userId, abbreviation: $abbreviation) {
            _id
            balance
            status
            startDate
            endDate
            drawn_objects {
                id
                objectName
                objectBody
            }
        }
    }
`

export const CREATE_BACKTESTING = gql`
    mutation createBacktesting($balance: Float!, $startDate: DateTime!, $endDate: DateTime!, $userId: String!, $abbreviation: String!) {
        createBacktesting(createBacktestingData: {balance: $balance, startDate: $startDate, endDate: $endDate, userId: $userId, abbreviation: $abbreviation}) {
            _id
            balance
            status
            startDate
            endDate
            drawn_objects {
                id
                objectName
                objectBody
            }
        }
    }
`