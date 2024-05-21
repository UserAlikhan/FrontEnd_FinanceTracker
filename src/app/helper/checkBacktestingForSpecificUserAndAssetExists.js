import backtestingService from '../services/backtestingService'

export const checkBacktestingForSpecificUserAndAssetExists = async (userId, abbreviation) => {
    try {
        const backtestingData = await backtestingService.getUsersActiveBacktestingOnASpecificAsset(userId, abbreviation)
        if (backtestingData) {
            return backtestingData
        }
        return false
    } catch (error) {
        return false
    }
}