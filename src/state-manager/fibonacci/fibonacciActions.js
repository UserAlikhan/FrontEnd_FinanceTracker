import { findIndexOfDifferFibbonaci } from "../../app/helper/findIndexOfDifferFibbonaci"
import interactiveIndicatorsService from "../../app/services/interactiveIndicatorsService"
import { store } from "../store"
import { deleteFibbonaci1, deleteFibbonaci3, fetchFibbonaci, undoNewFibbonaci, updateFibbonaci1, updateFibbonaci3 } from "./fibonacciSlice"

export const fetchFibbonaciAction = (userId, abbreviation, backtesting=null) => {
    return (async (dispatch) => {
        try {
            const fibbonacies = await interactiveIndicatorsService.getAllUsersFibbonaciObjectsOnSpecificAsset(userId, abbreviation, backtesting)

            if (fibbonacies.fibbonaci_1[0] || fibbonacies.fibbonaci_3[0]) {
                const convertedToObjectFibbonaci1 = fibbonacies?.fibbonaci_1?.map((fib) => {
                    return JSON.parse(fib.objectBody)
                })

                const idxForFibbonaci1 = fibbonacies?.fibbonaci_1?.map((fib) => {
                    return fib.id
                })

                const convertedToObjectFibbonaci3 = fibbonacies?.fibbonaci_3?.map((fib) => {
                    return JSON.parse(fib.objectBody)
                })

                const idxForFibbonaci3 = fibbonacies?.fibbonaci_3?.map((fib) => {
                    return fib.id
                })

                dispatch(fetchFibbonaci(
                    {
                        idx_fibbonaci_1: idxForFibbonaci1 ? idxForFibbonaci1 : [],
                        fibbonaci_1: convertedToObjectFibbonaci1 ? convertedToObjectFibbonaci1 : [],
                        idx_fibbonaci_3: idxForFibbonaci3 ? idxForFibbonaci3 : [],
                        fibbonaci_3: convertedToObjectFibbonaci3 ? convertedToObjectFibbonaci3 : [],
                    }
                ))
            }
        } catch (error) {
            throw new Error(error)
        }
    })
}

export const updateFibbonaci = (objectName, objectBody, userId, abbreviation, backtestingId=null, isNewObject) => {
    return (async (dispatch) => {
        try {
            if (isNewObject) {
                const createdObject = await interactiveIndicatorsService.createDrawnObject(
                    objectName,
                    JSON.stringify(
                        {
                            ...objectBody[objectBody.length - 1],
                            selected: false
                        }
                    ),
                    userId, abbreviation, backtestingId
                )

                if (objectName === 'fibbonaci_1') {
                    dispatch(updateFibbonaci1({ idx: createdObject.data.createDrawnObject.id, fibbonaci_1: objectBody }))
                    dispatch(undoNewFibbonaci())
                } else if (objectName === 'fibbonaci_3') {
                    dispatch(updateFibbonaci3({ idx: createdObject.data.createDrawnObject.id, fibbonaci_3: objectBody }))
                    dispatch(undoNewFibbonaci())
                }
            } else {
                const prevState = store.getState()

                if (objectName === 'fibbonaci_1') {
                    dispatch(updateFibbonaci1({ fibbonaci_1: objectBody }))
                } else if (objectName === 'fibbonaci_3') {
                    dispatch(updateFibbonaci3({ fibbonaci_3: objectBody }))
                }

                const currentState = store.getState()

                const indexOfDifferObject = objectName === 'fibbonaci_1'
                    ? await findIndexOfDifferFibbonaci(
                        prevState.fibbonaci.fibbonaci_1.map((fib) => {
                            return { x1: fib.x1, x2: fib.x2, y1: fib.y1, y2: fib.y2 };
                        }),
                        currentState.fibbonaci.fibbonaci_1.map((fib) => {
                            return { x1: fib.x1, x2: fib.x2, y1: fib.y1, y2: fib.y2 };
                        })
                        )
                    : await findIndexOfDifferFibbonaci(
                        prevState.fibbonaci.fibbonaci_3.map((fib) => {
                            return { x1: fib.x1, x2: fib.x2, y1: fib.y1, y2: fib.y2 };
                        }),
                        currentState.fibbonaci.fibbonaci_3.map((fib) => {
                            return { x1: fib.x1, x2: fib.x2, y1: fib.y1, y2: fib.y2 };
                        })
                )
                await interactiveIndicatorsService.updateDrawnObject(objectName === 'fibbonaci_1'
                    ? currentState.fibbonaci.idx_fibbonaci_1[indexOfDifferObject]
                    : currentState.fibbonaci.idx_fibbonaci_3[indexOfDifferObject],
                    objectName,
                    JSON.stringify(
                        {
                            ...objectBody[indexOfDifferObject],
                            selected: false
                        }
                    ), userId, abbreviation, backtestingId
                )
            }
        } catch (error) {
            throw new Error(error)
        }
    })
}

export const deleteFibbonaci = (drawnObjectId, drawnObject) => {
    return (async(dispatch) => {
        try {
            const deletedDrawnObject = await interactiveIndicatorsService.deleteDrawnObject(drawnObjectId)

            if (deletedDrawnObject.data.deleteDrawnObject.objectName === 'fibbonaci_1') {
                dispatch(deleteFibbonaci1({ id: drawnObjectId, fibbonaci_1: drawnObject }))
            } else if (deletedDrawnObject.data.deleteDrawnObject.objectName === 'fibbonaci_3') {
                dispatch(deleteFibbonaci3({ id: drawnObjectId, fibbonaci_3: drawnObject }))
            }
        } catch (error) {
            console.log('Блинушки ', error)
        }
    })
}