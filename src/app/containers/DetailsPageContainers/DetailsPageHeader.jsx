import React from 'react'

function DetailsPageHeader({ assetName, assetSymbol }) {
  return (
    <div className='flex flex-col justify-center items-center px-4 py-2 mt-25'>
        <div className='flex flex-col justify-center items-center'>
            <h2 className=' text-3xl text-blue-800 font-bold'>{assetName} ({assetSymbol}) Price</h2>
            <h4 className=' text-lg text-gray-500 font-normal'>{assetName} live price in US Dollar (USD). View value statistics, market cap and supply</h4>
        </div>
        <hr className=' w-full px-2 border-gray-300 mt-4' />
    </div>
  )
}

export default DetailsPageHeader