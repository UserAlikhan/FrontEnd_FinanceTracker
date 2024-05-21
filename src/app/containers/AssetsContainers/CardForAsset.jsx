import React from 'react'
import { Chart as ChartJS } from "chart.js/auto"; // don`t delete
import { Line } from 'react-chartjs-2'
import { useSelector } from 'react-redux';
import { MoveDownLeft, MoveUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function CardForAsset({ asset }) {
    const crypto = useSelector(state => state.cryptoApi)

    const options = {
        plugins:{
            legend: {
                labels: {
                    boxWidth: 0
                },
            },
        },
        scales: {
            x: {
                border: {
                    display:false
                },
                ticks: {
                    display: false,
                },            
                grid: {
                    drawBorder: false,
                    display: false      
                }
            },
            y: {
                scaleLabel: {
                    display: true,
                    labelString: "Current Price",
                    fontColor: "rgba(32, 235, 0, 1)",
                },
                border: {
                    display:false
                },
                // ticks: {
                //     display: false,
                // },
                grid: {
                    drawBorder: false,
                    display: false      
                }
            }
        }
    }
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: '',
            data: asset.sparkline,
            fill: true,
            backgroundColor: asset.change > 0 ? "rgba(32, 235, 0, 0.2)" : "rgba(255, 0, 0, 0.2)",
            borderColor: asset.change > 0 ? "rgba(32, 235, 0, 1)" : "rgba(255, 0, 0, 0.1)"
          }
        ]
    }

    return (
        <div key={asset.uuid} className='flex justify-center items-center w-full h-full pb-2'>
            {/* Card container */}
            <div className='flex flex-col justify-between w-80 h-max p-2 bg-white rounded-xl'>
                {/* Asset information */}
                <div className='flex flex-row justify-around items-center'>
                    <img className='h-10 w-10 object-cover rounded-lg' src={asset.iconUrl} alt='Asset Icon' />
                    <div className='flex flex-col justify-start items-start'>
                        <h2 className={`font-bold text-black ${
                            asset.name.length > 9 ? "text-sm" : "text-3xl"
                        }`}>
                            <Link key={asset.uuid} to={`/details/${asset.uuid}`}>
                                {asset.name}
                            </Link>
                        </h2>
                        <h2 className='text-xl font-medium text-zinc-500'>{asset.symbol}</h2>
                    </div>
                    <div className='flex flex-col justify-end items-center'>
                        <h4 className={`text-xl font-medium text-black ${
                            asset.change > 0 ? " text-green-600" : " text-red-600"
                        }`}>{parseFloat(asset.price).toFixed(2)} $</h4>
                        <h4 className=' text-sm font-medium text-black'>
                            {parseFloat(asset.marketCap).toFixed(2)}.T $
                        </h4>
                    </div>
                </div>

                {/* Chart section */}
                <div className='w-full h-40 my-1'>
                    <div className=' flex flex-row justify-between'>
                        <div className='flex flex-row justify-center items-center px-1'>
                            <h4 className={` text-lg ${
                                asset.change > 0 ? " text-green-600" : " text-red-600"
                            }`}>
                                Change {asset.change}%
                            </h4>
                            <div>
                                {asset.change > 0 ? <MoveUpRight size={22} color='green' fill='green'/> : <MoveDownLeft size={22} color='red' fill='red' />}
                            </div>
                        </div>
                        <div className='flex flex-row w-full h-1/5 justify-end items-center'>
                            <button className='px-1 py-0 rounded-md bg-gray-200 hover:bg-gray-400 mx-1 mt-1 opacity-85'>1H</button>
                            <button className='px-1 py-0 rounded-md bg-gray-200 hover:bg-gray-400 mx-1 mt-1 opacity-85'>4H</button>
                            <button className='px-1 py-0 rounded-md bg-gray-200 hover:bg-gray-400 mx-1 mt-1 opacity-85'>1D</button>
                            <button className='px-1 py-0 rounded-md bg-gray-200 hover:bg-gray-400 mx-1 mt-1 opacity-85'>7D</button>
                            <button className='px-1 py-0 rounded-md bg-gray-200 hover:bg-gray-400 mx-1 mt-1 opacity-85'>1M</button>
                        </div>
                    </div>
                    <Line data={data} options={options} className='w-full h-max pb-12'/>
                </div>

                {/* Action buttons */}
                <div className='flex flex-row justify-between items-center'>
                    <button className='w-1/2 p-1.5 rounded-lg bg-purple-300 hover:bg-purple-500 mx-1'>
                        <Link key={asset.uuid} to={`/details/${asset.uuid}`}>
                            Explore
                        </Link>
                    </button>
                    <button className='w-1/2 p-1.5 rounded-lg bg-purple-300 hover:bg-purple-500 mx-1'>
                        <Link key={asset.uuid} to={`/trade/${asset.symbol}`}>
                            Trade
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CardForAsset