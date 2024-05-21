import React from "react";
import { InteractiveYCoordinate } from "react-stockcharts/lib/interactive";
import { getInteractiveNodes, saveInteractiveNodes } from "../../InteractiveIndicatorsContainers/interactiveutils";
import { connect } from "react-redux";
import { disableBuyOrders, enableBuyOrders, setNewBuyOrder } from "../../../../state-manager/buyOrders/buyOrdersSlice";
import { updateBuyOrdersAction } from "../../../../state-manager/buyOrders/buyOrdersActions";

class BuyOrderComponent extends React.Component {
    constructor(props) {
        super(props)
        this.onKeyPress = this.onKeyPress.bind(this);
		this.onDragComplete = this.onDragComplete.bind(this);
		this.onDelete = this.onDelete.bind(this);

        this.saveInteractiveNodes = saveInteractiveNodes.bind(this);
		this.getInteractiveNodes = getInteractiveNodes.bind(this);

    }
    onKeyPress(e) {
        const keyCode = e.which;
        switch (keyCode) {
            case 27: { // ESC
                this.props.onDisableBuyOrders()
            }
            case 89: { // Y 
                this.props.onEnableBuyOrders()
            }
        }
    }
    componentDidMount() {
		document.addEventListener("keyup", this.onKeyPress);
	}
	componentWillUnmount() {
		document.removeEventListener("keyup", this.onKeyPress);
	}
    onDelete(yCoordinate, moreProps) {
        const chartId = moreProps.chartConfig.id;
        console.log('chartId', chartId)
        console.log('yCoordinate', yCoordinate)
    }
    onDragComplete(yCoordinateList, moreProps, draggedAlert) {
		// this gets called on drag complete of drawing object
		const { id: chartId } = moreProps.chartConfig;
        if (draggedAlert.text.split(' ')[0] === 'Stop_Loss' || "Take_Profit") {
            const filteredData = yCoordinateList.filter((buyOrder) => buyOrder.text.split(' ')[0] === draggedAlert.text.split(' ')[0])
            const idx = filteredData.findIndex((obj) => obj.text === draggedAlert.text)
            const replacedObjectIndex = yCoordinateList.findIndex((obj) => obj.text === draggedAlert.text)
            yCoordinateList[replacedObjectIndex] = draggedAlert
            console.log('idx ', idx)
            console.log('yCoordinateList ', yCoordinateList)
            console.log('this.props.buyOrders.idx_buyOrders_1[replacedObjectIndex] ', this.props.buyOrders.idx_buyOrders_1[idx])
            this.props.onUpdateBuyOrders({
                openPrice: this.props.buyOrders.lastPrice,
                orderBody: yCoordinateList,
                userId: this.props.users.usersInfo.sub,
                abbreviation: this.props.choosenAsset.choosenAsset,
                backtestingId: this.props.backtesting.backtestingInfo._id,
                isNewObject: false, 
                objIdx: this.props.buyOrders.idx_buyOrders_1[idx]
            })
        }
    }
    render() {
        const { buyOrders, onSetNewBuyOrder } = this.props
        return <InteractiveYCoordinate 
            ref={this.saveInteractiveNodes("BuyOrder", 1)}
            enabled={buyOrders.enableBuyOrders}
            onStart={() => onSetNewBuyOrder()}
            onDragComplete={this.onDragComplete}
			onDelete={this.onDelete}
            yCoordinateList={buyOrders.buyOrdersList_1}
        />
    }
}

BuyOrderComponent.propTypes = {}

const mapStateToProps = (state) => ({
    buyOrders: state.buyOrders,
    users: state.users,
    choosenAsset: state.choosenAsset,
    backtesting: state.backtesting
})

const mapDispatchToProps = (dispatch) => ({
    onEnableBuyOrders: () => dispatch(enableBuyOrders()),
    onDisableBuyOrders: () => dispatch(disableBuyOrders()),
    onSetNewBuyOrder: () => dispatch(setNewBuyOrder()),
    onUpdateBuyOrders: ({openPrice, closePrice, orderBody, orderStatus, 
        orderCloseType, userId, abbreviation, backtestingId, isNewObject, objIdx
    }) => dispatch(updateBuyOrdersAction(
        openPrice, closePrice, orderBody, orderStatus, orderCloseType, 
        userId, abbreviation, backtestingId, isNewObject, objIdx
    )),
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyOrderComponent)