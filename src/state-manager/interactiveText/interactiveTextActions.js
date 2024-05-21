import { findIndexOfDifferInteractiveText } from "../../app/helper/findIndexOfDifferInteractiveText"
import interactiveIndicatorsService from "../../app/services/interactiveIndicatorsService"
import { store } from "../store"
import { deleteInteractiveText1, deleteInteractiveText3, fetchInteractiveText, undoNewInteractiveText, updateInteractiveText1, updateInteractiveText3 } from "./interactiveTextSlice"

export const fetchInteractiveTextAction = (userId, abbreviation, backtesting=null) => {
    return (async (dispatch) => {
        try {
            const interactiveTexts = await interactiveIndicatorsService.getAllUsersInteractiveTextObjectsOnSpecificAsset(userId, abbreviation, backtesting)

            if (interactiveTexts.interactiveText_1[0] || interactiveTexts.interactiveText_3[0]) {
                const convertedToObjectInteractiveText1 = interactiveTexts?.interactiveText_1?.map((text) => {
                    return JSON.parse(text.objectBody)
                })

                const idxForInteractiveText1 = interactiveTexts?.interactiveText_1?.map((text) => {
                    return text.id
                })

                const convertedToObjectInteractiveText3 = interactiveTexts?.interactiveText_3?.map((text) => {
                    return JSON.parse(text.objectBody)
                })

                const idxForInteractiveText3 = interactiveTexts?.interactiveText_3?.map((text) => {
                    return text.id
                })

                dispatch(fetchInteractiveText(
                    {
                        idx_interactiveText_1: idxForInteractiveText1 ? idxForInteractiveText1: [],
                        interactiveText_1: convertedToObjectInteractiveText1 ? convertedToObjectInteractiveText1: [],
                        idx_interactiveText_3: idxForInteractiveText3 ? idxForInteractiveText3: [],
                        interactiveText_3: convertedToObjectInteractiveText3 ? convertedToObjectInteractiveText3: []
                    }
                ))
            }
        } catch (error) {
            throw new Error(error)
        }
    })
}

export const updateInteractiveText = (objectName, objectBody, userId, abbreviation, backtestingId=null, isNewObject) => {
    return (async (dispatch) => {
        try {
            if (isNewObject) {
                const createdObject = await interactiveIndicatorsService.createDrawnObject(
                    objectName,
                    JSON.stringify({
                        ...objectBody[objectBody.length - 1],
                        selected: false
                    }),
                    userId, abbreviation, backtestingId
                )

                if (objectName === 'interactiveText_1') {
                    dispatch(updateInteractiveText1({ idx: createdObject.data.createDrawnObject.id, interactiveText_1: objectBody }))
                    dispatch(undoNewInteractiveText())
                } else if (objectName === 'interactiveText_3') {
                    dispatch(updateInteractiveText3({ idx: createdObject.data.createDrawnObject.id, interactiveText_3: objectBody }))
                    dispatch(undoNewInteractiveText())
                }
            } else {
                const prevState = store.getState()

                if (objectName === 'interactiveText_1') {
                    dispatch(updateInteractiveText1({ interactiveText_1: objectBody }))
                } else if (objectName === 'interactiveText_3') {
                    dispatch(updateInteractiveText3({ interactiveText_3: objectBody }))
                }

                const currentState = store.getState()

                const indexOfDifferObject = objectName === 'interactiveText_1'
                    ? await findIndexOfDifferInteractiveText(
                        prevState.interactiveText.interactiveText_1.map((text) => {
                            return {x: text.position[0], y: text.position[1]}
                        }),
                        currentState.interactiveText.interactiveText_1.map((text) => {
                            return {x: text.position[0], y: text.position[1]}
                        }),
                        prevState.interactiveText.interactiveText_1.map((text) => {
                            return text.text
                        }),
                        currentState.interactiveText.interactiveText_1.map((text) => {
                            return text.text
                        }),
                    )
                    : objectName === 'interactiveText_3' && await findIndexOfDifferInteractiveText(
                        prevState.interactiveText.interactiveText_3.map((text) => {
                            return {x: text.position[0], y: text.position[1]}
                        }),
                        currentState.interactiveText.interactiveText_3.map((text) => {
                            return {x: text.position[0], y: text.position[1]}
                        }),
                        prevState.interactiveText.interactiveText_3.map((text) => {
                            return text.text
                        }),
                        currentState.interactiveText.interactiveText_3.map((text) => {
                            return text.text
                        }),
                )

                await interactiveIndicatorsService.updateDrawnObject(
                    objectName === 'interactiveText_1' 
                        ? currentState.interactiveText.idx_interactiveText_1[indexOfDifferObject]
                        : objectName === 'interactiveText_3' && currentState.interactiveText.idx_interactiveText_3[indexOfDifferObject],
                    objectName,
                    JSON.stringify({
                        ...objectBody[indexOfDifferObject],
                        selected: false
                    }),
                    userId, abbreviation, backtestingId
                )
            }
        } catch (error) {
            throw new Error(error)
        }
    })
}

export const deleteInteractiveText = (drawnObjectId, drawnObject) => {
    return (async (dispatch) => {
        try {
            const deletedDrawnObject = await interactiveIndicatorsService.deleteDrawnObject(drawnObjectId)

            if (deletedDrawnObject.data.deleteDrawnObject.objectName === 'interactiveText_1') {
                dispatch(deleteInteractiveText1({ id: drawnObjectId, interactiveText_1: drawnObject }))
            } else if (deletedDrawnObject.data.deleteDrawnObject.objectName === 'interactiveText_3') {
                dispatch(deleteInteractiveText3({ id: drawnObjectId, interactiveText_3: drawnObject }))
            }
        } catch (error) {
            console.log('Блинушки ', error)
        }
    })
}