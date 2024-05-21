import React from "react";
import HomePage from "./app/containers/HomePageContainers";
import { Routes, Route } from 'react-router-dom';
import DetailsPageMainContainer from "./app/containers/DetailsPageContainers";
import RegistrationPage from "./app/containers/RegistrationContainers/RegistrationPage";
import LoginPage from "./app/containers/LoginContainers/LoginPage";
import ChartComponent from './app/containers/StockChartContainers/index'
import NewsContainerMainComponent from "./app/containers/NewsContainers";
import CryptoPageMainContainer from "./app/containers/CryptoPageContainers";

const App = () => {
    return (
        <Routes>
            <Route path="/"element={<HomePage />} />
            <Route path='/details/:assetId' element={<DetailsPageMainContainer />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />}/>
            <Route path="/trade/:abbreviation" element={<ChartComponent />} />
            <Route path="/news" element={<NewsContainerMainComponent />}/>
            <Route path="/cryptocurrencies" element={<CryptoPageMainContainer />}/>
        </Routes>
    )
}

export default App