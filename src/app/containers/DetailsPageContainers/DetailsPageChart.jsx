import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from "chart.js/auto"; // don`t delete
import { useSelector } from 'react-redux';

function DetailsPageChart({ assetHistory, currentPrice, assetName }) {
    const assetPrice = []
    const assetTimestamp = []

    // const assetHistory = useSelector(state => state.cryptoApi?.queries?.['getCryptoHistory({"coinId":"razxDUgYGNAdQ","timePeriod":"24h"})'])
    // if (assetHistory) {
    //     console.log('assetHistory ', assetHistory['getCryptoHistory({"coinId":"razxDUgYGNAdQ","timePeriod":"24h"})'])
    // }

    for (let i=0; i < assetHistory?.data?.history?.length; i+=1) {
        assetPrice.push(assetHistory?.data?.history[i].price)
    }

    for (let i = 0; i < assetHistory?.data?.history?.length; i += 1) {
        assetTimestamp.push(new Date(assetHistory?.data?.history[i].timestamp).toLocaleDateString());
    }

    const data = {
        labels: assetTimestamp,
        datasets: [
          {
            label: 'Price In USD',
            data: assetPrice,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
          },
        ],
      };
    
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='flex flex-row w-full justify-between items-center px-12 py-2'>
                <h2 className='text-3xl text-blue-800 font-bold'>{assetName} Price Chart</h2>
                <div className='flex flex-row justify-center items-center'>
                    <h2 className='text-xl font-bold text-black'>Change: {assetHistory?.data?.change}%</h2>
                    <h2 className='text-xl font-bold text-black'>Current {assetName} Price: $ {currentPrice}%</h2>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center px-2 py-3 w-3/4 h-1/4'>
                <Line data={data} options={options} />
            </div>
        </div>
    )
}

export default DetailsPageChart