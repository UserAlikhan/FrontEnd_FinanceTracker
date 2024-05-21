import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNewBacktesting } from '../../../state-manager/backtesting/backtestingActions'
import { disableBacktestingModalWindow } from '../../../state-manager/backtesting/backtestingSlice'

const BacktestingModalWindow = () => {

    const user = useSelector((state) => state.users)
    const choosenAsset = useSelector((state) => state.choosenAsset)
    const backtesting = useSelector((state) => state.backtesting)
    
    const dispatch = useDispatch()

    const [newSessionInfo, setNewSessionInfo] = useState({
        balance: 0.0,
        startDate: "",
        endDate: "",
        userId: user?.usersInfo?.sub,
        abbreviation: choosenAsset?.choosenAsset,
        status: "active"
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewSessionInfo((prevState) => ({
            ...prevState,
            [name]: name === 'balance' ? parseFloat(value) : value
        }))
    }

    const handleSave = async () => {
        try {
            dispatch(createNewBacktesting(newSessionInfo))
        } catch (error) {
            console.error("Error saving session data ", error)
        }
    }

    const handleClose = async () => {
        try {
            dispatch(disableBacktestingModalWindow())
        } catch (error) {
            console.error("Error closing modal window ", error)
        }
    }
    return (
        <>
            { backtesting.showModal && (
                <div
                id="backtestModal"
                className="fixed inset-0 z-10 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center"
              >
                <div className="bg-[#818cf8] text-white p-10 rounded-lg w-full max-w-xl">
                  <h2 className="text-xl font-semibold mb-5">Backtest Configuration</h2>
                  <div className="mb-5">
                    <label htmlFor="balance" className=" block mb-2">
                      Balance:
                    </label>
                    <input
                      type="number"
                      id="balance"
                      name="balance"
                      value={newSessionInfo.balance}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border rounded-lg bg-gray-100/10"
                    />
                  </div>
                  <div className="mb-5 flex flex-row justify-between">
                    <label htmlFor="pair" className=" block mb-2">
                      Choosen Asset:
                    </label>
                    <h3 className="text-lg">{newSessionInfo.abbreviation}</h3>
                  </div>
                  <div className="mb-5">
                    <label htmlFor="start-date" className=" block mb-2">
                      Start Date:
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={newSessionInfo.startDate}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border rounded-lg bg-gray-100/10"
                    />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="end-date" className=" block mb-2">
                      End Date:
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={newSessionInfo.endDate}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border rounded-lg bg-gray-100/10"
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      id="start-btn"
                      onClick={handleSave}
                      className="bg-white text-[#818cf8] px-5 py-2 rounded-lg mr-2"
                    >
                      Start
                    </button>
                    <button
                      id="cancel-btn"
                      onClick={handleClose}
                      className="bg-white text-[#818cf8] px-5 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) }
        </>
    )
}

export default BacktestingModalWindow