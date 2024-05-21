import React from "react";
import ModalWindowInteractiveText from "./ModalWindowInteractiveText";
import { connect } from "react-redux";
import { disableModalWindow } from "../../../state-manager/interactiveText/interactiveTextSlice";
import { updateInteractiveText } from "../../../state-manager/interactiveText/interactiveTextActions";
import { last } from "react-stockcharts/lib/utils";

class CallInteractiveTextModalComponent extends React.Component {
    constructor(props) {
        super(props)

        this.handleDialogClose = this.handleDialogClose.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this);
    }
    componentDidMount() {
		document.addEventListener("keyup", this.onKeyPress);
	}
	componentWillUnmount() {
		document.removeEventListener("keyup", this.onKeyPress);
	}
    handleTextChange(text, chartId) {
        const textList = this.props.interactiveText[`interactiveText_${chartId}`]
        const allButLast = textList.slice(0, textList.length - 1)

        const lastText = {
            ...last(textList),
            text: text
        }

        this.props.onUpdateInteractiveText(
            chartId === 1 
                ? 'interactiveText_1'
                : chartId === 3 && 'interactiveText_3', 
            [...allButLast, lastText], this.props.users.usersInfo.sub, 
            this.props.choosenAsset.choosenAsset, 
            null, this.props.interactiveText.isNewObject
        )
    }
    handleDialogClose() {
        this.props.onDisableModalWindow()
        this.componentDidMount()
    }
    render() {
        const { interactiveText } = this.props
        return (
            <ModalWindowInteractiveText
                text="Interactive Text"
                chartId={interactiveText.chartIdOfTheDrawingObject}
                onClose={this.handleDialogClose}
                onSave={this.handleTextChange}
            />
        )
    }
}

CallInteractiveTextModalComponent.propTypes = {}

const mapStateToProps = (state) => ({
	interactiveText: state.interactiveText,
    users: state.users,
	choosenAsset: state.choosenAsset,
})

const mapDispatchToProps = (dispatch) => ({
	onDisableModalWindow: () => dispatch(disableModalWindow()),
	onUpdateInteractiveText: (objectName, objectBody, userId, abbreviation, backtestingId=null, isNewObject) =>
        dispatch(updateInteractiveText(objectName, objectBody, userId, abbreviation, backtestingId, isNewObject)
    ),
})

export default connect(mapStateToProps, mapDispatchToProps)(CallInteractiveTextModalComponent)