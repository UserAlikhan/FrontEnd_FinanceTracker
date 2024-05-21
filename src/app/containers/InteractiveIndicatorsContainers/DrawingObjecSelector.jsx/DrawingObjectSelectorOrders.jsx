import React from 'react'
import { getInteractiveNodes } from '../interactiveutils';
import { head, toObject } from 'react-stockcharts/lib/utils';
import { getMorePropsForChart } from 'react-stockcharts/lib/interactive/utils';
import { round } from '../../../helper/round';
import { DrawingObjectSelector, InteractiveYCoordinate } from 'react-stockcharts/lib/interactive';
import shortid from 'shortid';
import { updateBuyOrdersAction } from '../../../../state-manager/buyOrders/buyOrdersActions';
import { connect } from 'react-redux';
import { enableBuyOrdersModalWindow, setNewBuyOrder } from '../../../../state-manager/buyOrders/buyOrdersSlice';
import { calculateTakeProfit } from '../../../helper/calculateTakeProfit';
import { calculateStopLoss } from '../../../helper/calculateStopLoss';

const buy = {
	...InteractiveYCoordinate.defaultProps.defaultPriceCoordinate,
	stroke: "#1F9D55",
	textFill: "#1F9D55",
	text: "Take Profit",
	edge: {
		...InteractiveYCoordinate.defaultProps.defaultPriceCoordinate.edge,
		stroke: "#1F9D55"
	}
}
const sell = {
	...InteractiveYCoordinate.defaultProps.defaultPriceCoordinate,
	stroke: "#E3342F",
	textFill: "#E3342F",
	text: "Stop Loss",
	edge: {
		...InteractiveYCoordinate.defaultProps.defaultPriceCoordinate.edge,
		stroke: "#E3342F"
	}
};

class DrawingObjectSelectorOrders extends React.Component{
    constructor(props) {
        super(props)

        this.getInteractiveNodes = getInteractiveNodes.bind(this)

        this.handleSelection = this.handleSelection.bind(this);
        this.handleChoosePosition = this.handleChoosePosition.bind(this);
        this.handleDoubleClickAlert = this.handleDoubleClickAlert.bind(this);
    }
    handleSelection(interactives, moreProps, e) {
        if (this.props.buyOrders.enableBuyOrders) {
            console.log('if')
            this.props.onSetNewBuyOrder()
            const independentCharts = moreProps.currentCharts.filter(d => d !== 2);
            if (independentCharts.length > 0) {
                const first = head(independentCharts)

                const morePropsForChart = getMorePropsForChart(moreProps, first)
                const {
					mouseXY: [, mouseY],
					chartConfig: { yScale },
				} = morePropsForChart;

                const yValue = round(yScale.invert(mouseY), 2)
                const labelNumber = this.props.buyOrders.buyOrdersList_1.length / 3
                console.log('labelNumber ', labelNumber)
                const newBuyOrder = {
                    ...InteractiveYCoordinate.defaultProps.defaultPriceCoordinate,
                    yValue: this.props.buyOrders.lastPrice,
                    id: shortid.generate(),
                    text: `Buy_Order ${labelNumber}`,
                    draggable: false
                }

                console.log('newBuyOrder ', newBuyOrder)
                this.handleChoosePosition(newBuyOrder, morePropsForChart, yValue, labelNumber, e);
            }
        } else {
            const state = toObject(interactives, each => {
				return [
					`yCoordinateList_${each.chartId}`,
					each.objects,
				];
			});
            console.log('state ', state)
        }
    }

    handleChoosePosition(order, moreProps, yValue, labelNumber) {
        // const { id: chartId } = moreProps.chartConfig;
        console.log('alert ', order, moreProps)
        console.log('this.props.backtesting', this.props.backtesting)
        const currentBuyOrders = this.props.buyOrders.buyOrdersList_1
        
        const newTakeProfit = {
            ...buy,
            yValue: calculateTakeProfit(this.props.buyOrders.lastPrice, 2),
            id: shortid.generate(),
            text: `Take_Profit ${labelNumber}`,
            draggable: true
        }

        const newStopLoss = {
            ...sell,
            yValue: calculateStopLoss(this.props.buyOrders.lastPrice, 2),
            id: shortid.generate(),
            text: `Stop_Loss ${labelNumber}`,
            draggable: true
        }
        console.log('isNewObject ', this.props.buyOrders.isNewObject)
        this.props.onUpdateBuyOrders({
            openPrice: this.props.buyOrders.lastPrice,
            orderBody: [...currentBuyOrders, order, newTakeProfit, newStopLoss],
            userId: this.props.users.usersInfo.sub,
            abbreviation: this.props.choosenAsset.choosenAsset,
            backtestingId: this.props.backtesting.backtestingInfo._id,
            isNewObject: true
        })
        this.props.onEnableModalWindow()
    }

    handleDoubleClickAlert(item) {
        this.props.onEnableModalWindow()
    }
    render() {
        return (
            <DrawingObjectSelector
                enabled
                getInteractiveNodes={this.getInteractiveNodes}
                drawingObjectMap={{
                    InteractiveYCoordinate: "yCoordinateList"
                }}
                onSelect={this.handleSelection}
                onDoubleClick={this.handleDoubleClickAlert}
            />
        )
    }
}

DrawingObjectSelectorOrders.propTypes = {}

const mapStateToProps = (state) => ({
    buyOrders: state.buyOrders,
    users: state.users,
    choosenAsset: state.choosenAsset,
    backtesting: state.backtesting
})

const mapDispatchToProps = (dispatch) => ({
    onUpdateBuyOrders: ({openPrice, closePrice, orderBody, orderStatus, 
        orderCloseType, userId, abbreviation, backtestingId, isNewObject
    }) => dispatch(updateBuyOrdersAction(
        openPrice, closePrice, orderBody, orderStatus, orderCloseType, 
        userId, abbreviation, backtestingId, isNewObject
    )),
    onEnableModalWindow: () => {dispatch(enableBuyOrdersModalWindow())},
    onSetNewBuyOrder: () => {dispatch(setNewBuyOrder())}
})

export default connect(mapStateToProps, mapDispatchToProps)(DrawingObjectSelectorOrders)