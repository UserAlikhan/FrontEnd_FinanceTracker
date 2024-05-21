import React from 'react';
import { saveInteractiveNodes } from '../interactiveutils'
import { TrendLine } from 'react-stockcharts/lib/interactive'
import { connect } from 'react-redux';
import { disableTrendline, enableTrendline, setNewTrendline } from '../../../../state-manager/trendline/trendlineSlice';
import { deleteTrendlines, updateTrendlines } from '../../../../state-manager/trendline/trendlineActions';

class TrendLineComponent extends React.Component {
    constructor(props) {
        super(props)

        this.onKeyPress = this.onKeyPress.bind(this);
		this.saveInteractiveNodes = saveInteractiveNodes.bind(this)
    }
	componentDidMount() {
		document.addEventListener("keyup", this.onKeyPress);
	}
	componentWillUnmount() {
		document.removeEventListener("keyup", this.onKeyPress);
	}
	onKeyPress(e) {
		const keyCode = e.which;
		console.log(keyCode)
		switch (keyCode) {
			case 46: { // DEL
				const deletedTrendline1Index = this.props.trendline.trends_1.findIndex((each) => each.selected)
				const deletedTrendline3Index = this.props.trendline.trends_3.findIndex((each) => each.selected)
				
				if (deletedTrendline1Index !== -1) {
					const deletedObjectId = this.props.trendline.idx_trends_1[deletedTrendline1Index]
					const deletedObject = this.props.trendline.trends_1[deletedTrendline1Index]
					this.props.onDeleteTrendlines(deletedObjectId, deletedObject)

				} else if (deletedTrendline3Index !== -1) {
					const deletedObjectId = this.props.trendline.idx_trends_3[deletedTrendline3Index]
					const deletedObject = this.props.trendline.trends_3[deletedTrendline3Index]
					this.props.onDeleteTrendlines(deletedObjectId, deletedObject)
				}

				break;
			}
			case 27: { // ESC
				this.props.onDisableTrendline()
				break;
			}
			case 68:   // D - Draw trendline
			case 69: { // E - Enable trendline
				this.props.onEnableTrendline()
				break;
			}
		}
	}
    render() {
		const { trendline, users, choosenAsset, choosenColor, onDisableTrendline, onUpdateTrendlines, onSetNewTrendline } = this.props
        return (
            <TrendLine
				ref={this.saveInteractiveNodes("Trendline", this.props.chartId)}
				enabled={trendline.enableTrendLine}
				type="LINE"
				snap={false}
				snapTo={d => [d.high, d.low]}
				onStart={() => onSetNewTrendline()}
				onComplete={(trendlineObj) => {
					if (this.props.chartId === 1) {
						console.log('trendlineObj ', trendlineObj)
						onUpdateTrendlines('trends_1', trendlineObj, users.usersInfo.sub, choosenAsset.choosenAsset, null, trendline.isNewObject)
						onDisableTrendline();
					} else if (this.props.chartId === 3) {
						onUpdateTrendlines('trends_3', trendlineObj, users.usersInfo.sub, choosenAsset.choosenAsset, null, trendline.isNewObject)
						onDisableTrendline();
					}
				}}
				trends={trendline[`trends_${this.props.chartId}`]}
				appearance={{stroke: choosenColor.choosenColor}}
			/>
        )
    }
}

TrendLineComponent.propTypes = {}

const mapStateToProps = (state) => ({
	trendline: state.trendline,
	users: state.users,
	choosenAsset: state.choosenAsset,
	choosenColor: state.choosenColor
})

const mapDispatchToProps = (dispatch) => ({
	onEnableTrendline: () => dispatch(enableTrendline()),
	onDisableTrendline: () => dispatch(disableTrendline()),
	onSetNewTrendline: () => dispatch(setNewTrendline()),
	onUpdateTrendlines: (objectName, objectBody, userId, abbreviation, backtestingId=null, isNewObject) => 
		dispatch(updateTrendlines(objectName, objectBody, userId, abbreviation, backtestingId, isNewObject)
	),
	onDeleteTrendlines: (drawnObjectId, drawnObject) => dispatch(deleteTrendlines(drawnObjectId, drawnObject)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TrendLineComponent)