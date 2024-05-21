import React from "react";
import { connect } from "react-redux";
import { deleteFibbonaci, updateFibbonaci } from "../../../../state-manager/fibonacci/fibonacciActions";
import { disableFibbonaci, enableFibbonaci, setNeWFibbonaci } from "../../../../state-manager/fibonacci/fibonacciSlice";
import { saveInteractiveNodes } from "../interactiveutils";
import { FibonacciRetracement } from "react-stockcharts/lib/interactive";

class FibbonaciComponent extends React.Component {
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
        const keyCode = e.which
        switch(keyCode) {
            case 46: {
                const deletedFibbonaci1Index = this.props.fibbonaci.fibbonaci_1 && this.props.fibbonaci.fibbonaci_1.findIndex((each) => each.selected)
                const deletedFibbonaci3Index = this.props.fibbonaci.fibbonaci_3 && this.props.fibbonaci.fibbonaci_3.findIndex((each) => each.selected)
                console.log('deletedFibbonaci1Index ', deletedFibbonaci1Index)
                console.log('deletedFibbonaci3Index ', deletedFibbonaci3Index)

                if (deletedFibbonaci1Index !== -1 && deletedFibbonaci1Index !== undefined) {
                    const deletedObjectId = this.props.fibbonaci.idx_fibbonaci_1[deletedFibbonaci1Index]
                    const deletedObject = this.props.fibbonaci.fibbonaci_1[deletedFibbonaci1Index]
                    this.props.onDeleteFibbonaci(deletedObjectId, deletedObject)

                } else if (deletedFibbonaci3Index !== -1 && deletedFibbonaci3Index !== undefined) {
                    const deletedObjectId = this.props.fibbonaci.idx_fibbonaci_3[deletedFibbonaci3Index]
                    const deletedObject = this.props.fibbonaci.fibbonaci_3[deletedFibbonaci3Index]
                    this.props.onDeleteFibbonaci(deletedObjectId, deletedObject)
                }

                break;
            }
            case 27: {
                this.props.onDisableFibbonaci()
                break;
            }
            case 70: {
                this.props.onEnableFibbonaci()
                break;
            }
        }
    }

    render() {
        const { fibbonaci, users, choosenAsset, onDisableFibbonaci, onUpdateFibbonaci, onSetNewFibbonaci, chartId } = this.props
        return (
            <FibonacciRetracement 
                ref={this.saveInteractiveNodes("FibonacciRetracement", 1)}
                enabled={fibbonaci.enableFibbonaci}
                type="BOUND"
                snap={false}
				snapTo={d => [d.high, d.low]}
                retracements={fibbonaci[`fibbonaci_${chartId}`]}
                onStart={() => onSetNewFibbonaci()}
                onComplete={(fibObj) => {
                    if (chartId === 1) {
                        onUpdateFibbonaci('fibbonaci_1', fibObj, users.usersInfo.sub, choosenAsset.choosenAsset, null, fibbonaci.isNewObject)
                        onDisableFibbonaci()
                    } else if (chartId === 3) {
                        onUpdateFibbonaci('fibbonaci_3', fibObj, users.usersInfo.sub, choosenAsset.choosenAsset, null, fibbonaci.isNewObject)
                        onDisableFibbonaci()
                    }
                }}
            />
        )
    }
}

FibbonaciComponent.propTypes = {}

const mapStateToProps = (state) => ({
    fibbonaci: state.fibbonaci,
    users: state.users,
    choosenAsset: state.choosenAsset,
})

const mapDispatchToProps = (dispatch) => ({
    onEnableFibbonaci: () => dispatch(enableFibbonaci()),
    onDisableFibbonaci: () => dispatch(disableFibbonaci()),
    onSetNewFibbonaci: () => dispatch(setNeWFibbonaci()),
    onUpdateFibbonaci: (objectName, objectBody, userId, abbreviation, backtestingId=null, isNewObject) => 
        dispatch(updateFibbonaci(objectName, objectBody, userId, abbreviation, backtestingId, isNewObject)
    ),
    onDeleteFibbonaci: (drawnObjectId, drawnObjectBody) => dispatch(deleteFibbonaci(drawnObjectId, drawnObjectBody))
})

export default connect(mapStateToProps, mapDispatchToProps)(FibbonaciComponent)