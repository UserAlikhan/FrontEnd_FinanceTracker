import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
    'X-RapidAPI-Key': 'API_KEY',
    'X-RapidAPI-Host': 'API_HOST'
}

const baseUrl = 'https://seeking-alpha.p.rapidapi.com'

const createRequest = (url, params) => ({ url: `${url}?${new URLSearchParams(params).toString()}`, headers: cryptoNewsHeaders })

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: (params) => createRequest(`/news/v2/list`, params)
        })
    })
})

export const {
    useGetCryptoNewsQuery,
} = cryptoNewsApi
