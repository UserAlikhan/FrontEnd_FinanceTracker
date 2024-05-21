import React, { useEffect, useState } from 'react'
import DetailsPageSelectTimeFrame from './DetailsPageSelectTimeFrame'
import DetailsPageChart from './DetailsPageChart'
import DetailsPageHeader from './DetailsPageHeader'
import DetailPageStatistics from './DetailPageStatistics'
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../../../state-manager/cryptoAPI/cryptoAPI'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function DetailsPageMainContainer() {

    const { assetId } = useParams()
    const [assetDetails, setAssetDetails] = useState([])
    // const { data: coinDetails, isFetchingDetails } = useGetCryptoDetailsQuery(assetId)
    const { data: assetHistory, isFetchingHistory } = useGetCryptoHistoryQuery({ coinId: assetId, timePeriod: '24h' })
    // console.log('assetId ', assetId)
    // console.log('coinDetails ', coinDetails?.data)
    console.log('assetHistory ', assetHistory?.data)  
    
    const fetchDataFromAPI = async () => {
        try {
            console.log('try')
            const response = await axios.get(`http://localhost:3000/read-file`, { params: { filename: assetId } })
            console.log('response readfile ', response.data)
            if(response.data !== null && typeof response.data !== 'undefined') {
                console.log('no such file')
                setAssetDetails(response.data)
            }
        } catch(err) {
            console.log('catch')

            const response = await axios.get(`https://coinranking1.p.rapidapi.com/coin/${assetId}`,
                {
                    params: {
                    referenceCurrencyUuid: assetId,
                    timePeriod: '24h'
                    },
                    headers: {
                    'X-RapidAPI-Key': '10945e0475msh6ddc41ee9afb47fp1e3473jsn34f4dd5f3052',
                    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
                    }
                }
            )

            if (response.status === 200) {
                console.log('There are some coinDetails')

                const apiData = response.data
                await axios.post('http://localhost:3000/write-file', { content: JSON.stringify(apiData), fileName: assetId })

                setAssetDetails(response.data)
            } else {
                console.error('Failed to fetch data from API!!!')
            }
        }
    }

    useEffect(() => {
        fetchDataFromAPI()
    }, [assetId])

    console.log('assetDetails ', assetDetails)

    return (
        <>
            <DetailsPageHeader assetName={assetDetails?.data?.coin?.name} assetSymbol={assetDetails?.data?.coin?.symbol}/>
            <DetailsPageSelectTimeFrame/>
            <DetailsPageChart assetHistory={assetHistory} currentPrice={56000} assetName={assetDetails?.data?.coin?.symbol}/>
            <DetailPageStatistics assetDetails={assetDetails?.data?.coin}/>
        </>
    )
}

export default DetailsPageMainContainer