import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import usersReducer from "./users/reducers/usersReducer";
import apiUsersReducer from "./users/reducers/apiUsersReducer";
import assetsReducer from '../state-manager/assets/assetsSlice'

const loggerMiddleware = createLogger()

export const store = configureStore({
    reducer: {
        assets: assetsReducer,
        users: usersReducer,
        apiUsers: apiUsersReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ thunk: true })
            .concat(loggerMiddleware)
    }
})