import React from 'react'
import StatsSection from '../StatisticComponents/StatsSection';
import { BadgeDollarSign, BarChart3, Container, Database, Layers, Signal, Store, Target, Trophy, Zap } from 'lucide-react';

function DetailPageStatistics({ assetDetails }) {
    console.log('assetDetails ', assetDetails)
    const stats = [
        { title: 'Price to USD', value: `$ ${assetDetails?.price && parseFloat(assetDetails?.price).toFixed(4)}`, icon: <BadgeDollarSign/> },
        { title: 'Rank', value: assetDetails?.rank, icon: <Trophy /> },
        { title: '24h Volume', value: `$ ${assetDetails?.volume && parseFloat(assetDetails?.volume).toFixed(4)}`, icon: <Signal/> },
        { title: 'Market Cap', value: `$ ${assetDetails?.marketCap && parseFloat(assetDetails?.marketCap).toFixed(4)}`, icon: <BarChart3 /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${assetDetails?.allTimeHigh?.price && parseFloat(assetDetails?.allTimeHigh?.price).toFixed(4)}`, icon: <Target /> },
    ];
    
    const genericStats = [
        { title: 'Number Of Markets', value: assetDetails?.numberOfMarkets, icon: <Store /> },
        { title: 'Number Of Exchanges', value: assetDetails?.numberOfExchanges, icon: <Database /> },
        { title: 'Approved Supply', value: parseFloat(assetDetails?.approvedSupply).toFixed(4), icon: <Zap /> },
        { title: 'Total Supply', value: parseFloat(assetDetails?.totalSupply).toFixed(4), icon: <Container /> },
        { title: 'Circulating Supply', value: parseFloat(assetDetails?.circulatingSupply).toFixed(4), icon: <Layers />},
    ];

    return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{assetDetails?.name} ({assetDetails?.symbol}) Details</h1>
      
      {/* stats */}
      <StatsSection title="Important Stats" stats={stats} />
      
      {/* genericStats */}
      <StatsSection title="Generic Stats" stats={genericStats} />
    </div>
  );
}

export default DetailPageStatistics