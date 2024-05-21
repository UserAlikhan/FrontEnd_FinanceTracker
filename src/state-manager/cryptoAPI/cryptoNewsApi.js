import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
    'X-RapidAPI-Key': '10945e0475msh6ddc41ee9afb47fp1e3473jsn34f4dd5f3052',
    'X-RapidAPI-Host': 'seeking-alpha.p.rapidapi.com'
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