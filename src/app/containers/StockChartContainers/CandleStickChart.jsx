
import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
	BarSeries,
	AreaSeries,
	CandlestickSeries,
	LineSeries,
	MACDSeries,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
	CrossHairCursor,
	EdgeIndicator,
	CurrentCoordinate,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {
	OHLCTooltip,
	MovingAverageTooltip,
	MACDTooltip,
} from "react-stockcharts/lib/tooltip";
import { ema, macd, sma } from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
import TrendLineComponent from "../InteractiveIndicatorsContainers/Trendline/TrendLineComponent";
import FibbonaciComponent from "../InteractiveIndicatorsContainers/Fibbonaci/FibbonaciComponent";
import InteractiveTextComponent from "../InteractiveIndicatorsContainers/InteractiveText/InteractiveTextComponent";
import { connect } from "react-redux";
import { disableInteractiveText, enableInteractiveText, setNewInteractiveText } from "../../../state-manager/interactiveText/interactiveTextSlice";
import { deleteInteractiveText, updateInteractiveText } from "../../../state-manager/interactiveText/interactiveTextActions";
import DrawingObjectSelectorForInteractiveText from "../InteractiveIndicatorsContainers/DrawingObjecSelector.jsx/DrawingObjectSelectorForInteractiveText";
import CallInteractiveTextModalComponent from "../ModalWindows/CallInteractiveTextModal";
import BuyOrderComponent from "../OrdersContainers/BuyOrdersContainers/BuyOrderComponent";
import OrderPlacePanel from "../OrdersContainers/OrdersComponents/OrderPlacePanel";
import BacktestingModalWindow from "../ModalWindows/BacktestingModalWindow";
import BacktestingExistsModalWindow from "../ModalWindows/BacktestingExistsModalWindow";
import DrawingObjectSelectorOrders from "../InteractiveIndicatorsContainers/DrawingObjecSelector.jsx/DrawingObjectSelectorOrders";
import OrderTable from "../OrderTable/OrderTable";
import ColorChoosePanel from "../ColorChooseContainers/ColorChoosePanel";
import { DrawingObjectSelector, InteractiveYCoordinate } from "react-stockcharts/lib/interactive";
import { getInteractiveNodes, saveInteractiveNodes } from "../InteractiveIndicatorsContainers/interactiveutils";
import { head, toObject } from "react-stockcharts/lib/utils";
import { getMorePropsForChart } from "react-stockcharts/lib/interactive/utils";
import { round } from "../../helper/round";
import shortid from "shortid";
import { each } from "chart.js/helpers";


const macdAppearance = {
	stroke: {
		macd: "#FF0000",
		signal: "#00F300",
	},
	fill: {
		divergence: "#4682B4"
	},
};

const mouseEdgeAppearance = {
	textFill: "#542605",
	stroke: "#05233B",
	strokeOpacity: 1,
	strokeWidth: 3,
	arrowWidth: 5,
	fill: "#BCDEFA",
};

const alert = InteractiveYCoordinate.defaultProps.defaultPriceCoordinate;
const sell = {
	...InteractiveYCoordinate.defaultProps.defaultPriceCoordinate,
	stroke: "#E3342F",
	textFill: "#E3342F",
	text: "Sell 320",
	edge: {
		...InteractiveYCoordinate.defaultProps.defaultPriceCoordinate.edge,
		stroke: "#E3342F"
	}
};
const buy = {
	...InteractiveYCoordinate.defaultProps.defaultPriceCoordinate,
	stroke: "#1F9D55",
	textFill: "#1F9D55",
	text: "Buy 120",
	edge: {
		...InteractiveYCoordinate.defaultProps.defaultPriceCoordinate.edge,
		stroke: "#1F9D55"
	}
};

class CandleStickChart extends React.Component {
	constructor(props) {
		super(props)

		this.onDragComplete = this.onDragComplete.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.handleChoosePosition = this.handleChoosePosition.bind(this);

		this.saveInteractiveNodes = saveInteractiveNodes.bind(this);
		this.getInteractiveNodes = getInteractiveNodes.bind(this);

		this.handleDialogClose = this.handleDialogClose.bind(this);
		this.handleChangeAlert = this.handleChangeAlert.bind(this);
		this.handleDeleteAlert = this.handleDeleteAlert.bind(this);

		this.handleDoubleClickAlert = this.handleDoubleClickAlert.bind(this);

		this.state = {
			enableInteractiveObject: false,
			yCoordinateList_1: [
				{
					...InteractiveYCoordinate.defaultProps.defaultPriceCoordinate,
					yValue: 55.90,
					id: shortid.generate(),
					draggable: true,
				},
				{
					...buy,
					yValue: 50.90,
					id: shortid.generate(),
					draggable: false,
				},
				{
					...sell,
					yValue: 58.90,
					id: shortid.generate(),
					draggable: false,
				},
			],
			yCoordinateList_3: [],
			showModal: false,
			alertToEdit: {}
		}
	}
	handleSelection(interactives, moreProps, e) {
		console.log('handleSelection')
		console.log('handleSelection ', interactives, moreProps, e)
		console.log('handleSelection ', this.state)
		if (this.state.enableInteractiveObject) {
			const independentCharts = moreProps.currentCharts.filter(d => d !== 2);
			if (independentCharts.length > 0) {
				const first = head(independentCharts);

				const morePropsForChart = getMorePropsForChart(moreProps, first);
				const {
					mouseXY: [, mouseY],
					chartConfig: { yScale },
				} = morePropsForChart;

				const yValue = round(yScale.invert(mouseY), 2);
				const newAlert = {
					...InteractiveYCoordinate.defaultProps.defaultPriceCoordinate,
					yValue,
					id: shortid.generate()
				};
				this.handleChoosePosition(newAlert, morePropsForChart, e);
			}
		} else {
			const state = toObject(interactives, each => {
				return [
					`yCoordinateList_${each.chartId}`,
					each.objects,
				];
			});
			this.setState(state);
		}
	}
	handleChoosePosition(alert, moreProps) {
		console.log('handleChoosePosition')
		const { id: chartId } = moreProps.chartConfig
		this.setState({
			[`yCoordinateList_${chartId}`]: [
				...this.state[`yCoordinateList_${chartId}`],
				alert
			],
			enableInteractiveObject: false
		})
	}
	handleDoubleClickAlert(item) {
		console.log('handleDoubleClickAlert')
		this.setState({
			showModal: true,
			alertToEdit: {
				alert: item.object,
				chartId: item.chartId
			}
		})
	}
	handleChangeAlert(alert, chartId) {
		const yCoordinateList = this.state[`yCoordinateList_${chartId}`]

		const newAlertList = yCoordinateList.map(d => {
			return d.id === alert.id ? alert : d
		})

		this.setState({
			[`yCoordinateList_${chartId}`]: newAlertList,
			showModal: false,
			enableInteractiveObject: false
		})
	}
	handleDeleteAlert() {
		console.log('handleDeleteAlert')
		const { alertToEdit } = this.state
		const key = `yCoordinateList_${alertToEdit.chartId}`
		const yCoordinateList = this.state[key].filter(d => {
			return d.id !== alertToEdit.alert.id
		})
		this.setState({
			showModal: false,
			alertToEdit: {},
			[key]: yCoordinateList
		})
	}
	handleDialogClose() {
		this.setState(state => {
			const { originalAlertList, alertToEdit } = state
			const key = `yCoordinateList_${alertToEdit.chartId}`;
			const list = originalAlertList || state[key];

			return {
				showModal: false,
				[key]: list
			}
		})
	}
	componentDidMount() {
		document.addEventListener("keyup", this.onKeyPress);
	}
	componentWillUnmount() {
		document.removeEventListener("keyup", this.onKeyPress);
	}
	onDelete(yCoordinate, moreProps) {
		this.setState(state => {
			const chartId = moreProps.chartConfig.id
			const key = `yCoordinateList_${chartId}`

			const list = state[key]
			return {
				[key]: list.filter(d => d.id !== yCoordinate.id)
			}
		})
	}
	onDragComplete(yCoordinateList, moreProps, draggedAlert) {
		console.log('onDragComplete ', this.state)
		console.log('onDragComplete ', yCoordinateList, moreProps, draggedAlert)
		// this gets called on drag complete of drawing object
		const { id: chartId } = moreProps.chartConfig

		const key = `yCoordinateList_${chartId}`;
		const alertDragged = draggedAlert !== null

		this.setState({
			enableInteractiveObject: false,
			[key]: yCoordinateList,
			showModal: alertDragged,
			alertToEdit: {
				alert: draggedAlert,
				chartId
			},
			originalAlertList: this.state[key]
		})
	}
	render() {
		const { type, data: initialData, width, ratio } = this.props;
		const ema26 = ema()
			.id(0)
			.options({ windowSize: 26 })
			.merge((d, c) => { d.ema26 = c; })
			.accessor(d => d.ema26);

		const ema12 = ema()
			.id(1)
			.options({ windowSize: 12 })
			.merge((d, c) => {d.ema12 = c;})
			.accessor(d => d.ema12);

		const macdCalculator = macd()
			.options({
				fast: 12,
				slow: 26,
				signal: 9,
			})
			.merge((d, c) => {d.macd = c;})
			.accessor(d => d.macd);

		const smaVolume50 = sma()
			.id(3)
			.options({
				windowSize: 50,
				sourcePath: "volume",
			})
			.merge((d, c) => {d.smaVolume50 = c;})
			.accessor(d => d.smaVolume50);

		const calculatedData = smaVolume50(macdCalculator(ema12(ema26(initialData))));
		const xScaleProvider = discontinuousTimeScaleProvider
			.inputDateAccessor(d => new Date(d.date));
		const {
			data,
			xScale,
			xAccessor,
			displayXAccessor,
		} = xScaleProvider(calculatedData);

		return (
			<>
				<OrderPlacePanel />
				<div className=" flex flex-row w-full h-max">
					<ColorChoosePanel />
					<div>
						<ChartCanvas ref={this.saveCanvasNode}
							height={600}
							width={width}
							ratio={ratio}
							margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
							type={type}
							seriesName="MSFT"
							data={data}
							xScale={xScale}
							xAccessor={xAccessor}
							displayXAccessor={displayXAccessor}
						>
							<Chart id={1} height={400}
								yExtents={[d => [d.high, d.low], ema26.accessor(), ema12.accessor()]}
								padding={{ top: 10, bottom: 20 }}
							>
								<XAxis axisAt="bottom" orient="bottom" showTicks={false} outerTickSize={0} />
								<YAxis axisAt="right" orient="right" ticks={5} />

								<MouseCoordinateY
									at="right"
									orient="right"
									displayFormat={format(".2f")}
									{...mouseEdgeAppearance}
								/>

								<CandlestickSeries />
								<LineSeries yAccessor={ema26.accessor()} stroke={ema26.stroke()}/>
								<LineSeries yAccessor={ema12.accessor()} stroke={ema12.stroke()}/>

								<CurrentCoordinate yAccessor={ema26.accessor()} fill={ema26.stroke()} />
								<CurrentCoordinate yAccessor={ema12.accessor()} fill={ema12.stroke()} />

								<EdgeIndicator itemType="last" orient="right" edgeAt="right"
									yAccessor={d => d.close}
									fill={d => d.close > d.open ? "#A2F5BF" : "#F9ACAA"}
									stroke={d => d.close > d.open ? "#0B4228" : "#6A1B19"}
									textFill={d => d.close > d.open ? "#0B4228" : "#420806"}
									strokeOpacity={1}
									strokeWidth={3}
									arrowWidth={2}
								/>

								<OHLCTooltip origin={[-40, 0]}/>
								<MovingAverageTooltip
									onClick={e => console.log(e)}
									origin={[-38, 15]}
									options={[
										{
											yAccessor: ema26.accessor(),
											type: "EMA",
											stroke: ema26.stroke(),
											windowSize: ema26.options().windowSize,
										},
										{
											yAccessor: ema12.accessor(),
											type: "EMA",
											stroke: ema12.stroke(),
											windowSize: ema12.options().windowSize,
										},
									]}
								/>

								<TrendLineComponent chartId={1}/>
								<FibbonaciComponent chartId={1}/>
								<InteractiveTextComponent chartId={1}/>
								{/* <BuyOrderComponent /> */}
								{/* <InteractiveText
									ref={this.saveInteractiveNodes("InteractiveText", 1)}
									enabled={this.props.interactiveText.enableInteractiveText}
									text="Lorem ipsum..."
									onStart={() => this.props.onSetNewInteractiveText()}
									onDragComplete={(text) => {
										console.log('text ', text)
										this.props.onUpdateInteractiveText('interactiveText_1', text, this.props.users.usersInfo.sub, 
											this.props.choosenAsset.choosenAsset, null, this.props.interactiveText.isNewObject
										)
										this.props.onDisableInteractiveText()
									}}
									textList={this.props.interactiveText.interactiveText_1}
								/> */}
								<InteractiveYCoordinate 
									ref={this.saveInteractiveNodes("InteractiveYCoordinate", 1)}
									enabled={this.state.enableInteractiveObject}
									onDragComplete={this.onDragComplete}
									onDelete={this.onDelete}
									yCoordinateList={this.state.yCoordinateList_1}
								/>
							</Chart>
							<Chart id={2} height={150}
								yExtents={[d => d.volume, smaVolume50.accessor()]}
								origin={(w, h) => [0, h - 300]}
							>
								<YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")}/>

								<MouseCoordinateY
									at="left"
									orient="left"
									displayFormat={format(".4s")}
									{...mouseEdgeAppearance}
								/>

								<BarSeries yAccessor={d => d.volume} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"} />
								<AreaSeries yAccessor={smaVolume50.accessor()} stroke={smaVolume50.stroke()} fill={smaVolume50.fill()}/>
							</Chart>
							<Chart id={3} height={150}
								yExtents={macdCalculator.accessor()}
								origin={(w, h) => [0, h - 150]} padding={{ top: 10, bottom: 10 }}
							>
								<XAxis axisAt="bottom" orient="bottom"/>
								<YAxis axisAt="right" orient="right" ticks={2} />

								<MouseCoordinateX
									at="bottom"
									orient="bottom"
									displayFormat={timeFormat("%Y-%m-%d")}
									rectRadius={5}
									{...mouseEdgeAppearance}
								/>
								<MouseCoordinateY
									at="right"
									orient="right"
									displayFormat={format(".2f")}
									{...mouseEdgeAppearance}
								/>

								<MACDSeries yAccessor={d => d.macd}
									{...macdAppearance} />
								<MACDTooltip
									origin={[-38, 15]}
									yAccessor={d => d.macd}
									options={macdCalculator.options()}
									appearance={macdAppearance}
								/>

								<TrendLineComponent chartId={3}/>
								<FibbonaciComponent chartId={3}/>
								<InteractiveTextComponent chartId={3}/>
							</Chart>
							<CrossHairCursor />
							{/* <DrawingObjectSelectorForInteractiveText />
							<DrawingObjectSelectorOrders /> */}
							{/* <DrawingObjectSelector
								enabled
								getInteractiveNodes={this.getInteractiveNodes}
								drawingObjectMap={{
									InteractiveYCoordinate: "yCoordinateList"
								}}
								onSelect={this.handleSelection}
								onDoubleClick={this.handleDoubleClickAlert}
							/> */}
						</ChartCanvas>
						<CallInteractiveTextModalComponent />
						<BacktestingModalWindow />
						<BacktestingExistsModalWindow />
					</div>
				</div>
				
				<OrderTable />
			</>
		);
	}
}

CandleStickChart.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickChart.defaultProps = {
	type: "svg",
};

CandleStickChart = fitWidth(CandleStickChart);

const mapStateToProps = (state) => ({
	interactiveText: state.interactiveText,
	users: state.users,
	choosenAsset: state.choosenAsset,
})

const mapDispatchToProps = (dispatch) => ({
	onSetNewInteractiveText: () => dispatch(setNewInteractiveText()),
	onDisableInteractiveText: () => dispatch(disableInteractiveText()),
    onUpdateInteractiveText: (objectName, objectBody, userId, abbreviation, backtestingId=null, isNewObject) =>
        dispatch(updateInteractiveText(objectName, objectBody, userId, abbreviation, backtestingId, isNewObject)
    ),
    onDeleteInteractiveText: (drawnObjectId, drawnObject) => dispatch(deleteInteractiveText(drawnObjectId, drawnObject))
})

export default connect(mapStateToProps, mapDispatchToProps)(CandleStickChart)