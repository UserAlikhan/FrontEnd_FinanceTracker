import { combineReducers } from "@reduxjs/toolkit";
import assetReducer from "./assets/reducers/assetReducer";
import usersReducer from "./users/reducers/usersReducer";

const rootReducer = combineReducers({
    assets: assetReducer,
    users: usersReducer
})

export default rootReducer