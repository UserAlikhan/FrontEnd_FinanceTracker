import { element } from "prop-types"

export async function findIndexOfDifferFibbonaci(arr1, arr2) {

    const arr1X1 = await arr1.map(arr => arr.x1)
    const arr1X2 = await arr1.map(arr => arr.x2)
    const arr1Y1 = await arr1.map(arr => arr.y1)
    const arr1Y2 = await arr1.map(arr => arr.y2)

    const arr2X1 = await arr2.map(arr => arr.x1)
    const arr2X2 = await arr2.map(arr => arr.x2)
    const arr2Y1 = await arr2.map(arr => arr.y1)
    const arr2Y2 = await arr2.map(arr => arr.y2)

    const seachDiffer = async (arr1, arr2) => {
        return arr1.findIndex((element, index) => element !== arr2[index])
    }

    const x1Differ = await seachDiffer(arr1X1, arr2X1)
    const x2Differ = await seachDiffer(arr1X2, arr2X2)
    const y1Differ = await seachDiffer(arr1Y1, arr2Y1)
    const y2Differ = await seachDiffer(arr1Y2, arr2Y2)

    if (x1Differ && x1Differ !== -1) {
        return await x1Differ
    } else if (x2Differ && x2Differ !== -1) {
        return await x2Differ
    } else if (y1Differ && y1Differ !== -1) {
        return await y1Differ
    } else if (y2Differ && y2Differ !== -1) {
        return await y2Differ
    } else {
        return 0
    }
}