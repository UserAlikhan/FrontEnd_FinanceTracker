import React, { useState } from 'react'
import AssetTypesContainer from '../AssetTypesContainers'
import CardForAsset from '../AssetsContainers/CardForAsset'
import { useSelector } from 'react-redux'
import PaginationCrypto from './PaginationCrypto'
import { useGetCryptosQuery } from '../../../state-manager/cryptoAPI/cryptoAPI'

function CryptoPageMainContainer() {

    const [searchTerm, setSearchTerm] = useState('')
    
    const pagination = useSelector((state) => state.pagination)
    const {data: cryptosList, isFetching} = useGetCryptosQuery(100)

    const itemsPerPage = 12
    const startIndex = (pagination.cryptoPagination - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    // filter cryptoList based on search term
    const filteredCryptoList = cryptosList?.data?.coins?.filter((coin) => {
        return coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    })

    const currentPageItems = filteredCryptoList?.slice(startIndex, endIndex)

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    return (
        <AssetTypesContainer>
            <div className="flex flex-col justify-between w-full h-full">
                <div className="flex items-center justify-center mb-4">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="px-4 py-2 border rounded-md"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 w-full h-full">
                    { isFetching 
                        ? <h2 className=' text-xl'>Loading...</h2> 
                        : currentPageItems?.map((coin) => {
                            return (
                                <CardForAsset asset={coin && coin}/>
                            )
                        })
                    }
                </div>
                <div className='flex justify-center items-center'>
                    <PaginationCrypto />
                </div>
            </div>
        </AssetTypesContainer>
    )
}

export default CryptoPageMainContainer