import React from "react";
import { disableInteractiveText, disableModalWindow, enableInteractiveText, enableModalWindow, setNewInteractiveText } from "../../../../state-manager/interactiveText/interactiveTextSlice";
import { connect } from "react-redux";
import { deleteInteractiveText, updateInteractiveText } from "../../../../state-manager/interactiveText/interactiveTextActions";
import { InteractiveText } from "react-stockcharts/lib/interactive";
import { saveInteractiveNodes } from "../interactiveutils";

class InteractiveTextComponent extends React.Component {
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
        switch (keyCode) {
            case 46: { // DEL
                const deletedInteractiveText1Index = this.props.interactiveText.interactiveText_1.findIndex((each) => each.selected)
                const deletedInteractiveText3Index = this.props.interactiveText.interactiveText_3.findIndex((each) => each.selected)

                if (deletedInteractiveText1Index !== -1) {
                    const deletedObjectId = this.props.interactiveText.idx_interactiveText_1[deletedInteractiveText1Index]
                    const deletedObject = this.props.interactiveText.interactiveText_1[deletedInteractiveText1Index]
                    this.props.onDeleteInteractiveText(deletedObjectId, deletedObject)
                } else if (deletedInteractiveText3Index !== -1) {
                    const deletedObjectId = this.props.interactiveText.idx_interactiveText_3[deletedInteractiveText3Index]
                    const deletedObject = this.props.interactiveText.interactiveText_3[deletedInteractiveText3Index]
                    this.props.onDeleteInteractiveText(deletedObjectId, deletedObject)
                }

                break;
            }
            case 27: { // ESC
                this.props.onDisableInteractiveText()
                break;
            }
            case 73: { // I
                this.props.onEnableInteractiveText()
                break;
            }
        }
    }
    render() {
        const { interactiveText, users, choosenAsset, onDisableInteractiveText, onUpdateInteractiveText, onSetNewInteractiveText, chartId } = this.props
        return (
            <InteractiveText 
                ref={this.saveInteractiveNodes("InteractiveText", 1)}
                enabled={interactiveText.enableInteractiveText}
                text="Lorem ipsum..."
                onStart={() => onSetNewInteractiveText()}
                onDragComplete={(text) => {
                    if (chartId === 1) {
                        onUpdateInteractiveText('interactiveText_1', text, users.usersInfo.sub, choosenAsset.choosenAsset, null, interactiveText.isNewObject)
                        onDisableInteractiveText()
                    } else if (chartId === 3) {
                        onUpdateInteractiveText('interactiveText_3', text, users.usersInfo.sub, choosenAsset.choosenAsset, null, interactiveText.isNewObject)
                        onDisableInteractiveText()
                    }
                }}
                textList={interactiveText[`interactiveText_${chartId}`]}
            />
        )
    }
}

InteractiveTextComponent.propTypes = {}

const mapStateToProps = (state) => ({
    interactiveText: state.interactiveText,
    users: state.users,
	choosenAsset: state.choosenAsset,
})

const mapDispatchToProps = (dispatch) => ({
    onEnableInteractiveText: () => dispatch(enableInteractiveText()),
    onDisableInteractiveText: () => dispatch(disableInteractiveText()),
    onEnableModalWindow: () => dispatch(enableModalWindow()),
    onDisableModalWindow: () => dispatch(disableModalWindow()),
    onSetNewInteractiveText: () => dispatch(setNewInteractiveText()),
    onUpdateInteractiveText: (objectName, objectBody, userId, abbreviation, backtestingId=null, isNewObject) =>
        dispatch(updateInteractiveText(objectName, objectBody, userId, abbreviation, backtestingId, isNewObject)
    ),
    onDeleteInteractiveText: (drawnObjectId, drawnObject) => dispatch(deleteInteractiveText(drawnObjectId, drawnObject))
})

export default connect(mapStateToProps, mapDispatchToProps)(InteractiveTextComponent)