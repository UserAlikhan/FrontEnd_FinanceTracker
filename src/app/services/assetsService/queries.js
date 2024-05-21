import { gql } from "@apollo/client";

export const GET_ALL_ASSETS = gql`
    query findAllAssets($limit: Int!, $skip: Int!) {
        findAllAssets(limit: $limit, skip: $skip) {
            _id
            fullName
            abbreviation
            assetType {
                _id
                name
                assets {
                    _id
                    fullName
                    abbreviation
                }
            }
            backtesting {
                _id
                balance
                startDate
                endDate
                users {
                    username
                    email
                }
            }
            buy_orders {
                id
                openPrice
                closePrice
                orderStatus
                orderCloseType
            }
        }
    }
`;