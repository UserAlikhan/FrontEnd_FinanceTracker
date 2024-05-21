import React from "react";
import { getInteractiveNodes, saveInteractiveNodes } from "../interactiveutils";
import { DrawingObjectSelector, InteractiveText } from "react-stockcharts/lib/interactive";
import { getMorePropsForChart } from "react-stockcharts/lib/interactive/utils";
import { updateInteractiveText } from "../../../../state-manager/interactiveText/interactiveTextActions";
import { connect } from "react-redux";
import { head } from "react-stockcharts/lib/utils";
import { enableModalWindow } from "../../../../state-manager/interactiveText/interactiveTextSlice";

class DrawingObjectSelectorForInteractiveText extends React.Component {
    constructor(props) {
        super(props)

        this.saveInteractiveNodes = saveInteractiveNodes.bind(this);
		this.getInteractiveNodes = getInteractiveNodes.bind(this);

        this.handleSelection = this.handleSelection.bind(this);
		this.handleChoosePosition = this.handleChoosePosition.bind(this);
    }
    componentDidMount() {
		document.addEventListener("keyup", this.onKeyPress);
	}
	componentWillUnmount() {
		document.removeEventListener("keyup", this.onKeyPress);
	}
    handleSelection(interactives, moreProps, e) {
		if (this.props.interactiveText.enableInteractiveText) {
			const independentCharts = moreProps.currentCharts.filter(d => d !== 2)
			if (independentCharts.length > 0) {
				const first = head(independentCharts);

				const morePropsForChart = getMorePropsForChart(moreProps, first)
				const {
					mouseXY: [, mouseY],
					chartConfig: { yScale },
					xAccessor,
					currentItem,
				} = morePropsForChart;

				const position = [xAccessor(currentItem), yScale.invert(mouseY)];
				const newText = {
					...InteractiveText.defaultProps.defaultText,
					position,
				};
				this.handleChoosePosition(newText, morePropsForChart, e);
			}
		}
	}
    handleChoosePosition(text, moreProps) {
		this.componentWillUnmount();
		const { id: chartId } = moreProps.chartConfig;
		if (chartId === 1) {
			const currentInteractiveTextState = this.props.interactiveText.interactiveText_1
			this.props.onUpdateInteractiveText(
                'interactiveText_1', [...currentInteractiveTextState, text], 
                this.props.users.usersInfo.sub, this.props.choosenAsset.choosenAsset, null, true
            )
            this.props.onEnableModalWindow(1)
		} else if (chartId === 3) {
			const currentInteractiveTextState = this.props.interactiveText.interactiveText_3
			this.props.onUpdateInteractiveText(
                'interactiveText_3', [...currentInteractiveTextState, text], 
                this.props.users.usersInfo.sub, this.props.choosenAsset.choosenAsset, null, true
            )
            this.props.onEnableModalWindow(3)
		}
	}

    render() {
        return (
            <DrawingObjectSelector 
                enabled
                getInteractiveNodes={this.getInteractiveNodes}
                drawingObjectMap={{
                    InteractiveText: "interactiveText"
                }}
                onSelect={this.handleSelection}
            />
        )
    }
}

DrawingObjectSelectorForInteractiveText.propTypes = {}

const mapStateToProps = (state) => ({
    interactiveText: state.interactiveText,
    users: state.users,
    choosenAsset: state.choosenAsset,
})

const mapDispatchToProps = (dispatch) => ({
    onEnableModalWindow: (chartId) => dispatch(enableModalWindow(chartId)),
    onUpdateInteractiveText: (objectName, objectBody, userId, abbreviation, backtestingId=null, isNewObject) =>
        dispatch(updateInteractiveText(objectName, objectBody, userId, abbreviation, backtestingId, isNewObject)
    ),
})

export default connect(mapStateToProps, mapDispatchToProps)(DrawingObjectSelectorForInteractiveText)