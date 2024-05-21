import assetsService from "../../app/services/assetsService"
import { assetsFetched, assetsFetchedWithError, assetsFetching } from "./assetsSlice"

export const fetchAssets = (limit=10, skip=0) => {
    return (async dispatch => {
        dispatch(assetsFetching())

        try{
            const assets = await assetsService.getAllAssets(limit, skip)
                .catch((error) => {
                    dispatch(assetsFetchedWithError(error))
                    throw new Error(error)
                }
            )
            if (assets) {
                dispatch(assetsFetched(assets))
            }

        } catch (error) {
            dispatch(assetsFetchedWithError(error))
            throw new Error(error)
        }
    })
}