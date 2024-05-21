import { assetTypesFetched, assetTypesFetchedWithError } from "../assetTypes/assetTypesSlice"
import { useGetCryptosQuery } from "./cryptoAPI"

export const fetchCryptos = (count=15) => {
    const cryptoList = useGetCryptosQuery(count)
    console.log('cryptoList ', cryptoList)
    return (async (dispatch) => {
        try{
            if (cryptoList.data.coins) {
                dispatch(assetTypesFetched(cryptoList.data.coins))
            }
        } catch (error) {
            dispatch(assetTypesFetchedWithError(error))
            throw new Error(error)
        }
    })
}