// export function checkAndRemoveOrders(state, lastPrice) {
//     const removedOrders = [];

//     state.buyOrdersList_1.map((order) => {
//         const isTakeProfit = order.text.includes('Take_Profit');
//         const isStopLoss = order.text.includes('Stop_Loss');

//         if (isTakeProfit && lastPrice >= order.yValue) {
//             console.log('isTakeProfit ', isTakeProfit)
//             console.log('order ', order)
//             console.log('TAKE PROFIT')
//             const filteredData = state.buyOrdersList_1.filter((buyOrder) => buyOrder.text.split(' ')[1] === order.text.split(' ')[1])
//             const objIndex = Math.floor(filteredData.findIndex((each) => each.text === order.text))
//             console.log('objIndex', objIndex)
//             console.log('state ', state.idx_buyOrders_1[objIndex])
//             console.log('slice ', state.buyOrdersList_1.slice(filteredData))

//             removedOrders.push({
//                 lable: 'Take_Profit',
//                 id: state.idx_buyOrders_1[objIndex],
//                 objectBody: state.buyOrdersList_1.filter((element, index) => element === filteredData[index] )
//             })
//             return false
//         } 
        
//         if (isStopLoss && lastPrice <= order.yValue) {
//             console.log('STOP LOSS')
//             const filteredData = state.buyOrdersList_1.filter((buyOrder) => buyOrder.text.split(' ')[1] === order.text.split(' ')[1])
//             const objIndex = Math.floor(filteredData.findIndex((each) => each.text === order.text))
//             console.log('objIndex', objIndex)

//             removedOrders.push({
//                 lable: 'Stop_Loss',
//                 id: state.idx_buyOrders_1[objIndex],
//                 objectBody: state.buyOrdersList_1.filter((element, index) => element === filteredData[index] )
//             })
//             return false
//         }
//         return true
//     })
//     // console.log('removedOrders ', removedOrders)
//     return removedOrders
// }

// export function checkAndRemoveOrders(state, lastPrice) {
//     const removedOrders = [];

//     state.buyOrdersList_1.map((order) => {
//         const isTakeProfit = order.text.includes('Take_Profit');
//         const isStopLoss = order.text.includes('Stop_Loss');

//         if (isTakeProfit && lastPrice >= order.yValue) {
//             const filteredData = state.buyOrdersList_1.filter((buyOrder) => buyOrder.text.split(' ')[1] === order.text.split(' ')[1])
//             const objIndex = Math.floor(filteredData.findIndex((each) => each.text === order.text))

//             removedOrders.push({
//                 lable: 'Take_Profit',
//                 id: state.idx_buyOrders_1[objIndex],
//                 objectBody: state.buyOrdersList_1.filter((element, index) => element === filteredData[index] )
//             })
//             return false
//         } 
        
//         if (isStopLoss && lastPrice <= order.yValue) {
//             const filteredData = state.buyOrdersList_1.filter((buyOrder) => buyOrder.text.split(' ')[1] === order.text.split(' ')[1])
//             const objIndex = Math.floor(filteredData.findIndex((each) => each.text === order.text))

//             removedOrders.push({
//                 lable: 'Stop_Loss',
//                 id: state.idx_buyOrders_1[objIndex],
//                 objectBody: state.buyOrdersList_1.filter((element, index) => element === filteredData[index] )
//             })
//             return false
//         }
//         return true
//     })
//     return removedOrders
// }

export function checkAndRemoveOrders(state, lastPrice) {
    const removedOrders = [];
  
    state.buyOrdersList_1.filter((order) => {
      const isTakeProfit = order.text.includes('Take_Profit');
      const isStopLoss = order.text.includes('Stop_Loss');
  
      if (isTakeProfit && lastPrice >= order.yValue) {
        const filteredData = state.buyOrdersList_1.filter((buyOrder) => buyOrder.text.split(' ')[1] === order.text.split(' ')[1]);
        const objIndex = Math.floor(state.buyOrdersList_1.findIndex((each) => each.text === order.text) / 3);
        console.log('objIndex ', objIndex)
        removedOrders.push({
          lable: 'Take_Profit',
          id: state.idx_buyOrders_1[objIndex],
          objectBody: filteredData,
        });
  
        return false;
      }
  
      if (isStopLoss && lastPrice <= order.yValue) {
        const filteredData = state.buyOrdersList_1.filter((buyOrder) => buyOrder.text.split(' ')[1] === order.text.split(' ')[1]);
        const objIndex = Math.floor(state.buyOrdersList_1.findIndex((each) => each.text === order.text) / 3);
        console.log('objIndex ', objIndex)
        removedOrders.push({
          lable: 'Stop_Loss',
          id: state.idx_buyOrders_1[objIndex],
          objectBody: filteredData,
        });
  
        return false;
      }
  
      return true;
    });
  
    return removedOrders;
}
  