import { apolloClient } from "../../graphql"
import { GET_ALL_ASSETS } from "./queries"

class AssetsService {
    async getAllAssets(limit=10, skip=0) {
        try {
            const response = await apolloClient.query({
                query: GET_ALL_ASSETS,
                variables: { limit, skip }
            })

            if (!response || !response.data) {
                throw new Error('Cannot get assets!')

            } else {
                console.log('DATA', response.data.findAllAssets)
                return response.data.findAllAssets
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}

export default new AssetsService()