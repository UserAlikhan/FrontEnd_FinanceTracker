import React, { useState } from 'react'

function DetailsPageSelectTimeFrame() {
    const [selectedTimeFrame, setSelectedTimeFrame] = useState('1D')
    
    const handleTimeFrameChange = (e) => {
        setSelectedTimeFrame(e.target.value)
    }
    return (
        <div className='px-12 py-4'>
            <div className='relative inline-block text-left'>
                <select
                    value={selectedTimeFrame}
                    onChange={handleTimeFrameChange}
                    className=' block appearance-none w-full bg-white border 
                    border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 
                    rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                >
                    <option value="1D">1D</option>
                    <option value="7D">7D</option>
                    <option value="1M">1M</option>
                    <option value="3M">3M</option>
                    <option value="6M">6M</option>
                    <option value="1Y">1Y</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.293 6.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L10 9.414V15a1 1 0 1 1-2 0V9.414L6.293 11.707a1 1 0 1 1-1.414-1.414l4-4z"
                        />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default DetailsPageSelectTimeFrame