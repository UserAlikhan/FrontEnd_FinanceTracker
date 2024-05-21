import { gql } from "@apollo/client";

export const GET_ALL_ASSET_TYPES = gql`
    query getAllAssetTypes($limit: Int!, $skip: Int!){
        getAllAssetTypes(limit: $limit, skip: $skip) {
            _id
            name
            assets {
                _id
                fullName
                abbreviation
            }
        }
    }
`