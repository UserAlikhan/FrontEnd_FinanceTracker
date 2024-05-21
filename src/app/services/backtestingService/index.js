import { apolloClient } from "../../graphql";
import { CREATE_BACKTESTING, GET_USERS_ACTIVE_BACKTESTING_ON_A_SPECIFIC_ASSET } from "./queries";

class BacktestingService {
    async getUsersActiveBacktestingOnASpecificAsset(userId, abbreviation) {
        try {
            const response = await apolloClient.query({
                query: GET_USERS_ACTIVE_BACKTESTING_ON_A_SPECIFIC_ASSET,
                variables: { userId, abbreviation }
            })

            if (response) return response
        } catch (error) {
            return false
        }
    }

    async createBacktesting(balance, startDate, endDate, userId, abbreviation) {
        try {
            const response = await apolloClient.mutate({
                mutation: CREATE_BACKTESTING,
                variables: { balance, startDate, endDate, userId, abbreviation }
            })

            if (response.data) return response.data
        } catch (error) {
            throw new Error(error)
        }
    }
}

export default new BacktestingService()