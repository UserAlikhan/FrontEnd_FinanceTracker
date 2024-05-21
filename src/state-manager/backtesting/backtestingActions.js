import backtestingService from "../../app/services/backtestingService"
import { fetchBacktesting } from "./backtestingSlice"

export const fetchBacktestingAction = (userId, abbreviation) => {
    return (async (dispatch) => {
        try {
            const backtestingData = await backtestingService.getUsersActiveBacktestingOnASpecificAsset(userId, abbreviation)

            if (backtestingData) {
                dispatch(fetchBacktesting(backtestingData.data.getUsersActiveBacktestingOnASpecificAsset))
            }
        } catch (error) {
            // console.log('Блин блинушки нет такого')
        }
    })
}

export const createNewBacktesting = ({ balance, startDate, endDate, userId, abbreviation }) => {
    return(async (dispatch) => {
        try {
            const backtestingData = await backtestingService.createBacktesting(balance, startDate, endDate, userId, abbreviation)

            if (backtestingData) {
                dispatch(fetchBacktesting(backtestingData.createBacktesting))
            }
        } catch (error) {
            throw new Error(error)
        }
    })
}