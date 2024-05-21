import assetTypesService from "../../app/services/assetTypesService"
import { assetTypesFetched, assetTypesFetchedWithError, assetTypesFetching } from "./assetTypesSlice"

export const fetchAllAssetTypes = (limit=10, skip=0) => {
    return (async (dispatch) => {
        dispatch(assetTypesFetching())

        try {
            const assetTypes = await assetTypesService.getAllAssetTypes(limit, skip)
                .catch((error) => {
                    dispatch(assetTypesFetchedWithError(error))
                    throw new Error(error)
                }
            )
            if (assetTypes) {
                dispatch(assetTypesFetched(assetTypes))
            }

        } catch (error) {
            dispatch(assetTypesFetchedWithError(error))
            throw new Error(error)
        }
    })
}