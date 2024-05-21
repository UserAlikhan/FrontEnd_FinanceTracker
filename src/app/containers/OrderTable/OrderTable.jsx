import React, {useState} from "react";
import { useSelector } from "react-redux";

const OrderTable = () => {
    const buyOrders = useSelector((state) => state.buyOrders)
    const choosenAsset = useSelector((state) => state.choosenAsset)

    const [activeTab, setActiveTab] = useState('Active Orders')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 2
    
    const tabs = ['Active Orders', 'Closed by Take Profit', 'Closed by Stop Loss']

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = activeTab === 'Active Orders'
        ? buyOrders.buyOrdersList_1.slice(indexOfFirstItem, indexOfLastItem)
        : activeTab === 'Closed by Take Profit'
            ? buyOrders.ordersClosedByTakeProfit.slice(indexOfFirstItem, indexOfLastItem)
            : activeTab === 'Closed by Stop Loss'
                ? buyOrders.ordersClosedByStopLoss.slice(indexOfFirstItem, indexOfLastItem)
                : [];
    console.log('currentItems ', currentItems)
    // Pagination logic
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div className="p-6 w-full h-max mx-auto bg-[#e5e7eb] rounded-md shadow-md">
            <div className="flex justify-between items-center mb-4 w-full">
                <div className="flex justify-center">
                    {Array.from(Array(Math.ceil(
                        activeTab === 'Closed by Take Profit' 
                            ? buyOrders.ordersClosedByTakeProfit.length / itemsPerPage
                            : activeTab === 'Closed by Stop Loss'
                                ? buyOrders.ordersClosedByStopLoss.length / itemsPerPage
                                : []
                        )).keys()).map(
                        (number) => (
                            <button
                                key={number}
                                className={`px-4 py-2 rounded-md ${
                                    currentPage === number + 1 ? "bg-[#818cf8] text-white" : "bg-white text-[#818cf8]"
                                }`}
                                onClick={() => paginate(number + 1)}
                            >
                                {number + 1}
                            </button>
                        )
                    )}
                </div>
                <div className="flex flex-row mr-2">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 rounded-md ${
                            activeTab === tab
                                ? 'bg-[#818cf8] text-white'
                                : 'bg-white text-[#818cf8]'
                            }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <table className="w-full text-left divide-y divide-[#818cf8] justify-center items-center">
                <thead className="bg-white">
                    <tr>
                        <th className="px-6 py-3 text-xs font-medium text-[#818cf8] uppercase tracking-wider">
                            Asset Name
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-[#818cf8] uppercase tracking-wider">
                            Enter Price
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-[#818cf8] uppercase tracking-wider">
                            Close Price
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-[#818cf8] uppercase tracking-wider">
                            Margin
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-[#818cf8] uppercase tracking-wider">
                            Exit Type
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-[#818cf8] uppercase tracking-wider">
                            Win Rate Percentage
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-[#818cf8] uppercase tracking-wider">
                            Win Rate in USD
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-[#818cf8] uppercase tracking-wider">
                            Details
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#818cf8]">
                    { currentItems?.map((order, index) => {
                        return (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{choosenAsset.choosenAsset}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{order.openPrice}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{order.closePrice}</td>
                                <td className="px-6 py-4 whitespace-nowrap">20</td>
                                <td className="px-6 py-4 whitespace-nowrap">{order.orderCloseType}</td>
                                <td className="px-6 py-4 whitespace-nowrap">17%</td>
                                <td className="px-6 py-4 whitespace-nowrap">12$</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button className="px-4 py-2 bg-[#818cf8] text-white rounded-md">Details</button>
                                </td>
                            </tr>
                        )
                    }) }
                </tbody>
            </table>
        </div>
    )
}

export default OrderTable