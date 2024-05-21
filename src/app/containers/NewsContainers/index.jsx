import React from 'react'
import NewsCard from './NewsCard'
import { useGetCryptoNewsQuery } from '../../../state-manager/cryptoAPI/cryptoNewsApi'
import AssetTypesContainer from '../AssetTypesContainers'
import PaginationNews from './PaginationNews'
import { useSelector } from 'react-redux'

function NewsContainerMainComponent() {
    const pagination = useSelector((state) => state.pagination)

    const { data: newsData, isFetching } = useGetCryptoNewsQuery({
        category: 'market-news::all',
        size: 15,
        number: String(pagination.newsPagination)
    })
    console.log('newsData ', newsData?.data)
    return (
        <AssetTypesContainer>
            <div className="flex flex-col justify-between">
                <div className="flex flex-wrap flex-grow">
                    {isFetching
                            ? <h2>Loading...</h2>
                            : newsData?.data?.map((news) => {
                            return (
                                <NewsCard
                                key={news?.id}
                                title={news?.attributes?.title}
                                published_at={news?.attributes?.publishOn}
                                content={news?.attributes?.content}
                                imageUrl={news?.links?.uriImage}
                                url={news?.links?.canonical}
                                />
                            )
                            })
                        }
                </div>
                <div className='flex justify-center items-center'>
                    <PaginationNews />
                </div>
            </div>
        </AssetTypesContainer>
    )
}

export default NewsContainerMainComponent