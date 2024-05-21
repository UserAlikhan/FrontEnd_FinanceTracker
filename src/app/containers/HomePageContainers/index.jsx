import React, { useEffect, useState } from 'react'
import { fetchAssets } from '../../../state-manager/assets/assetsActions'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllAssetTypes } from '../../../state-manager/assetTypes/assetTypesActions'
import AssetTypesContainer from '../AssetTypesContainers'
import CardForAsset from '../AssetsContainers/CardForAsset'
import { useGetCryptosQuery } from '../../../state-manager/cryptoAPI/cryptoAPI'
import { usersSlicer } from '../../../state-manager/users/usersSlice'
import { decodeToken } from '../../helper/decodeToken'


function HomePage() {
    const dispatch = useDispatch()
    const {data: cryptosList, isFetching} = useGetCryptosQuery(12)

    useEffect(() => {
        dispatch(fetchAssets(10, 0))
        dispatch(fetchAllAssetTypes(10, 0))

        dispatch(usersSlicer(decodeToken())) 
    }, [dispatch])

    const assets = useSelector(state => state.assets)

    return (
        <AssetTypesContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 w-full h-full">
                { isFetching 
                    ? <h2 className=' text-xl'>Loading...</h2> 
                    : cryptosList?.data?.coins?.map((coin) => {
                        return (
                            <CardForAsset asset={coin && coin}/>
                        )
                    })
                }
            </div>
        </AssetTypesContainer>
    )
}

export default HomePage