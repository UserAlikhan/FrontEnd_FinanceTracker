import interactiveIndicatorsService from "../../app/services/interactiveIndicatorsService"
import { deleteTrendline1, deleteTrendline3, fetchTrendlines, undoNewTrendline, updateTrendline1, updateTrendline3 } from "./trendlineSlice"
import { store } from '../../state-manager/store'
import { findIndexOfDiffer } from "../../app/helper/findIndexOfDiffer"

export const fetchTrendlinesAction = (userId, abbreviation, backtestingId=null) => {
    return (async (dispatch) => {
        try {
            const trends = await interactiveIndicatorsService.getAllUsersTrendlineObjectsOnSpecificAsset(userId, abbreviation, backtestingId)
            
            if (trends.trends_1[0] || trends.trends_3[0]) {
                const convertedToObjectTrends1 = trends?.trends_1?.map((trend) => {
                    return JSON.parse(trend.objectBody)
                })

                const idxForTrends1 = trends?.trends_1?.map((trend) => {
                    return trend.id
                })

                const convertedToObjectTrends3 = trends?.trends_3?.map((trend) => {
                    return JSON.parse(trend.objectBody)
                })

                const idxForTrends3 = trends?.trends_3?.map((trend) => {
                    return trend.id
                })

                dispatch(fetchTrendlines(
                    {
                        trends_1: convertedToObjectTrends1 ? convertedToObjectTrends1 : {}, 
                        idx_trends_1: idxForTrends1 ? idxForTrends1 : [],
                        trends_3: convertedToObjectTrends3 ? convertedToObjectTrends3 : {},
                        idx_trends_3: idxForTrends3 ? idxForTrends3 : [],
                    }
                ))
            }
        }catch (error) {
            throw new Error(error)
        }
    })
}

export const updateTrendlines = (objectName, objectBody, userId, abbreviation, backtestingId=null, isNewObject) => {
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
                if (objectName === 'trends_1') {
                    dispatch(updateTrendline1({ trends_1: objectBody, idx: createdObject.data.createDrawnObject.id }))
                    dispatch(undoNewTrendline())
                } else if (objectName === 'trends_3') {
                    dispatch(updateTrendline3({ trends_3: objectBody, idx: createdObject.data.createDrawnObject.id }))
                    dispatch(undoNewTrendline())
                }
            } else {
                const prevState = store.getState()

                if (objectName === 'trends_1') {
                    dispatch(updateTrendline1({ trends_1: objectBody }))
                } else if (objectName === 'trends_3') {
                    dispatch(updateTrendline3({ trends_3: objectBody }))
                }

                const currentState = store.getState()

                const indexOfDifferObject = objectName === 'trends_1'
                    ? await findIndexOfDiffer(
                        prevState.trendline.trends_1.map((trendline) => {
                            return { start: trendline.start, end: trendline.end }
                        }), 
                        currentState.trendline.trends_1.map((trendline) => {
                            return { start: trendline.start, end: trendline.end }
                        }),
                        )
                    : await findIndexOfDiffer(
                        prevState.trendline.trends_3.map((trendline) => {
                            return { start: trendline.start, end: trendline.end }
                        }), 
                        currentState.trendline.trends_3.map((trendline) => {
                            return { start: trendline.start, end: trendline.end }
                        }),
                )

                await interactiveIndicatorsService.updateDrawnObject(
                    objectName === 'trends_1' 
                        ? currentState.trendline.idx_trends_1[indexOfDifferObject] 
                        : objectName === 'trends_3' && currentState.trendline.idx_trends_3[indexOfDifferObject],
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

export const deleteTrendlines = (drawnObjectId, drawnObject) => {
    return (async (dispatch) => {
        try {
            const deletedDrawnObject = await interactiveIndicatorsService.deleteDrawnObject(drawnObjectId)

            if (deletedDrawnObject.data.deleteDrawnObject.objectName === 'trends_1') {
                dispatch(deleteTrendline1({ id: drawnObjectId, trends_1: drawnObject }))
            } else if (deletedDrawnObject.data.deleteDrawnObject.objectName === 'trends_3') {
                dispatch(deleteTrendline3({ id: drawnObjectId, trends_3: drawnObject }))
            }
        } catch (error) {
            console.log('Блинушки ', error)
        }
    })
}