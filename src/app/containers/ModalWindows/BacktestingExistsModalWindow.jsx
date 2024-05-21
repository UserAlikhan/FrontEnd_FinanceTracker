import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { disableBacktestingExistsModalWindow, enableBacktestingModalWindow } from '../../../state-manager/backtesting/backtestingSlice'
import { fetchBacktestingAction } from '../../../state-manager/backtesting/backtestingActions'
import { fetchBuyOrdersAction, fetchClosedByStopLossOrders, fetchClosedByTakeProfitOrders } from '../../../state-manager/buyOrders/buyOrdersActions'

const BacktestingExistsModalWindow = () => {

    const backtesting = useSelector((state) => state.backtesting)
    const user = useSelector((state) => state.users)
    const choosenAsset = useSelector((state) => state.choosenAsset)

    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(disableBacktestingExistsModalWindow())
    }

    const handleStartNewSession = () => {
        dispatch(disableBacktestingExistsModalWindow())
        dispatch(enableBacktestingModalWindow())
    }

    const handleOnContinueExistingSession = () => {
        dispatch(fetchBacktestingAction(user?.usersInfo?.sub, choosenAsset?.choosenAsset))
        dispatch(disableBacktestingExistsModalWindow())
        // dispatch(fetchBuyOrdersAction(user?.usersInfo?.sub, choosenAsset?.choosenAsset, backtesting?.backtestingInfo?._id))
        dispatch(fetchClosedByTakeProfitOrders(user?.usersInfo?.sub, choosenAsset?.choosenAsset, backtesting?.backtestingInfo?._id))
        dispatch(fetchClosedByStopLossOrders(user?.usersInfo?.sub, choosenAsset?.choosenAsset, backtesting?.backtestingInfo?._id))
    }

    return (
        <>
        { backtesting.showModalExistingBacktesting && (
            <>
                <div id="sessionModal" className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="modal-content-session bg-[#818cf8] text-white p-10 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-5">Backtest Configuration</h2>
                        <p className="mb-5">Backtest with the specified asset already exists:</p>
                        <ul className="info space-y-2">
                        <li className="flex justify-between">
                            <strong>Balance:</strong>
                            <span>{backtesting.backtestingInfo.balance}</span>
                        </li>
                        <li className="flex justify-between">
                            <strong>Asset abbreviation:</strong>
                            <span>{choosenAsset?.choosenAsset}</span>
                        </li>
                        <li className="flex justify-between">
                            <strong>Start Date:</strong>
                            <span>{backtesting?.backtestingInfo?.startDate}</span>
                        </li>
                        <li className="flex justify-between">
                            <strong>End Date:</strong>
                            <span>{backtesting?.backtestingInfo?.endDate}</span>
                        </li>
                        </ul>
                        <div className="button-group flex justify-center mt-10 space-x-4">
                            <button id="continue-btn" onClick={handleOnContinueExistingSession} className="bg-white text-[#818cf8] px-5 py-2 rounded-lg">
                                Continue Session
                            </button>
                            <button id="new-btn" onClick={handleStartNewSession} className="bg-white text-[#818cf8] px-5 py-2 rounded-lg">
                                Start New Session
                            </button>
                            <button id="cancel-session-btn" onClick={handleClose} className="bg-white text-[#818cf8] px-5 py-2 rounded-lg">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </>
        ) }
        </>
    )
}

export default BacktestingExistsModalWindow