import { apolloClient } from "../../graphql"
import { GET_ALL_ASSET_TYPES } from "./queries"

class AssetTypesService {
    async getAllAssetTypes(limit=10, skip=0) {
        try {
            const response = await apolloClient.query({
                query: GET_ALL_ASSET_TYPES,
                variables: { limit, skip }
            })

            if (!response || !response.data) {
                throw new Error('Cannot get asset Types!')

            } else {
                console.log('DATA', response.data.getAllAssetTypes)
                return response.data.getAllAssetTypes
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}

export default new AssetTypesService()