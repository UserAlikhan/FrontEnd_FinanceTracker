import React from "react";
import { setLastPrice } from "../../../state-manager/buyOrders/buyOrdersSlice";
import { connect } from "react-redux";
import { checkAndRemoveOrders } from "../../helper/checkAndRemoveOrders";
import { checkBuyOrders } from "../../../state-manager/buyOrders/buyOrdersActions";

function getDisplayName(ChartComponent) {
	const name = ChartComponent.displayName || ChartComponent.name || "ChartComponent";
	return name;
}

export default function updatingDataWrapper(ChartComponent) {
	const LENGTH = 100;

	class UpdatingComponentHOC extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				length: LENGTH,
				data: this.props.data.slice(0, LENGTH),
			};
			this.speed = 1000;
			this.onKeyPress = this.onKeyPress.bind(this);
		}
		componentDidMount() {
			document.addEventListener("keyup", this.onKeyPress);
		}
		componentWillUnmount() {
			if (this.interval) clearInterval(this.interval);
			document.removeEventListener("keyup", this.onKeyPress);
		}
		onKeyPress(e) {
			const keyCode = e.which;
			switch (keyCode) {
			case 50: {
				// 2 (50) - Start alter data
				this.func = () => {
					if (this.state.length < this.props.data.length) {
						this.props.onSetLastPrice(this.props.data[this.state.length + 1].open)
						
						const nextOpen = this.props.data[this.state.length + 1].open
						
						if (nextOpen === undefined || nextOpen === null) {
							console.log('nextOpen is undefined or null');
						} else {
							this.props.onCheckBuyOrder(
								this.props.buyOrders, nextOpen, this.props?.users?.usersInfo?.sub, 
								this.props?.choosenAsset?.choosenAsset, 
								this.props?.backtesting?.backtestingInfo?._id
							)

							this.setState({
								length: this.state.length + 1,
								data: this.props.data.slice(0, this.state.length + 1),
							});
						}
					}
				};
				break;
			}
			case 80:
				// P (80)
			case 49: {
				// 1 (49) - Start Push data
				this.func = () => {
					if (this.state.length < this.props.data.length) {
						this.props.onSetLastPrice(this.props.data[this.state.length + 1].open)
						const nextOpen = this.props.data[this.state.length + 1].open

						if (nextOpen === undefined || nextOpen === null) {
							console.log('nextOpen is undefined or null');
						} else {
							this.props.onCheckBuyOrder(
								this.props.buyOrders, nextOpen, this.props?.users?.usersInfo?.sub, 
								this.props?.choosenAsset?.choosenAsset, 
								this.props?.backtesting?.backtestingInfo?._id
							)

							this.setState({
								length: this.state.length + 1,
								data: this.props.data.slice(0, this.state.length + 1),
							});
						}
					}
				};
				break;
			}
			case 27: {
				// ESC (27) - Clear interval
				this.func = null;
				if (this.interval) clearInterval(this.interval);
				break;
			}
			case 107: {
				// + (107) - increase the this.speed
				this.speed = Math.max(this.speed / 2, 50);
				break;
			}
			case 109:
			case 189: {
				// - (189, 109) - reduce the this.speed
				const delta = Math.min(this.speed, 1000);
				this.speed = this.speed + delta;
				break;
			}
			}
			if (this.func) {
				if (this.interval) clearInterval(this.interval);
				console.log("this.speed  = ", this.speed);
				this.interval = setInterval(this.func, this.speed);
			}
		}
		render() {
			const { type } = this.props;
			const { data } = this.state;

			return <ChartComponent ref="component" data={data} type={type} />;
		}
	}
	UpdatingComponentHOC.defaultProps = {
		type: "svg",
	};
	UpdatingComponentHOC.displayName = `updatingDataWrapper(${ getDisplayName(ChartComponent) })`;

	const mapStateToProps = (state) => ({
		buyOrders: state.buyOrders,
		users: state.users,
		choosenAsset: state.choosenAsset,
		backtesting: state.backtesting
	})

	const mapDispatchToProps = (dispatch) => ({
		onSetLastPrice: (lastPrice) => dispatch(setLastPrice(lastPrice)),
		onCheckBuyOrder: (state, lastPrice, userId, abbreviation, backtestingId) => dispatch(checkBuyOrders(state, lastPrice, userId, abbreviation, backtestingId))
	})

	return connect(mapStateToProps, mapDispatchToProps)(UpdatingComponentHOC);
}