import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import assetsReducer from './assets/assetsSlice'
import assetTypesReducer from "./assetTypes/assetTypesSlice";
import selectPanelReducer from "./selectPanel/selectPanelSlice";
import { cryptoApi } from "./cryptoAPI/cryptoAPI";
import usersReducer from "./users/usersSlice";
import trendlineReducer from "./trendline/trendlineSlice";
import choosenAssetReducer from "./choosenAsset/choosenAssetSlice";
import fibbonaciReducer from "./fibonacci/fibonacciSlice"
import interactiveTextReducer from "./interactiveText/interactiveTextSlice";
import { cryptoNewsApi } from "./cryptoAPI/cryptoNewsApi";
import paginationReducer from "./pagination/paginationSlice";
import buyOrdersReducer from "./buyOrders/buyOrdersSlice"
import backtestingReducer from './backtesting/backtestingSlice'
import choosenColorReducer from './choosenColor/choosenColorSlice'

const loggerMiddleware = createLogger()

export const store = configureStore({
    reducer: {
        assets: assetsReducer,
        assetTypes: assetTypesReducer,
        selectPanel: selectPanelReducer,
        users: usersReducer,
        trendline: trendlineReducer,
        fibbonaci: fibbonaciReducer,
        interactiveText: interactiveTextReducer,
        choosenAsset: choosenAssetReducer,
        pagination: paginationReducer,
        buyOrders: buyOrdersReducer,
        backtesting: backtestingReducer,
        choosenColor: choosenColorReducer,
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ thunk: true })
            // .concat(loggerMiddleware)
            .concat(cryptoApi.middleware)
            .concat(cryptoNewsApi.middleware)
    }
})