import React from 'react'
import { fetchBacktestingAction } from '../../../../state-manager/backtesting/backtestingActions';
import { useDispatch, useSelector } from 'react-redux';
import { enableBacktestingExistsModalWindow, enableBacktestingModalWindow } from '../../../../state-manager/backtesting/backtestingSlice';
import { checkBacktestingForSpecificUserAndAssetExists } from '../../../helper/checkBacktestingForSpecificUserAndAssetExists';

const OrderPlacePanel = () => {
  
  const users = useSelector((state) => state.users)
  const choosenAsset = useSelector((state) => state.choosenAsset)
  const backtesting = useSelector((state) => state.backtesting)

  const dispatch = useDispatch()

  const pairOptions = [
    { value: 'BTC-USD', label: 'BTC-USD' },
    { value: 'ETH-USD', label: 'ETH-USD' },
    { value: 'LTC-USD', label: 'LTC-USD' },
  ];

  const timeframeOptions = [
    { value: '1D', label: '1D' },
    { value: '5D', label: '5D' },
    { value: '7D', label: '7D' },
  ];

  const handleBuyClick = async () => {
    if (!backtesting.backtestModeOn) {
      const backtestStatus = await checkBacktestingForSpecificUserAndAssetExists(users?.usersInfo?.sub, choosenAsset?.choosenAsset)
      // dispatch(fetchBacktestingAction(users?.usersInfo?.sub, choosenAsset?.choosenAsset))
      console.log('backtestStatus ', backtestStatus?.data?.getUsersActiveBacktestingOnASpecificAsset)
      if (!backtestStatus) dispatch(enableBacktestingModalWindow())
      else if (backtestStatus?.data) dispatch(enableBacktestingExistsModalWindow(backtestStatus?.data?.getUsersActiveBacktestingOnASpecificAsset))
    } else {
      console.log('You are in backtest mode')
    }
  }

  return (
    <div className="flex justify-between items-center w-full h-16 px-7 bg-gray-200 rounded-md">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="font-medium">Pair:</span>
          <select className="px-2 py-1 border border-gray-300 rounded-md">
            {pairOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-medium">Timeframe:</span>
          <select className="px-2 py-1 border border-gray-300 rounded-md">
            {timeframeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex space-x-2">
        <button className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={handleBuyClick}>Buy</button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-md">Sell</button>
        <button className="px-4 py-2 bg-gray-400 text-white rounded-md">Cancel</button>
      </div>
    </div>
  );
}

export default OrderPlacePanel